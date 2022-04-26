import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
    const [value, setValue] = React.useState(props.preset);


    const update = (event) => {
        setValue(event.target.value);
        props.handleChange(event);
      };

    function returnMenuItems(items)
    {
        var rows = []
        for (const [key, value] of Object.entries(items))
        {
            rows.push(<MenuItem value={key}>{value}</MenuItem>)
        }
        return rows;
    }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          name={props.name}
          value={props.value}
          label={props.label}
          onChange={update}
        > 
        {returnMenuItems(props.items)}
        </Select>
      </FormControl>
    </Box>
  );
}