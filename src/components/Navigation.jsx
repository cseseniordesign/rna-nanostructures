import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Navigation() {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand bg-transparent">
                <div className="container">
                    <Link class="navbar-brand" to="/">
                        RNAMake
                    </Link>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className={`nav-item  /about`}>
                                <Link class="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                            <li className={`nav-item  /contact`}>
                                <Link class="nav-link" to="/contact">
                                    Contact
                                </Link>
                            </li>
                            <li className={`nav-item  /documentation`}>
                                <Link class="nav-link" to="/documentation">
                                    Documentation
                                </Link>
                            </li>
                            <li className={`nav-item  /workspace`} >
                                <Link class="nav-link" to="/workspace">
                                    Workspace
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className={`nav-item  /past-experiments`} >
                                <Link class="nav-link" to="/past-experiments">
                                    Past Experiments
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className={`nav-item  /groups`} >
                                <Link class="nav-link" to="/groups">
                                    Groups
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className={`nav-item  /file-upload`} >
                                <Link class="nav-link" to="/file-upload">
                                    File Upload
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(Navigation);
