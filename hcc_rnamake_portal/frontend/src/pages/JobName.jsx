import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import BasicMenu from '../components/BasicMenu';
import InputSlider from '../components/InputSlider';
// import { useState } from 'react';

// const scaffoldCount = 1;

export default function JobName(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Project Name/Description
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            onChange={props.handleChange}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            fullWidth
            maxRows = "5"
            onChange={props.handleChange}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          {/*spacer*/}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography id="designCount" gutterBottom>
            Number of Designs
          </Typography>
          <InputSlider name="designs" value={30} min={10} max = {100} step={1} sliderChange={props.handleChange} />
        </Grid>
        <Grid item xs={12 }>
        {/* If we decide to put a project selection menu back here this is where it goes */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>
            Time limit (minutes)
          </Typography>
          <InputSlider name="timeLimit" value={30}  min={5} max = {300} step={15} sliderChange={props.handleChange} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
