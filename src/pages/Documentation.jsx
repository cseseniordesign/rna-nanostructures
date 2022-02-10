import React from 'react';
import corner_swoosh from '../graphics/corner_swoosh.svg';


function Documentation() {
    return (
        <div className="documentation">
            <div className="container">
                <div className="row align-items-center my-5">
                    
                    <div className="col-lg-8">
                        {/* <a>
                            Documentation
                        </a> */}
                        <h1 className="font-weight-light">Acknowledgements</h1>
                        <p>
                            <a
                                className="App-link"
                                href="https://nsf.gov/awardsearch/showAward?AWD_ID=1148698"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open Science Grid
                            </a>
                            <br></br>
                            <a
                                className="App-link"
                                href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2030508"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Partnership to Advance Throughput Computing
                            </a>
                            <br></br>
                            <a
                                className="App-link"
                                href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1053575"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Extreme Science and Engineering Discovery Environment
                            </a>
                            <br></br>
                            <a
                                className="App-link"
                                href="https://www.nsf.gov/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                National Science Foundation
                            </a>
                            <br></br>
                            <a
                                className="App-link"
                                href="https://hcc.unl.edu/hcc"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Holland Computing Center of University of Nebraska
                            </a>
                            <br></br>
                            <a
                                className="App-link"
                                href="https://nebraska.edu/offices-policies/provosts-office/research/nebraska-research-initiative"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Nebraska Research Initiative
                            </a>
                            <br></br>
                        </p>
                    </div>
                </div>
            </div>
            <img src={corner_swoosh} alt="" width='100%'/>
        </div>
    );
}

export default Documentation;
