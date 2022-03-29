import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputSlider from '../components/InputSlider';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { width } from '@mui/system';

/**
 * Input for Project Name, Description, and Design Count
 * @param {*} props 
 * @returns JobName Component
 */

function conditionalComponents(props,preset,pathLength,path,handlePathLengthChange)
{
  if(preset==="TTR")
  {
    return(
      <Grid item xs={12} sx={{alignProperty:"center", width:"50%"}}>
              <BasicSelect name="searchCutoff" handleChange={props.handleChange} label="Precision" items={{5 : "Normal",10:"Loose", 15:"Very Loose"}}></BasicSelect>
      </Grid>
    );
  }
  if(preset==="TTR_MC")
  {
    return(
    <Grid item xs={12} sx={{alignProperty:"center", width:"50%"}}>
          <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Path Length</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="motifPath"
        value={pathLength}
        onChange={handlePathLengthChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
      </RadioGroup>
    </FormControl>
    <Typography>Motif Path</Typography>
    <Typography>{path}</Typography>
    </Grid>
    );
  }
  
}

export default function JobName(props) {
  const [preset, setPreset] = React.useState('');
  const [pathLength, setPathLength] = React.useState('');
  const [path, setPath] = React.useState('');

  const handlePresetChange = (event) => {
    props.handleChange(event);
    setPreset(event.target.value);
  };

  const handlePathLengthChange = (event) => {
      var path = '';
      for(var i=0;i<parseInt(event.target.value);i++)
      {
        path += "flex_helices,twoway,";
      }
      path += "flex_helices";
      setPath(path);

      //hackey and bad, this is a pretty repugnant code smell
      const e = {target : {name:event.target.name, value: path}}
      props.handleChange(e);
      setPathLength(event.target.value);
  };

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
        {/* Project Name */}
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
        {/* Description */}
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
          {/* Design count from 10-100 with default at 30 */}
          <InputSlider name="designs" value={30} min={10} max = {100} step={1} sliderChange={props.handleChange} marks={marks} sx={{width:100}} />
        </Grid>
        <Grid item xs={12} sx={{alignProperty:"center", width:"100%"}}>
          <BasicSelect name="preset" handleChange={handlePresetChange} label="Preset" items={{"TTR" : "TTR","TTR_MC":"TTR Monte Carlo"}}></BasicSelect>
        </Grid>
        {conditionalComponents(props,preset,pathLength,path,handlePathLengthChange)}
      </Grid>
    </React.Fragment>
  );
}
