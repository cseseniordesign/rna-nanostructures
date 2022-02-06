
//import * as React from 'react';
import React, { useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FileExplorer from '../components/FileExplorer'
import {useDropzone} from 'react-dropzone';
import dragNDropBox from '../graphics/dragNDropBox.png';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { Box, flexbox } from '@mui/system';

export default function PDBSettings() {

  const [cloudUpload, setCloudUpload] = useState(0);

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Application Configuration
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField id='starting-base' label='Starting Base Pair' variant='filled' required/>
        <TextField id='ending-base' label='Ending Base Pair' variant='filled' required/>
      </Box>
      
      <Typography variant="h6" gutterBottom>
        PDB file and Base Pairs
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <input
            accept="*"
            //className={className.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span" >
              Local Upload
            </Button>
          </label> 
          <FlexRow>
              <MyDropline></MyDropline>
          </FlexRow>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button onClick={() => {cloudUpload ? setCloudUpload(0): setCloudUpload(1)}}>
            Cloud Upload
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FileExplorer cloudUpload={cloudUpload} setCloudUpload={setCloudUpload} />
        </Grid>
      </Grid>
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
