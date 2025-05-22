import React from "react";

function GeneralInformation() {
    
    return (
        <>
            <div className="general-content">
                <div className="first-block">
                    <div className="day-time-lang">
                        <div className="days-time">
                            <h3>Days and times available</h3>
                            <ul>
                                <li>Monday from 10:30 to 16:30</li>
                                <li>Tuesday from 10:30 to 16:30</li>
                                <li>Friday from 10:30 to 16:30</li>
                                <li>Saturday from 10:30 to 20:00</li>
                            </ul>
                        </div>
                        <div className="lang">
                            <h3>Languages</h3>
                            <ul>
                                <li>English</li>
                                <li>Spanish</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="block">
                    <h3>Education</h3>
                    <ul>
                        <li>Houston Community College Physical Therapy Assistant (PTA) School (2008)</li>
                        <li>College of Health Sciences, The University of Delaware DPT (2012)</li>
                    </ul>
                </div>

                <div className="block">
                    <h3>Certification</h3>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit (2008)</li>
                        <li>consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore (2010)</li>
                        <li>Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat (2011)</li>
                    </ul>
                </div>

                <div className="block">
                    <h3>Specialties</h3>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit (2009)</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit (2009)</li>
                    </ul>
                </div>
                
            </div>
        </>
    );
}

export default GeneralInformation;
