import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')

);
export { default as Navigation } from './components/Navigation';
export { default as Home } from './pages/Home';
export { default as About } from './pages/About';
export { default as Contact } from './pages/Contact';
export { default as Documentation } from './pages/Documentation';
export { default as Workspace } from './pages/Workspace';
export { default as PastExperiments } from './pages/PastExperiments';
export { default as FileUpload } from './pages/FileUpload';
export { default as NewExperiment } from './pages/NewExperiment';
export { default as Groups } from './pages/Groups';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
