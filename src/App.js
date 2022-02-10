import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation, Home, About, Contact, Documentation, Workspace, PastExperiments, NewExperiment, FileUpload, Groups } from './index.js';
// import helix from './Graphics/helix.svg';
import './App.css';


function App() {
  return (
      <div className="App">
          <Router>
              <Navigation />
              <Switch>
                  <Route path="/" exact component={() => <Home />} />
                  <Route path="/about" exact component={() => <About />} />
                  <Route path="/contact" exact component={() => <Contact />} />
                  <Route path="/documentation" exact component={() => <Documentation />} />
                  <Route path="/workspace" exact component={() => <Workspace />} />
                  <Route path="/past-experiments" exact component={() => <PastExperiments />} />
                  <Route path="/file-upload" exact component={() => <FileUpload />} />
                  <Route path="/new-experiment" exact component={() => <NewExperiment />} />
                  <Route path="/groups" exact component={() => <Groups />} />
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
