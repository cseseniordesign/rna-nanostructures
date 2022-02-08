import React, { useEffect, useState } from 'react';
import './Workspace.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Paper from '@mui/material/Paper';
import small_RNA_SVG from '../graphics/small_RNA_SVG.svg';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';

async function loadExperiments()
{
  const data = await window.AiravataAPI.services.ExperimentSearchService.list({
    limit: 5,
    [window.AiravataAPI.models.ExperimentSearchFields.USER_NAME.name]:
        window.AiravataAPI.session.Session.username });
  return data;
}

function BasicTable() {
    //const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect( results = loadExperiments() )
      .then(results => results.json())
      .then(
        (result)=> {
          setItems(result);
          setIsLoaded(true);
        }
      )
    
  
   if (!isLoaded)
    {
      return <div>Loading...</div>;
    }
    else
    {
      console.log(items['results'])
      
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="PastExperimentsHeader">
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Application</TableCell>
                <TableCell align="right">Creation Time</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(items['results']).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <a href="#">{row.name}</a>
                  </TableCell>
                  <TableCell align="right">{row.application}</TableCell>
                  <TableCell align="right">{row.userName}</TableCell>
                  <TableCell align="right">{row.creationTime}</TableCell>
                  <TableCell align="right">{row.experimentStatus}</TableCell>
                  <TableCell align="right"><a href="#">{row.actions} <ContentCopyIcon fontSize="inherit"/></a></TableCell> {/* eventually replace with dynamic changing icon */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
}

function Workspace() {
    let history = useHistory(); // used for rerouting to another page.

    return (
       <div>
           <div className='home-left'>
               <div className='home-group'>
                   <text className='rna-title'>RNAMake</text>
                   <h2 className='rna-subtitle'>3D Design Toolkit</h2>
                   <div className='scaffold-button'>
                   <Button
                        onClick={() => {
                            history.push('/new-experiment');
                        }}
                        type="button"
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--xlarge"
                    >
                        Design New RNA Scaffold
                    </Button>
                   </div>
                </div>

                <div className='rna-svg'>
                    <img src={small_RNA_SVG} alt=''></img>
                </div>
            </div>

           <div className='recent-exp'>
                <p className='exp-font'>Recent Experiments</p>
                <BasicTable />
           </div>
       </div>
    );
}

export default Workspace;