import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

async function loadExperimentDetails(experimentId)
{
  const data = await window.AiravataAPI.utils.FetchUtils.get(
      "/api/experiment-storage/"+experimentId,
      ""
  );
//  const experiment = await window.AiravataAPI.services.ExperimentService.retrieve({
//        lookup: experimentId,
//  });
  return data;
}

async function getUriData(uri)
{
    const result = await window.AiravataAPI.utils.FetchUtils.get(
      uri,
      "",
      {
        responseType :"text",
      }
    );
    return result;
}

function GetSummary(props) 
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [files, setFileInfo] = React.useState({
      stdout:'',
      stderr:'',
      output_pdbs:''
    });
    const [items, setItems] = useState([]);
    const [stdout, setstdout] = useState([]);
    
    useEffect(()=>{
      loadExperimentDetails(props.experimentId)
      .then(
        (result) =>{
          setItems(result);
          console.log(result['files']);
          for (var i=0; i<result['files'].length; i++)
          {
            const file = getUriData(result['files'][i]['downloadURL']);
            const name = result['files'][i]['name'].split('.')[1];
            setFileInfo(prevState => ({
              ...prevState,
              //split is required as name is prepended with application name, eg: RNAMake.stderr
              [name]: file
            }));
          }
          console.log(files);
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
      return (
        <Box component="div" sx={{ whiteSpace: 'normal' }}>
          
        </Box>
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