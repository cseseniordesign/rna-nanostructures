import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import basepair from "../images/basepair.png";

function FAQ() {
    return (
        <Grid className='faq'>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content'>
                    <Typography>What is RNAMake?</Typography>
                </AccordionSummary>
                <AccordionDetails align={'left'}>
                    <Grid container direction='row'>
                        <Grid item lg={6} align={'left'}>
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
                            {/* Image demonstrating basepairs on an RNA structure */}
                            <img src={basepair} alt='' width={"75%"} height={"100%"}></img>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1b'>
                    <Typography>What are basepairs and basepair ends?</Typography>
                </AccordionSummary>
                <AccordionDetails align={'left'}>
                    A basepair is a stable arrangement between two nucleotides through hydrogen bonding and stacking.
                    These are A-U and G-C which are known as Watson-Crick pairs. 
                    <br />
                    A basepair end is a basepair that has no basepair after it.
                    So it’s the end of a helix this is a place that RNAMake can build a new RNA segment.
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1b'>
                    <Typography>What does "number of designs" mean?</Typography>
                </AccordionSummary>
                <AccordionDetails align={'left'}>
                    The number of designs is the number of unique solutions you get in the end.
                    If you only want an idea of what would work, then you don’t need more than one.
                    <br />
                    The more you ask for, the better the chance you will get the “best” solution (i.e. one that fits very well between the two base pair ends supplied).
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1b'>
                    <Typography>What are the RNA Pathfinding Problem types?</Typography>
                </AccordionSummary>
                <AccordionDetails align={'left'}>
                    Variable-Length Path (TTR):
                        <br />
                        Generates RNAs of variable length based on a heuristic path finding algorithm.
                    <br />
                    Known Topology Path (TTR mc):
                        <br />
                        Generates RNAs of a set composition of RNA motifs and helices. This should allow us to pick 2 throuh 6 junctions.
                    <br />
                    Custom Motif in Path (TTR supply_motif):
                        <br />
                        Same as TTR mc but also allows you to include a known motif into the path that must be included in all solutions.
                    <br />
                    Path Around Protein:
                        <br />
                        Generates a path around a protein. PDB must include a protein in it.
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1b'>
                    <Typography>What are PDBs, and how are they used?</Typography>
                </AccordionSummary>
                <AccordionDetails align={'left'}>
                    PDB files store the 3D coordinates of biomolecules.
                    <br />
                    <a href={'https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/introduction'}>
                        Introduction to PDB Data
                    </a>
                </AccordionDetails>
            </Accordion>
            {/* To add more 2-column FAQ items, use the same grid format as above*/}
            {/* For 1-column FAQ items, use lg={12} instead of lg={6} and just use one Grid item*/}
        </Grid>
    );
}

export default FAQ;