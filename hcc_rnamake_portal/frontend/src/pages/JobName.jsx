import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import BasicMenu from '../components/BasicMenu';
import InputSlider from '../components/InputSlider';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { width } from '@mui/system';
// import { useState } from 'react';

// const scaffoldCount = 1;

export default function JobName(props) {
  const marks = [
    {
      value: 10,
      label: '10',
    },
    {
      value: 100,
      label: '100',
    }
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" textAlign="left" gutterBottom>
        Project Name/Description
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} sx={{alignProperty:"left", width:"50%"}}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            alignProperty="center"
            onChange={props.handleChange}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={8} sx={{alignProperty:"center", width:"100%"}}>
          <TextField
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            maxRows = "5"
            onChange={props.handleChange}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          {/*spacer*/}
        </Grid>
        <Grid item xs={12} sx={{alignProperty:"center", width:"100%"}}>
          <Typography textAlign="left" id="designCount" gutterBottom>
            Number of Designs
          </Typography>
          <InputSlider name="designs" value={30} min={10} max = {100} step={1} sliderChange={props.handleChange} marks={marks} sx={{width:100}} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
