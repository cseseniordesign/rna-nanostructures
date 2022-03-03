import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider(props) {
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    event.target.name = props.name;
    //sliderChange(event);
    //console.log(props);
    props.sliderChange(event);
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    //sliderChange(event);
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    props.sliderChange(event);
  };

  const handleBlur = () => {
    if (value < props.min) {
      setValue(props.min);
    } else if (value > props.max) {
      setValue(props.max);
    }
  };

  return (
    <Box sx={{ width: 540 }}>

      <Grid container spacing={2} alignItems="center" fullwidth>
        <Grid item>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            name = {props.name}
            min = {props.min}
            step = {props.step}
            max = {props.max}
            aria-labelledby="input-slider"
            width="inherit"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            name={props.name}
            inputProps={{
              step: props.step,
              min: props.min,
              max: props.max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}