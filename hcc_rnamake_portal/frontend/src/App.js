import {React,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation,  Workspace, PastExperiments, NewExperiment, FileUpload, FAQ } from './index.js';

import './App.css';
import JobSummary from './pages/JobSummary.jsx';


function App() {
    useEffect(() => {
        const script = document.createElement("script");
        script.type="script";
        script.src = "~/HCC-rnamake-frontend/hcc_rnamake_portal/frontend/src/airavata-api.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);
  return (
      <div className="App">
          <Router>
              <Navigation />
              <Switch>
                  <Route path="/rnamake_portal/workspace" exact component={() => <Workspace />} />
                  <Route path="/rnamake_portal/past-experiments" exact component={() => <PastExperiments />} />
                  <Route path="/rnamake_portal/file-upload" exact component={() => <FileUpload />} />
                  <Route path="/rnamake_portal/new-experiment" exact component={() => <NewExperiment />} />
                  <Route path="/rnamake_portal/FAQ" exact component={() => <FAQ />} />
                  <Route path="/rnamake_portal/job-summary/:experimentId" exact component={(experimentId) => <JobSummary experimentId={experimentId}/>} />
              </Switch>
          </Router>
      </div>
  );
}

export default App;
