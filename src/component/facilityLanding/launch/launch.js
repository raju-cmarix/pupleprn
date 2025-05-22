import ConditionalLinks from "component/common/ConditionalLinks";
import React from "react";
import { LaunchIcon, Mark } from "../../../assets/svg";
import "./launch.scss";

function Launch({ hireStaffButton }) {
  return (
    <>
      <div className="launch-main facility-launch">
        <div className="launch-content">
          <div className="title">
            <h2>
              <LaunchIcon />
              Facilities We <span className="ms-2"> Serve</span>
            </h2>
          </div>
          <div className="facility-launch-list">
            <ul>
              <li>
                <span>
                  <Mark />
                </span>
                Outpatient Clinics
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                Skilled Nursing Facilities
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                Hospitals
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                Long Term Acute Care{" "}
              </li>
              <li className="mb-0">
                <span>
                  <Mark />
                </span>
                Rehabilitation Facilities
              </li>
              <li className="mb-0">
                <span>
                  <Mark />
                </span>
                Nursing Homes
              </li>
            </ul>
          </div>
          {hireStaffButton}
        </div>
      </div>
    </>
  );
}

export default Launch;
