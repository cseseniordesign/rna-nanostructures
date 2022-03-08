import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';

async function loadExperimentDetails(experimentId)
{
  const data = await window.AiravataAPI.utils.FetchUtils.get(
      "/api/experiment-storage/"+experimentId,
      ""
  );
//  const experiment = await window.AiravataAPI.services.ExperimentService.retrieve({
//        lookup: experimentId,
//  });
  return data;
}

async function getUriData(uri)
{
    const result = await window.AiravataAPI.utils.FetchUtils.get(
      uri,
      "",
      {
        responseType :"text",
      }
    );
    return result;
}

function formatDesignLinks(design,index)
{
    if(index % 10 === 0 && index !== 0)
    {
      return(
        <><a class="action-link" href={design[1]}>{design[0]}</a><br /></>
      )
    }
    else 
    {
      return (
       <><span>&nbsp;</span><a class="action-link" href={design[1]}>{design[0]}</a></> 
      )
    }
}

function GetSummary(props) 
{
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
      loadExperimentDetails(props.experimentId)
      .then(
        (result) =>{
          console.log(result);
          for (var i=0; i<result['files'].length; i++)
          {
            if(result['files'][i]['name'].endsWith('stderr'))
            {
                getUriData(result['files'][i]['downloadURL']).then((result)=> {setStdErr(result)});
            }
            else if(result['files'][i]['name'].endsWith('stdout'))
            {
                getUriData(result['files'][i]['downloadURL']).then((result)=> {setStdOut(result)});
            }
            else if(result['files'][i]['name'].startsWith('design'))
            {
              //Doesn't respect reacts immutable state design paradighm but react doesn't respect my need to have nominally working code
              //Also, this literally will not change after first load so it's probably fine
              pdbCollection.push([result['files'][i]['name'],result['files'][i]['downloadURL']]);
            }
            else 
            {
              //Something whack happened 
            }
          }
          setArchive("/sdk/download-experiment-dir/"+props.experimentId+"/?path=ARCHIVE");
          setIsLoaded(true);
        }
      )
    },[])
  
   if (!isLoaded)
    {
      return <div>Loading...</div>;
    }
    else
    {
      return (
        <Box component="div" sx={{ whiteSpace: 'normal'}}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16} align={"left"}> 
            <Typography>Download individual Designs</Typography>
            </Grid>
            <Grid item xs={16} align={"left"}> 
            {(pdbCollection).map((design,index) => formatDesignLinks(design,index))}  
            </Grid>
            <Grid item xs={16} align={"left"}> 
            <Typography>Download archive of entire experiment</Typography>
            </Grid>
            <Grid item xs={16} align={"left"}> 
            <a class="action-link" href={archive}>{props.experimentId}+.zip</a>
            </Grid>
            <Grid item xs={8} align={"left"}>    
              <FormControlLabel control={<Switch checked={viewStdout} onChange={handleStdOutChange} />} label="Preview Standard Output"/>
              <Collapse orientation="vertical" in={viewStdout}>
                <textarea wrap="off" id="stdoutbox" rows="90" cols="120" name="w3review" readonly="true" value={stdOut}>  </textarea>
              </Collapse>
            </Grid>
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

function JobSummary() {
    const params = useParams();
    return (
       <div>
            <GetSummary experimentId={params.experimentId}/>
       </div>
    );
}

export default JobSummary;