
//import * as React from 'react';
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



export default function PDBSettings(props) {

  const [cloudUpload, setCloudUpload] = useState(0);

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Application Configuration
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField name='startingBase' label='Starting Base Pair' variant='filled' onChange={props.handleChange} required/>
        <TextField name='endingBase' label='Ending Base Pair' variant='filled' onChange={props.handleChange} required/>
      </Box>
      <br/>
      <div style={{ textAlign: 'left' }}>
        <p>
          <a
            className='App-link'
            href='http://localhost:8000/rnmake_portal/faq'
            target="_blank"
            rel="noopener noreferrer"
            style={{ color:'#4C5F94'}}
          >
            What are base pairs?
          </a>
        </p>    
      </div>
      <br/>
      <Typography variant="h6" gutterBottom>
        PDB file and Base Pairs
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
          <FlexRow>
              <MyDropline></MyDropline>
          </FlexRow>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant='contained' endIcon={ <CloudIcon/> } style={{ backgroundColor:'#4C5F94' }} onClick={() => {cloudUpload ? setCloudUpload(0): setCloudUpload(1)}}>
            Cloud Upload
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FileExplorer cloudUpload={cloudUpload} setCloudUpload={setCloudUpload} />
        </Grid>
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

function MyDropline() {
 const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
   return acceptedFiles;
 }, [])
 const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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

const FlexRow = styled.div`
margin-top: 0px;
margin-left: 100px;
display: flex;
align-items: flex-start;
min-width: 996px;
`;
