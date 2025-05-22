import React from "react";
import {
  CLINICIAN_CALENDLY_LINK,
  FACILITY_CALENDLY_LINK,
} from "constants/AppConstants";
import { Link } from "react-router-dom";
// import { Container, Modal, ModalBody, Form } from "reactstrap";
// import { Container } from "reactstrap";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import { CLINICIAN_CALENDLY_LINK } from "constants/AppConstants";
// import { Form } from "reactstrap";
// import "../signup Success/signup.scss";
const SignupFinalStep = ({ isClinician }) => {
  return (
  
    <div className="signup-layout signup-success-layout">
      <div fluid>
        <div className="signup-card">
          <Link to="/" className="mainhome">
            Home
          </Link>
          <div className="title">
            <h1>
              You have successfully
              <br />
              <span>signed up!</span>
            </h1>
          </div>
          <p>
                      The last step is a short call (avg is 8 minutes) with an
                      onboarding team member (we're all PTs).
                    </p>
                    <ol className="text-left">
                      <li>
                        <p className="mb-1">We need to make sure you're a real person</p>
                      </li>
                      <li>
                        <p className="mb-1">We'll answer any questions you have</p>
                      </li>
                      <li>
                        <p className="mb-1">Then we're done and we'll get you activated</p>
                      </li>
                      <li>
                        <p className="mb-1">
                          We know you're busy so we'll make this call as short
                          or as long as you'd like
                        </p>
                      </li>
                    </ol>
          {/* <div className="signedup">
            <p>
              A short call (avg is 8 minutes) with an onboarding team member
              (we're all PTs)
            </p>
          </div>
*/}
          <a
              rel="noreferrer"
              href={CLINICIAN_CALENDLY_LINK}
              target={"_blank"}
              className="pt-btn btn-primary sign-btn">
              Schedule Now!
            </a> 
        </div>
      </div>
    </div>
  );
};

export default SignupFinalStep;