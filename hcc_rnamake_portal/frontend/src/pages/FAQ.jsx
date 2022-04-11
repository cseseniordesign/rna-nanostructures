import React from "react";
import Grid from '@mui/material/Grid';
import basepair from "../images/basepair.png";

function FAQ() {
    return (
        <div className='faq'>
            <Grid container spacing={2}>
                <Grid item lg={6} align={"left"}>
                    RNAMake leverages an extensive motif library and pathfinding algorithms to automate the assembly of RNA 3D motifs in design.
                    Specifically, RNAMake is capable of generating RNA segments in 3D composed of continuous chains of RNA motifs that that twist and translate between any two desired helical endpoints.
                    Submission requires a PDB containing RNA that has at least 2 basepair ends.
                    An example structure is shown in the image. This name tells the webserver the start and end of a submitted structure.
                    <br /><br />
                    The basepair name represents the basepair's two contained residues.
                    The basepair name in the format chain is appended to its residue number.
                    In the case of A141-A162, it means that there is a basepair between residue 141 on chain A to residue 161 also on chain A. 
                </Grid>
                <Grid item lg={6}>
                    <img src={basepair} alt='' width={"75%"} height={"100%"}></img>
                </Grid>
            </Grid>
        </div>
    );
}

export default FAQ;