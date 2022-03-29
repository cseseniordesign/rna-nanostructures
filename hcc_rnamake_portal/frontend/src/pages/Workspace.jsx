import React, { useEffect, useState } from 'react';
import './Workspace.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import small_RNA_SVG from '../graphics/small_RNA_SVG.svg';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ListItemButton, ListItemIcon } from '@mui/material';
import rnaHelix from '../graphics/rna-helix.png';
import ReportIcon from '@mui/icons-material/Report';
import Divider from '@mui/material/Divider';

/**
 * Fetches Experiments from ExperimentSearchService by username
 * @returns past experiments
 */
async function loadExperiments() {
  const data = await window.AiravataAPI.services.ExperimentSearchService.list({
    limit: 5,
    [window.AiravataAPI.models.ExperimentSearchFields.USER_NAME.name]:
        window.AiravataAPI.session.Session.username });
  return data;
}

/**
 * Renders relevant icon based on experiment status
 * @param {*} experimentStatus 
 * @returns 
 */
function renderStatusIcon(experimentStatus) {
  if (experimentStatus === 'LAUNCHED' || experimentStatus === 'EXECUTING') {
    return (
      <React.Fragment>
        <img src={rnaHelix} alt='' className='helix-icon'/>
      </React.Fragment>
    );
  } else if (experimentStatus === 'COMPLETED') {
    return (
      <React.Fragment>
        <CheckCircleIcon style={{ fill:'green', fontSize:'50px' }}/>
      </React.Fragment>
    );
  } else if (experimentStatus === 'FAILED') {
    return (
      <React.Fragment>
        <ReportIcon style={{ fill:'#d01818', fontSize:'50px' }}/>
      </React.Fragment>
    );
  }
}

/**
 * @returns List of Experiments and status or Loading message
 */
function BasicList() {
    let history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(()=>{
      loadExperiments()
     // console.log(res)
      .then(result => result.results)
      .then(
        (result) =>{
          setItems(result);
          setIsLoaded(true);
        }
      )
    },[])
  
   if (!isLoaded) {
      return <div>Loading...</div>;

    } else {
      return (
        <Box>
        <List>
            {items.map((row) => (
                <React.Fragment>
                  <Divider/>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ height:'150px' }} onClick={() => {
                      history.push('job-summary/' + row.experimentId);
                    }}>
                      <ListItemIcon>
                        { renderStatusIcon(row.experimentStatus.name) }
                      </ListItemIcon>
                      <ListItemText primary={row.name} secondary={row.experimentStatus.name} style={{ textAlign: 'center' }}/>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                </React.Fragment>
            ))}
        </List>
        </Box>
      );
    }
}

/**
 * @returns Formatted Workspace
 */
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
                            history.push('/rnamake_portal/new-experiment');
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
                    <img src={small_RNA_SVG} alt='' style={{ height:'700px' }}></img>
                </div>
            </div>

           <div className='recent-exp'>
                <p className='exp-font'>Recent Experiments</p>
                <BasicList />
           </div>
       </div>
    );
}

export default Workspace;