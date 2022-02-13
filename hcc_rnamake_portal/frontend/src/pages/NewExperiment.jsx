import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import JobName from './JobName';
import PDBSettings from './PDBSettings';
//import PaymentForm from './PaymentForm';
import Review from './Review.jsx';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
    </Typography>
  );
}

const steps = ['Description', 'Settings', 'Review'];


function getStepContent(step, handleChange, settings, handleUpload) {
  switch (step) {
    case 0:
      return <JobName handleChange={handleChange} />;
    case 1:
      return <PDBSettings handleChange={handleChange} handleUpload={handleUpload}/>;
    case 2:
      return <Review settings={settings}/>;
  //  case 3:
  //    return <Designs />;
  //  case 4:
  //    return <Review />;
  //  case 5:
  //    return <Submit />;
    default:
      throw new Error('Unknown step');
  }
}



const theme = createTheme();

  async function submitExperiment(info) {
    // Construct experiment object
    const experimentData = await window.AiravataAPI.utils.ExperimentUtils.createExperiment({
        applicationInterfaceId: "Test_71e1a6f2-00d4-4cbe-9a90-b4cbb2f39010",
        computeResourceName: "js-168-229.jetstream-cloud.org",
        experimentName: "Test"
    });
    console.log(info);
    // Save experiment
    console.log("submitted?");
    //const experiment = await window.AiravataAPI.services.ExperimentService.create({ data: experimentData });
    // Launch experiment
    //await window.AiravataAPI.services.ExperimentService.launch({ lookup: experiment.experimentId });
  };

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [submissionInfo, setSubmissionInfo] = React.useState({
    name:'',
    description:'',
    designs:'',
    scaffolds:'',
    timeLimit:'',
    startingBase:'',
    endingBase:'',
    localUpload:''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log({name,value});
    setSubmissionInfo(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleUpload = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    console.log({name, file});

    setSubmissionInfo(prevState => ({
      ...prevState,
      [name]: file
    }));
  };



  const handleNext = () => {
    setActiveStep(activeStep + 1);
    console.log(window);
    if(activeStep===2)
    {
      submitExperiment(submissionInfo);
    }
  };
 
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Design New RNA Scaffold
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Job Submitted.
                </Typography>
                <Typography variant="subtitle1">
                  <a href="/workspace">Return to portal</a>
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, handleChange, submissionInfo, handleUpload)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button style={{ color:'#4C5F94' }} onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button variant="contained" style={{ backgroundColor:'#4C5F94' }} onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Submit Job' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}