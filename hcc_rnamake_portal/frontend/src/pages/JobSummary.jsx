import React, { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

async function loadExperimentDetails(experimentId)
{

  const experiment = await window.AiravataAPI.services.ExperimentService.retrieve({
        lookup: experimentId,
  });
  return experiment;
}

function GetSummary(experimentId) 
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect((experimentId)=>{
        loadExperimentDetails(experimentId)
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
      
      return (
        <TableContainer component={Paper}>
        </TableContainer>
      );
    }
}

function JobSummary() {
    return (
       <div>
            <GetSummary />
       </div>
    );
}

export default JobSummary;