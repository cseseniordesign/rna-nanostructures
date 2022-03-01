import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
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
    const [stdOut, setStdOut] = useState();
    const [stdErr, setStdErr] = useState();
    const [uriCollection, setUriCollection] = useState([]);
    const [files, setFileInfo] = React.useState({
      stdout:'',
      stderr:'',
      output_pdbs:''
    });
    
    useEffect(()=>{
      loadExperimentDetails(props.experimentId)
      .then(
        (result) =>{
          console.log(result['files']);
          setUriCollection(result['files']);
          for (var i=0; i<result['files'].length; i++)
          {
            if(result['files'][i]['name'].endsWith('stderr'))
            {
                getUriData(result['files'][i]['downloadURL']).then((result)=> {setStdErr(result)});
                //setStdErr(getUriData(result['files'][i]['downloadURL']));
            }
            else if(result['files'][i]['name'].endsWith('stdout'))
            {
                getUriData(result['files'][i]['downloadURL']).then((result)=> {setStdOut(result)});
                //setStdOut(getUriData(result['files'][i]['downloadURL']));
            }
            else if(result['files'][i]['name'].startsWith('design'))
            {

            }
            else 
            {
              //Something whack happened 
            }
            //const file = getUriData(result['files'][i]['downloadURL']);
            //split is required as name is prepended with application name, eg: RNAMake.stderr
            const name = result['files'][i]['name'].split('.')[1];
            console.log(typeof(name))
           // setFileInfo(prevState => ({
           //   ...prevState,
           //   [name]: file
           // }));
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
      console.log(stdOut);
      return (
        <Box component="div" sx={{ whiteSpace: 'normal'}}>
          <Grid item lg={6} align={"left"}>
            <Typography style={{whiteSpace: 'pre'}} variant = "body1" align="left">
              {stdOut}
            </Typography>
          </Grid>
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

