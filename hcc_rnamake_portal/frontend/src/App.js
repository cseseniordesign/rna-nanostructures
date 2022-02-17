import {React,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation,  Workspace, PastExperiments, NewExperiment, FileUpload } from './index.js';
// import helix from './Graphics/helix.svg';
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
                  <Route path="/" exact component={() => <Workspace />} />
                  <Route path="/past-experiments" exact component={() => <PastExperiments />} />
                  <Route path="/file-upload" exact component={() => <FileUpload />} />
                  <Route path="/new-experiment" exact component={() => <NewExperiment />} />
                  <Route path="/job-summary" exact component={(experimentId) => <JobSummary experimentId={experimentId}/>} />

              </Switch>
          </Router>
          {/* <header className="App-header">
              <img src={helix} className="App-logo" alt="logo" />
            <p>RNAMake </p>
          </header> */}
      </div>
  );
}

export default App;
