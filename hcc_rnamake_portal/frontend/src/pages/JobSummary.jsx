import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import corner_swoosh from '../graphics/corner_swoosh.svg';
import LinearProgress from '@mui/material/LinearProgress';
import zipFileImage from '../images/zip-card-dark.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Accordion, AccordionDetails, AccordionSummary, CardActionArea, Container, Divider, Paper, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


async function loadExperimentDetails(experimentId) {
  const data = await window.AiravataAPI.utils.FetchUtils.get(
    "/api/experiments/" + experimentId,
    ""
  );
  // console.log(data);
  return data;
}

async function loadExperimentFiles(experimentId) {
  const data = await window.AiravataAPI.utils.FetchUtils.get(
    "/api/experiment-storage/" + experimentId,
    ""
  );
  return data;
}

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

function formatDesignLinks(design, index) {
  if(index % 10 === 0 && index !== 0) {
    return (
      <><a class="action-link" href={design[1]}>{design[0]}</a><br /></>
    )
  } else {
    return (
      <><span>&nbsp;&nbsp;&nbsp;</span><a class="action-link" href={design[1]}>{design[0]}</a></> 
    )
  }
}

const formatDate = (creationTime) => {
  const date = creationTime.split("T");
  return date[0];
}

const formatZipName = (experimentName) => {
  const zipName = experimentName.replace(" ", "_") + "_ARCHIVE.zip";
  return zipName;
}

const formatJobStatus = (experimentStatusLength) => {
  const COMPLETED = <span style={{color:'green'}}>COMPLETED</span>
  const FAILED = <span style={{color:'#d01818'}}>FAILED</span>

  if (experimentStatusLength === 4) {
    return COMPLETED;
  } else {
    return FAILED;
  }
}

function GetSummary(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stdOut, setStdOut] = useState();
  const [stdErr, setStdErr] = useState();
  const [pdbCollection, setPdbCollection] = useState([]);
  const [archive, setArchive] = useState();
  
  const [viewStdout, setViewStdout] = React.useState(false);
  const [viewStderr, setViewStderr] = React.useState(false);

  const [experimentDetails, setExperimentDetails] = useState([]);


  const handleStdOutChange = () => {
    setViewStdout((prev) => !prev);
  }

  const handleStdErrChange = () => {
    setViewStderr((prev) => !prev);
  }

  useEffect(()=>{
    // let response;
    loadExperimentFiles(props.experimentId).then(
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
    loadExperimentDetails(props.experimentId).then(
      (data) => {
        setExperimentDetails(data);
      }
    )
  },[])
  
  if (!isLoaded) {
    return (<div></div>);
  } else {
    return (
      <Stack alignItems='flex-start' justifyContent='center' spacing={1} divider={<Divider orientation="horizontal" flexItem />}>
        <Typography variant='h3'>Job Summary: {experimentDetails.experimentName}</Typography>
        <Typography variant='h6'>Job Status: {formatJobStatus(experimentDetails.experimentStatus.length)}</Typography>
        <Typography variant='h6'>Creation Date: {formatDate(experimentDetails.creationTime)}</Typography>
        <Typography variant='h3'>Download Job Results</Typography>
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
              {formatZipName(experimentDetails.experimentName)}
            </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Accordion sx={{width:'100%'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content'>
            <Typography variant='h5'>Download Individual Designs</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {(pdbCollection).map((design,index) => formatDesignLinks(design,index))}
          </AccordionDetails>
        </Accordion>
        <Typography variant='h3'>Job Information</Typography>
        <Accordion sx={{width:'100%'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content'>
            <Typography variant='h5'>Submission Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography variant='h6' align='left'>Starting base pair: {experimentDetails.experimentInputs[4].value}</Typography>
          <Typography variant='h6' align='left'>Ending base pair: {experimentDetails.experimentInputs[0].value}</Typography>
          <Typography variant='h6' align='left'>Number of designs: {experimentDetails.experimentInputs[1].value}</Typography>
          </AccordionDetails>
        </Accordion>
        <FormControlLabel control={<Switch checked={viewStdout} onChange={handleStdOutChange} />} label="Preview Standard Output"/>
        <Collapse orientation="vertical" in={viewStdout}>
          <textarea wrap="off" id="stdoutbox" rows="90" cols="120" name="w3review" readonly="true" value={stdOut}>  </textarea>
        </Collapse>
        <FormControlLabel control={<Switch checked={viewStderr} onChange={handleStdErrChange} />} label="Preview Standard Error"/>
        <Collapse orientation="vertical" in={viewStderr}>
          <textarea wrap="off" id="stderrbox" rows="90" cols="120" name="w3review" readonly="true" value={stdErr}>  </textarea>
        </Collapse>
      </Stack>
    );
  }
}

function JobSummary() {
  const params = useParams();
  return (
    <GetSummary experimentId={params.experimentId}/>
  );
}

export default JobSummary;