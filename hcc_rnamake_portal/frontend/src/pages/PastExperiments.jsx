import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import corner_swoosh from '../graphics/corner_swoosh.svg';
import { Link } from 'react-router-dom';

/**
 * Fetches data from ExperimentSearchService for given username
 * @returns Experiments data
 */
async function loadExperiments()
{
  const data = await window.AiravataAPI.services.ExperimentSearchService.list({
    limit: 10,
    [window.AiravataAPI.models.ExperimentSearchFields.USER_NAME.name]:
        window.AiravataAPI.session.Session.username });
  return data;
}

/**
 * Past Experiments table with Name, Creation Time, and Status
 * @returns Table of Past Experiments or Loading message
 */
function BasicTable() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    loadExperiments()
    .then(result => result.results)
    .then(
      (result) =>{
        setItems(result);
        console.log(result);
        setIsLoaded(true);
      }
    )
  },[])

  if (!isLoaded)
  {
    return <div>Loading...</div>;
  }
  else
  {
    items.map((test) => (
      console.log(test)
    ));
    console.log("Some text", items)
    items.map((row) =>
      console.log(row.creationTime.toString())
    )
 
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="PastExperimentsHeader">
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Creation Time</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) =>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                  <Link to={'job-summary/' + row.experimentId}>{row.name}</Link>
                  </TableCell>
              <TableCell align="center">{row.creationTime.toDateString() + " " + row.creationTime.toTimeString()}</TableCell>
              <TableCell align="center">{row.experimentStatus.name}</TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

/**
 * @returns formatted BasicTable
 */
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