import React, { useEffect, useState } from "react";
import "./Workspace.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import small_RNA_PNG from "../graphics/small_RNA_PNG.png";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Grid, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import rnaHelix from "../graphics/rna-helix.png";
import ReportIcon from "@mui/icons-material/Report";
import Divider from "@mui/material/Divider";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';
async function loadExperiments() {
  const data = await window.AiravataAPI.services.ExperimentSearchService.list({
    limit: 5,
    [window.AiravataAPI.models.ExperimentSearchFields.USER_NAME.name]:
      window.AiravataAPI.session.Session.username,
  });
  return data;
}

const BASEURL = window.location.origin;

// used fetch instead of airavata api to fetch the data because every time the airavata api is called it has a loading screen.
async function loadExperiments() {
const data = fetch(BASEURL + "/api/experiment-search/?limit=5&offset=0&USER_NAME="+ window.AiravataAPI.session.Session.username,{
  credentials: 'include',
  mode: 'cors',
  method: 'GET',
});
  return data;
}

function renderStatusIcon(experimentStatus) {
  if (experimentStatus === "LAUNCHED" || experimentStatus === "EXECUTING") {
    return (
      <React.Fragment>
        <img src={rnaHelix} alt="" className="helix-icon" />
      </React.Fragment>
    );
  } else if (experimentStatus === "COMPLETED") {
    return (
      <React.Fragment>
        <CheckCircleIcon style={{ fill: "green", fontSize: "50px" }} />
      </React.Fragment>
    );
  } else if (experimentStatus === "FAILED") {
    return (
      <React.Fragment>
        <ReportIcon style={{ fill: "#d01818", fontSize: "50px" }} />
      </React.Fragment>
    );
  }
}

function goToExperiment(history, experimentId, experimentStatus,setOpen) {
  if(experimentStatus === "COMPLETED" || experimentStatus === "FAILED") {
    history.push("/rnamake_portal/job-summary/" + experimentId);
  } else {
    setOpen(true);
  }
}

function BasicList() {
  let history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    loadExperiments()
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setItems(result['results']);
        setIsLoaded(true);
      });

      const interval=setInterval(()=>{
        loadExperiments()
        .then((result) => result.json())
        .then((result) => {
        console.log(result['results']);
        setItems(result['results']);
      });
       },10000)
        
      return()=>clearInterval(interval)

  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box>
        <List>
          {items.map((row) => (
            <React.Fragment>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton
                  sx={{height: "150px"}}
                  onClick={() => {
                    goToExperiment(history, row.experimentId, row.experimentStatus, setOpen);
                  }}
                >
                  <ListItemIcon>
                    {renderStatusIcon(row.experimentStatus)}
                  </ListItemIcon>
                  <ListItemText
                    primary={row.name}
                    secondary={row.experimentStatus}
                    style={{textAlign: "center"}}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: '100%'}}>
                  Job is not complete, please wait for it to finish executing.
                </Alert>
              </Snackbar>
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
  }
}

function Workspace() {
  let history = useHistory(); // used for rerouting to another page.
  return (
    <Grid container spacing={1} style={{minHeight: '1000px', height: 'auto'}}>
      <Grid item xs={8} style={{backgroundImage: `url(${small_RNA_PNG})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <Typography variant="h1">RNAMake</Typography>
        <Typography variant="h3">3D Design Toolkit</Typography>
        <br/>
        <br/>
        <br/>
        <Button
          onClick={() => {
            history.push("/rnamake_portal/new-experiment");
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--xlarge"
        >
          Design New RNA Scaffold
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <Typography variant="h5">
            <br/>
            Recent Jobs
          </Typography>
          <BasicList />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Workspace;
