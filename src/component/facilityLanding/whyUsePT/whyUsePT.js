import { FACILITY_SIGNUP } from "constants/AppConstants";
import React from "react";
import { Link } from "react-router-dom";
import { GetStartedFlag, Mark } from "../../../assets/svg";
import "./whyUsePT.scss";

function WhyUsePT() {
  return (
    <>
      <div className="why-use-PT">
        <div className="custom-container">
          <div className="title">
            <h2>
              <GetStartedFlag />
              Why use <span className="ms-2">Purple PRN?</span>
            </h2>
          </div>
          <div className="why-use-list">
            <ul>
              <li>
                <span>
                  <Mark />
                </span>
                <p>Get reimbursed from federal and private insurance</p>
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                <p>
                  Book highly qualified therapists for less than traditional
                  staffing agencies
                </p>
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                <p>
                  View therapists’ credentials, specialties, and vaccination
                  status anytime
                </p>
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                <p>
                  Select from our pool of motivated and experienced clinicians
                  to find the best match
                </p>
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                <p>
                  Book a therapist or post shifts any time, anywhere, on any
                  internet connected device
                </p>
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                <p>
                  Only book us when you need to - tomorrow or a few months from
                  now
                </p>
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                <p>
                  Communicate directly with clinicians using our messenger
                  platform
                </p>
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                <p>
                Purple PRN checks that every PT and PTA is licensed and in good
                  standing
                </p>
              </li>
              <li>
                <span>
                  <Mark />
                </span>
                <p>
                  Access our support team whenever you have questions or
                  concerns
                </p>
              </li>
            </ul>
            <div className="text-center">
              <Link to={FACILITY_SIGNUP} className="pt-btn btn-primary">
                Hire staff
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyUsePT;
