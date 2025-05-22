import React from "react";
import { Container } from "reactstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CLINICIAN_CALENDLY_LINK } from "constants/AppConstants";

export default function SignUpSuccessful() {
  return (
    <>
      <Helmet>
        <title>Purple PRN - You have successfully signed up</title>
      </Helmet>
      <div className="signup-layout signup-layout-final">
        <Container fluid>
          <div className="signup-card">
            <Link
              to="/"
              className="mainhome">
              Home
            </Link>
            <div className="title">
              <h1>
                You have successfully<br></br>
                <span>signed up!</span>
              </h1>
            </div>

            <div className="signedup">
              {/* <p>
                <a
                  rel="noreferrer"
                  // href="https://calendly.com/purpleprn/30/account-verification-call"
                  target={"_blank"}
                >
                  Click below
                </a>{" "}
                to book a time on Calendly to schedule an onboarding call to
                complete your registration!
              </p> */}
              <p>
                The next step in the registration process is to schedule a brief
                interview with our onboarding team. This will help us customize
                your experience to get more shifts fulfilled and answer any
                questions you may have.{" "}
              </p>
            </div>

            <a
              rel="noreferrer"
              href={CLINICIAN_CALENDLY_LINK}
              target={"_blank"}
              className="pt-btn btn-primary sign-btn">
              Schedule Now!
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
