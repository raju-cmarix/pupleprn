import React from "react";
import { Link } from "react-router-dom";
import './about.scss'

function AboutHead() {
    return (
        <>
            <div className="about-head">
                <div className="custom-container">
                    <h1>About <span>Us</span></h1>
                    <div className="breadcrumb">
                        <Link to="/">Home / </Link>
                        <span> About US</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutHead;
