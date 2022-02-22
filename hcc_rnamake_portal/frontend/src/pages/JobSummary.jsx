import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

async function loadExperimentDetails(experimentId)
{
  console.log(experimentId);
  const experiment = await window.AiravataAPI.services.ExperimentService.retrieve({
        lookup: experimentId,
  });
  console.log(experiment);
  return experiment;
}

function GetSummary(props) 
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(()=>{
      loadExperimentDetails(props.experimentId)
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
     console.log(items);
      return (
        <TableContainer component={Paper}>
        </TableContainer>
      );
    }
}

function JobSummary() {
    const params = useParams();
    return (
       <div>
            <GetSummary experimentId={params.experimentId}/>
       </div>
    );
}

export default JobSummary;