import React from "react";
import { Link } from "react-router-dom";
import './ourLocation.scss'

function LocationHead() {
    return (
        <>
            <div className="location-head">
                <div className="custom-container">
                    <h1>Our <span>Locations</span></h1>
                    <div className="breadcrumb">
                        <Link to="/">Home / </Link>
                        <span>Our Locations</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LocationHead;
