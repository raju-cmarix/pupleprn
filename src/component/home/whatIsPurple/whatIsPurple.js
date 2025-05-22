import React from "react";
import { MsgQuestion, WhatClinicianIcon, WhatFacilityIcon } from "../../../assets/svg";
import "./whatIsPurple.scss"

function WhatIsPurple() {
  return (
    <>
    <div className="what-is-purple">
        <div className="custom-container">
            <div className="title">
                <h2><MsgQuestion />What is Purple <span>PRN</span>?</h2>
                <p>We’re a staffing marketplace that matches physical therapists and physical therapist assistants with facilities looking for PRN or part-time coverage!</p>
            </div>
            <div className="what-purple-content">
                <div className="whats-box">
                    <WhatFacilityIcon />
                    <h3>For Facilities</h3>
                    <p>Purple PRN connects healthcare facilities with local, flexible physical therapists and physical therapy assistants.</p>
                </div>
                <div className="whats-box">
                    <WhatClinicianIcon />
                    <h3>For Clinicians</h3>
                    <p>We help hard-working and highly-trained PTs and PTAs find open shifts in different clinical settings</p>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default WhatIsPurple;
