import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import AppBar from '@mui/material/AppBar';
import { Container, Toolbar } from '@mui/material';

function Navigation() {
    let history = useHistory();
    return (
        <React.Fragment>
        <AppBar position='static' sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
            <Container>
            <Toolbar disableGutters sx={{justifyContent: 'center'}}>
                <Fab variant='extended' sx={{margin: '2em 1em'}} onClick={() => {history.push("/rnamake_portal/workspace");}}>
                    <ScienceRoundedIcon/>
                    Workspace
                </Fab>
                <Fab variant='extended' sx={{margin: '2em 1em'}} onClick={() => {history.push("/rnamake_portal/past-experiments");}}>
                    <InsertDriveFileRoundedIcon/>
                    Past Experiments
                </Fab>
                <Fab variant='extended' sx={{margin: '2em 1em'}} onClick={() => {history.push("/rnamake_portal/faq");}}>
                    <HelpRoundedIcon/>
                    FAQ
                </Fab>
            </Toolbar>
            </Container>
        </AppBar>
        </React.Fragment>
    );
}

export default withRouter(Navigation);
