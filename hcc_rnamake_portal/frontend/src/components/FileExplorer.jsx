import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
/* eslint-disable react/prop-types */ // TODO: this should not be necessary but i have no idea what i'm doing and this makes things work
function createData(name, size, time) {
  return { name, size, time };
}

export default function FileExplorer(props)
{
  const [fileChosen, setFileChosen] = useState("none");

  const rows = [
    createData('testfile1.pdb', '159 kB', '10/19/2021'),
    createData('scaffold-12-9-20.pdb', '127 kB', '12/9/2020'),
    createData('results-1-7-21.pdb', '140 MB', '1/7/2021'),
    createData('prototype.pdb', '220 kB', '6/18/2021'),
  ];
  if(props.cloudUpload && fileChosen == "none")
  {
    return(
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="center">Creation Time</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.size}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center"><Button onClick={() => {selectFile(row.name,props.setCloudUpload,setFileChosen)}}>Select</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
  }
  else if(fileChosen != "none")
  {
    return(
      <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
    

        </Grid>
        <Grid item xs={12} sm={6}>

        <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>

  
        </Grid>
      </Grid>
    </React.Fragment>
    );
  }
  else{
   return(<div></div>); 
  }
}
function selectFile(rowName,setCloudUpload,setFileChosen)
{
  setFileChosen(rowName);
  setCloudUpload(0);
}

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
      <ListItemIcon>
                <Checkbox
                  edge="start"
                  //checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  //inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
        <ListItemText primary={`A${index + 100}`} />
      </ListItemButton>
    </ListItem>
  );
}