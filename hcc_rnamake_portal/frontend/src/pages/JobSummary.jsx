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
import { Accordion, AccordionDetails, AccordionSummary, CardActionArea, Container, Stack } from '@mui/material';
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
      <><span>&nbsp;</span><a class="action-link" href={design[1]}>{design[0]}</a></> 
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
        console.log(result);
        setIsLoaded(true);
      }
    )
    loadExperimentDetails(props.experimentId).then(
      (data) => {
        console.log(data);
        setExperimentDetails(data);
      }
    )
  },[])
  
  if (!isLoaded) {
    return (<div></div>);
  } else {
    return (
      <Stack alignItems='flex-start' spacing={1}>
        <Typography>Job Summary: {experimentDetails.experimentName}</Typography>
        <Typography>Job Status: {formatJobStatus(experimentDetails.experimentStatus.length)}</Typography>
        <Typography>Creation Date: {formatDate(experimentDetails.creationTime)}</Typography>
        <Typography>Download Job Results</Typography>
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
            <Typography>Download Individual PDBs</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {(pdbCollection).map((design,index) => formatDesignLinks(design,index))}
          </AccordionDetails>
        </Accordion>
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