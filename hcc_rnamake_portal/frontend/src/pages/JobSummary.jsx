import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import corner_swoosh from '../graphics/corner_swoosh.svg';
import zipFileImage from '../images/zip-card-dark.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

/**
 * 
 * @param {*} experimentId 
 * @returns 
 */
async function loadExperimentDetails(experimentId) {
  const data = await window.AiravataAPI.utils.FetchUtils.get(
      "/api/experiment-storage/"+experimentId,
      ""
  );

  console.log('Data from api: ');
  console.log(data);
  return data;
}

/**
 * Fetch URI Data
 * @param {*} uri 
 * @returns 
 */
async function getUriData(uri) {
    const result = await window.AiravataAPI.utils.FetchUtils.get(
      uri,
      "",
      {
        responseType :"text",
      }
    );
    return result;
}

/**
 * Formats links (unused)
 * @param {*} design 
 * @param {*} index 
 * @returns 
 */
function formatDesignLinks(design, index) {
    if(index % 10 === 0 && index !== 0) {
      return (
        <><a class="action-link" href={design[1]}>{design[0]}</a><br /></>
      )
    } else {
      return (
       <><span>&nbsp;</span><a class="action-link" href={design[1]}>{design[0]}</a></> 
      )
    }
}

/**
 * Experiment Details Summary
 * @param {*} props 
 * @returns Summary or Loading message
 */
function GetSummary(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [stdOut, setStdOut] = useState();
    const [stdErr, setStdErr] = useState();
    const [pdbCollection, setPdbCollection] = useState([]);
    const [archive, setArchive] = useState();
    
    const [viewStdout, setViewStdout] = React.useState(false);
    const [viewStderr, setViewStderr] = React.useState(false);

    const handleStdOutChange = () => {
      setViewStdout((prev) => !prev);
    }

    const handleStdErrChange = () => {
      setViewStderr((prev) => !prev);
    }

    useEffect(()=>{
      loadExperimentDetails(props.experimentId).then(
        (result) => {
          for (var i=0; i<result['files'].length; i++) {
            if(result['files'][i]['name'].endsWith('stderr')) {
                getUriData(result['files'][i]['downloadURL']).then((result)=> {setStdErr(result)});
            } else if(result['files'][i]['name'].endsWith('stdout')) {
                getUriData(result['files'][i]['downloadURL']).then((result)=> {setStdOut(result)});
            } else if(result['files'][i]['name'].startsWith('design')) {
              //Doesn't respect reacts immutable state design paradigm but react doesn't respect my need to have nominally working code
              //Also, this literally will not change after first load so it's probably fine
              pdbCollection.push([result['files'][i]['name'], result['files'][i]['downloadURL']]);
            } else {
              //Something whack happened TODO: error handling
            }
          }
          setArchive("/sdk/download-experiment-dir/"+props.experimentId+"/?path=ARCHIVE");
          setIsLoaded(true);
        }
      )
    },[])
  
   if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Box component="div" sx={{ whiteSpace: 'normal'}}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16} align={"left"}> 
            <Typography variant='h3'>Download Job Results</Typography>
            </Grid>
            <Grid item xs={16} align={"left"}> 
            {/* Zip File with Job Results for Download */}
            <Card sx={{maxWidth: 345}}>
              <CardActionArea href={archive}>
                <CardMedia
                component='img'
                height='140'
                image={zipFileImage}
                alt='ZIP FILE'
                sx={{fontSize:20}}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.experimentId}.zip
                </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </Grid>
            {/* Standard Output */}
            <Grid item xs={8} align={"left"}>    
              <FormControlLabel control={<Switch checked={viewStdout} onChange={handleStdOutChange} />} label="Preview Standard Output"/>
              <Collapse orientation="vertical" in={viewStdout}>
                <textarea wrap="off" id="stdoutbox" rows="90" cols="120" name="w3review" readonly="true" value={stdOut}>  </textarea>
              </Collapse>
            </Grid>
            {/* Standard Error */}
            <Grid item xs={8} align={"left"}>
            <FormControlLabel control={<Switch checked={viewStderr} onChange={handleStdErrChange} />} label="Preview Standard Error"/>
              <Collapse orientation="vertical" in={viewStderr}>
                <textarea wrap="off" id="stderrbox" rows="90" cols="120" name="w3review" readonly="true" value={stdErr}>  </textarea>
              </Collapse>
            </Grid>
          </Grid>
        </Box>
      );
    }
}

/**
 * JobSummary
 * @returns Summary for ID
 */
function JobSummary() {
    const params = useParams();
    return (
      <div>
      <div>
        <GetSummary experimentId={params.experimentId}/>
      </div>
      <div id='footer'>
        <img src={corner_swoosh} alt='' style={{float: 'right'}}/>
      </div>
      </div>
    );
}

export default JobSummary;