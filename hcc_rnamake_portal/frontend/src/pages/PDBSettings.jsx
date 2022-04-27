import React, { useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FileExplorer from '../components/FileExplorer'
import {useDropzone} from 'react-dropzone';
import dragNDropBox from '../graphics/dragNDropBox.png';
import styled from 'styled-components';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, flexbox, textAlign } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

// to automate switching URLs when developing and when in the online portal.
const BASEURL = window.location.origin;

/**
 * PDBSettings()
 * @param {*} props 
 * @returns form for base pair and pdb submission
 */
export default function PDBSettings(props) {

  const [cloudUpload, setCloudUpload] = useState(0);
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Application Configuration
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Starting Base Pair */}
        <TextField
          required
          name='startingBase'
          label='Starting Base Pair'
          variant='filled'
          value={props.state.startingBase}
          onChange={props.handleChange}
        />
        {/* Ending Base Pair */}
        <TextField
          required
          name='endingBase'
          label='Ending Base Pair'
          variant='filled'
          value={props.state.endingBase}
          onChange={props.handleChange}
        />
      </Box>
      <br/>
      <div style={{ textAlign: 'left' }}>
        <p>
          <a
            className='App-link'
            href={ BASEURL + '/rnamake_portal/faq' } 
            target="_blank"
            rel="noopener noreferrer"
            style={{ color:'#4C5F94'}}
          >
            What are base pair names?
          </a>
        </p>
      </div>
      <br/>
      <Typography variant="h6" gutterBottom>
        PDB file and Base Pairs
      </Typography>

      {/* Upload for file, includes Cloud and Local Upload */}
      {/*Cloud upload has been removed, to re-enable, set md of the localupload back to 6 and remove comments*/}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <input
            name='localUpload'
            accept="*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={props.handleUpload}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" endIcon={ <ArrowCircleUpIcon/> } component="span" style={{ backgroundColor:'#4C5F94' }}>
              Local Upload
            </Button>
          </label> 
          {/* Drag and Drop Box */}
            <MyDropline fileState = {props.fileState}></MyDropline>
        </Grid>
        {/*
        <Grid item xs={12} md={6}>
          <Button variant='contained' endIcon={ <CloudIcon/> } style={{ backgroundColor:'#4C5F94' }} onClick={() => {cloudUpload ? setCloudUpload(0): setCloudUpload(1)}}>
            Cloud Upload
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FileExplorer cloudUpload={cloudUpload} setCloudUpload={setCloudUpload} />
        </Grid>
        */}
      </Grid>

      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content">
          <Typography>Advanced settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TextField id='cli-args' label='CLI Arguments' variant='filled'/>
        </AccordionDetails>
      </Accordion> */}
    </React.Fragment>
  );
}

/**
 * MyDropline()
 * @param {*} fileState 
 * @returns Drag and Drop Box
 */
function MyDropline(fileState) {
 const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
   return acceptedFiles;
 }, [])
 const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
 console.log(fileState.fileState);
 if(fileState.fileState==="UPLOADING")    // end my pain please
 {
   return(    //This needs to be centered but i don't know how to do it
    <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
   )
 }
 else
 {
  return (
    <div {...getRootProps()}>
      <img src = {dragNDropBox}/>
      <input {...getInputProps()} />
      {
        isDragActive ?
         <p>
           <a>Submision requires a PDB containing RNA
             <br></br> that has at least two basepair ends
             <br></br> (Drag and drop here)
           </a>
         </p> :
         <p>
           <a>Submision requires a PDB containing RNA
             <br></br> that has at least two basepair ends
             <br></br> (Drag and drop here)
           </a>
         </p>
      }
    </div>
   )
 }
}