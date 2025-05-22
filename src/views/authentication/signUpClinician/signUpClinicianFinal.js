import React, { useState } from "react";
import { Container, Form, Input } from "reactstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CLINICIAN_CALENDLY_LINK } from "constants/AppConstants";

const SignUpClinicianFinal = () => {
  return (
    <>
      <Helmet>
        <title>Purple PRN - You have successfully signed up</title>
      </Helmet>
      <div className="signup-layout signup-layout-final clinician">
        <Container fluid>
          <div className="signup-card">
            <div className="title">
              <h1>
                You have successfully<br></br>
                <span>signed up</span>!
              </h1>
            </div>

            <div className="signedup">
              <p>
                <a href={CLINICIAN_CALENDLY_LINK}>Click here</a> to book a time
                on Calendly to schedule an onboarding call to complete your
                registration!
              </p>
            </div>

            <button
              className="pt-btn btn-primary sign-btn"
              type="button"
              color="primary">
              Schedule Now!
            </button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUpClinicianFinal;
