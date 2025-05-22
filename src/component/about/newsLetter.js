import React from "react";
import { Input } from "reactstrap";
import './about.scss'

function NewsLetter() {
    return (
        <>
            <div className="news-letter">
                <div className="custom-container">
                    <div className="newsletter">
                        <span>Get started</span>
                        <h2>Enter your email address<br />
                            and get started for free</h2>
                        <div className="newsletter-input">
                            <Input type="email" placeholder="Enter you email address" />
                            <button className="btn-primary pt-btn pt-btn-small">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsLetter;
