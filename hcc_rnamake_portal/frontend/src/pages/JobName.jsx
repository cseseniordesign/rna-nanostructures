import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputSlider from '../components/InputSlider';
import BasicSelect from '../components/BasicSelect';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


/**
 * conditionalComponents()
 * @param {*} props 
 * @param {*} preset 
 * @param {*} pathLength 
 * @param {*} path 
 * @param {*} handlePathLengthChange 
 * @returns certain component choices based on the preset given
 */
function conditionalComponents(props,preset,pathLength,path,handlePathLengthChange)
{
  if(props.state.preset==="TTR")
  {
    return(
      <Grid item xs={12} sx={{alignProperty:"center", width:"50%"}}>
        <BasicSelect
          name="searchCutoff"
          handleChange={props.handleChange}
          label="Precision"
          items={{5 : "Normal",10:"Loose", 15:"Very Loose"}}
          value={props.state.searchCutoff}
        />
      </Grid>
    );
  }
  if(props.state.preset==="TTR_MC")
  {
    return(
    <Grid item xs={12} sx={{alignProperty:"center", width:"50%"}}>
          <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Path Length</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="motifPath"
        value={props.state.motifPath}
        onChange={handlePathLengthChange, props.handleChange}
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

/**
 * JobName()
 * @param {*} props 
 * @returns initial job information form
 */
export default function JobName(props) {
  const [preset, setPreset] = React.useState('');
  const [pathLength, setPathLength] = React.useState(0);
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

  // range of values for number of designs
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
        {/* Job Name Textbox */}
        <Grid item xs={12} sm={8} sx={{alignProperty:"left", width:"50%"}}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            alignProperty="center"
            onChange={props.handleChange}
            value={props.state.name}
            variant="filled"
          />
        </Grid>
        {/* Job Description Textbox */}
        <Grid item xs={12} sm={8} sx={{alignProperty:"center", width:"100%"}}>
          <TextField
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            maxRows = "5"
            onChange={props.handleChange}
            value={props.state.description}
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
          {/* Design number slider, uses marks defined above */}
          <InputSlider
            name="designs"
            min={10}
            max = {100}
            step={1}
            sliderChange={props.handleChange}
            value={props.state.designs}
            marks={marks}
            sx={{width:100}}
          />
        </Grid>
        <Grid item xs={12} sx={{alignProperty:"center", width:"100%"}}>
          {/* Preset */}
          <BasicSelect
            name="preset"
            handleChange={handlePresetChange}
            label="Preset"
            items={{"TTR" : "TTR","TTR_MC":"TTR Monte Carlo"}}
            value={props.state.preset}
          />
        </Grid>
        {/* Generates additional options based on preset */}
        {conditionalComponents(props,pathLength,path,handlePathLengthChange)}
      </Grid>
    </React.Fragment>
  );
}
