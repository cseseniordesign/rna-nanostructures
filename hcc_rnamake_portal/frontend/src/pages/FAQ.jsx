import React from "react";
import basepair from "../images/base-pair.png";

function FAQ() {
    return (
        <div className="faq">
            <div className="container">
                <div className="col-lg-8">
                    <p>
                        <a className="base-pair">
                            <image src={basepair} />
                        </a>
                    </p>
                </div>
                <div>
                    <p>
                        Sample text
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FAQ;