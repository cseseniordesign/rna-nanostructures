import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import BasicMenu from '../components/BasicMenu';
import InputSlider from '../components/InputSlider';
import { useState } from 'react';

export default function JobName(props) {
  //const [myValue, setValue] = useState('');
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
            variant="standard"
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
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          {/*spacer*/}
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography id="designCount" gutterBottom>
        Number of Designs
      </Typography>
          <InputSlider name="designs" sliderChange={props.sliderChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography id="scaffoldCount" gutterBottom>
        Number of Scaffolds per Design
      </Typography>
          <InputSlider name="scaffolds" sliderChange={props.sliderChange} />
        </Grid>
        <Grid item xs={12 }>
        <BasicMenu />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
