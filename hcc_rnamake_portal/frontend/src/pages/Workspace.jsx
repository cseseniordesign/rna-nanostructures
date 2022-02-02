import React from 'react';
import './Workspace.css';
import small_RNA_SVG from '../graphics/small_RNA_SVG.svg';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';


function Workspace() {
    let history = useHistory(); // used for rerouting to another page.

    return (
       <div>
           <div className='home-left'>
               <div className='home-group'>
                   <text className='rna-title'>RNAMake</text>
                   <h2 className='rna-subtitle'>3D Design Toolkit</h2>
                   <div className='scaffold-button'>
                   <Button
                        onClick={() => {
                            history.push('/new-experiment');
                        }}
                        type="button"
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--xlarge"
                    >
                        Design New RNA Scaffold
                    </Button>
                   </div>
                </div>

                <div className='rna-svg'>
                    <img src={small_RNA_SVG} alt=''></img>
                </div>
            </div>

           <div className='recent-exp'>
                <p className='exp-font'>Recent Experiments</p>
           </div>
       </div>
    );
}

export default Workspace;