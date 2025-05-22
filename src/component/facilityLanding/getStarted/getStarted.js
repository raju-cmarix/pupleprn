import React from "react";
import { BulbIcon, MobileIcon, MsgQuestion } from "../../../assets/svg";
import "./getStarted.scss"

function GetStarted() {
  return (
    <>
    <div className="get-started-main">
        <div className="custom-container">
        <div className="title">
                <h2><MsgQuestion />What is Purple <span>PRN</span>?</h2>
                <p>Purple PRN is an on-demand staffing marketplace allowing facilities to find and book PRN or part-time allied health coverage</p>
            </div>
            <div className="get-started-content">
                <div className="whats-box">
                    <BulbIcon />
                    <h5>Frustrated With Antiquated Staffing Solutions?</h5>
                    <p>Running a facility is stressful enough without having to worry if you have appropriate therapist coverage.</p>
                    <p>Need coverage the next day?  Post a shift and it immediately gets sent to all relevant therapists.</p>
                    <p>Whether it’s half-day coverage for an extra busy schedule or coverage during maternity leave, let us help you find the perfect fit for your team.</p>
                </div>
                <div className="whats-box">
                    <MobileIcon />
                    <h5>Common Uses Of Purple PRN</h5>
                    <ul>
                        <li>Last minute PRN help</li>
                        <li>Ramp up or down as patient volume changes</li>
                        <li>Try out a potential employee, risk free</li>
                        <li>Help when you’re “almost busy enough” to hire a full time clinician but worry about volume decreases</li>
                        <li>Coverage for planned PTO, maternity leave, FMLA, etc</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default GetStarted;
