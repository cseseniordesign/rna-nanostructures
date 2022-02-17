import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Paper from '@mui/material/Paper';
import corner_swoosh from '../graphics/corner_swoosh.svg'

function createData(name, application, user, creationTime, status, actions) {
  return {name, application, user, creationTime, status, actions};
}

const rows = [
  createData('Clone of Design RNA Scaffold on May 25, 2021 4:11 PM', "Design RNA Scaffold", "default-admin", "3 days ago", "Canceling", "Clone"),
  createData('Clone of Design RNA Scaffold on May 25, 2021 4:12 PM', "Design RNA Scaffold", "default-admin", "3 days ago", "Creating", "Clone"),
  createData('Design RNA Scaffold on May 25, 2021 4:11 PM', "Design RNA Scaffold", "default-admin", "3 days ago", "Failed", "Clone"),
  createData('Clone of Design RNA Scaffold on Apr 30, 2021 4:25 AM', "Design RNA Scaffold", "default-admin", "3 days ago", "Created", "Clone"),
  createData('Clone of Clone of Clone of Design RNA Scaffold on Apr 30, 2021 4:25 AM', "Design RNA Scaffold", "default-admin", "3 days ago", "Created", "Clone"),
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="PastExperimentsHeader">
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Application</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Creation Time</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <a href="#">{row.name}</a>
              </TableCell>
              <TableCell align="right">{row.application}</TableCell>
              <TableCell align="right">{row.user}</TableCell>
              <TableCell align="right">{row.creationTime}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right"><a href="#">{row.actions} <ContentCopyIcon fontSize="inherit"/></a></TableCell> {/* eventually replace with dynamic changing icon */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PastExperiments() {
    return (
        <div className="past-experiments">
            <div className="container">
                <div>
                    <h1 className="font-weight-light">Past Experiments</h1>
                    <BasicTable></BasicTable>
                </div>
            </div>
            <br></br>
            <img src={corner_swoosh} alt="" width='100%'/>
        </div>
    );
}

export default PastExperiments;
