import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Navigation() {
    return (
        <div className="navigation" width="100%">
            <nav className="navbar navbar-expand bg-transparent">
                <div className="container">
                    <Link class="navbar-brand" to="/">
                        RNAMake
                    </Link>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className={`nav-item  /`} >
                                <Link class="nav-link" to="/">
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
                            <li className={`nav-item  /file-upload`} >
                                <Link class="nav-link" to="/file-upload">
                                    File Upload
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className={'nav-item /faq'}>
                                <Link class="nav-link" to="/faq">
                                    FAQ
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
