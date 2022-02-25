import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Paper from '@mui/material/Paper';
import corner_swoosh from '../graphics/corner_swoosh.svg'

//function createData(name, application, user, creationTime, status, actions) {
//  return {name, application, user, creationTime, status, actions};
//}

//const rows = [
//  createData('Clone of Design RNA Scaffold on May 25, 2021 4:11 PM', "Design RNA Scaffold", "default-admin", "3 days ago", "Canceling", "Clone"),
//  createData('Clone of Design RNA Scaffold on May 25, 2021 4:12 PM', "Design RNA Scaffold", "default-admin", "3 days ago", "Creating", "Clone"),
//  createData('Design RNA Scaffold on May 25, 2021 4:11 PM', "Design RNA Scaffold", "default-admin", "3 days ago", "Failed", "Clone"),
//  createData('Clone of Design RNA Scaffold on Apr 30, 2021 4:25 AM', "Design RNA Scaffold", "default-admin", "3 days ago", "Created", "Clone"),
//  createData('Clone of Clone of Clone of Design RNA Scaffold on Apr 30, 2021 4:25 AM', "Design RNA Scaffold", "default-admin", "3 days ago", "Created", "Clone"),
//];

async function loadExperiments()
{
  const data = await window.AiravataAPI.services.ExperimentSearchService.list({
    limit: 10,
    [window.AiravataAPI.models.ExperimentSearchFields.USER_NAME.name]:
        window.AiravataAPI.session.Session.username });
  return data;
}

function BasicTable() {
  //const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    loadExperiments()
   // console.log(res)
    .then(result => result.results)
    .then(
      (result) =>{
        setItems(result);
        console.log(result);
        setIsLoaded(true);
      }
    )
    //console.log(results);
   // setItems(results.json());
   // setIsLoaded(true);
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
    {items.map((row) =>
      console.log(row.creationTime.toString())
      )}
 
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="PastExperimentsHeader">
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Creation Time</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) =>
            <TableRow key={row.name}>
              <TableCell align="center"><a href="#">{row.name}</a></TableCell>
              <TableCell align="center">{row.creationTime.toDateString() + " " + row.creationTime.toTimeString()}</TableCell>
              <TableCell align="center">{row.experimentStatus.name}</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
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