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

async function loadExperiments() {
  const data = await window.AiravataAPI.services.ExperimentSearchService.list({
    limit: 5,
    [window.AiravataAPI.models.ExperimentSearchFields.USER_NAME.name]:
      window.AiravataAPI.session.Session.username,
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

function BasicList() {
  let history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadExperiments()
      .then((result) => result.results)
      .then((result) => {
        setItems(result);
        setIsLoaded(true);
      });
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
                  sx={{ height: "150px" }}
                  onClick={() => {
                    history.push("job-summary/" + row.experimentId);
                  }}
                >
                  <ListItemIcon>
                    {renderStatusIcon(row.experimentStatus.name)}
                  </ListItemIcon>
                  <ListItemText
                    primary={row.name}
                    secondary={row.experimentStatus.name}
                    style={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
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
    <Grid container spacing={1}>
      <Grid item xs={8} style={{height: '800px', backgroundImage: `url(${small_RNA_PNG})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
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
