import ConditionalLinks from "component/common/ConditionalLinks";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {
  MsgQuestion,
  WhatClinicianIcon,
  WhatFacilityIcon,
} from "../../../assets/svg";
import "./whatIsPurple.scss";

function WhatIsPurple({ applyForWork }) {
  return (
    <>
      <div className="what-is-purple">
        <div className="custom-container">
          <div className="title">
            <h2>
              <MsgQuestion />
              What is Purple <span>PRN</span>?
            </h2>
          </div>
          <div className="what-purple-content">
            <div className="what-purple-left-content">
              <p>
                We help hard-working and highly-trained PTs, PTAs, OTs, OTAs,
                and SLPs find open shifts in different clinical settings.
              </p>
              <p>
                We believe therapists are underpaid and overworked. On our
                platform, clinicians create their own schedule to minimize
                burnout and maximize income.
              </p>
              <p>
                Search and sort openings by clinic rating, hourly rate,
                distance, and more. This gives clinicians the freedom to sign in
                anytime and look for a shift that fits their schedule.
              </p>
            </div>
            <div className="what-purple-right-content">
              <p>Most common uses of Purple PRN:</p>
              <ol className="common-uses-list">
                <li>Work a lot, then take time off to travel</li>
                <li>Gradually return to work after maternity leave</li>
                <li>Work in clinic while starting your side business</li>
                <li>
                  Earn more money working PRN than a salaried PT, PTA, OT, OTA,
                  SLP
                </li>
                <li>
                  Work with the flexibility to take care of family obligations
                </li>
                <li>Pay off student loans faster</li>
              </ol>
            </div>
          </div>
          <div className="what-purple-btn">{applyForWork()}</div>
        </div>
      </div>
    </>
  );
}

export default WhatIsPurple;
