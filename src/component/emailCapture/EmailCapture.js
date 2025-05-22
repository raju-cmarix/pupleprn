import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ReactComponent as MainImage } from "assets/images/icons/emailcapture-img.svg";
import { NewEmailCaptureLogo } from "assets/svg";

import "./emailCapture.scss";
import EmailCaptureForm from "./EmailCaptureForm";

function EmailCapture() {
  return (
    <>
      <Helmet>
        <title>PurplePRN - Email Capture</title>
      </Helmet>
      <div className="emailcapture">
        <div className="custom-container">
          <Row className="align-items-center">
            <Col lg={6} className="capture-banner">
              <Link className="capture-logo">
                <NewEmailCaptureLogo />
              </Link>
              <h1>
                Hire Staff or Apply to Work<span>Quickly and Simply</span>
              </h1>
              <p>
                Purple PRN connects allied health professionals (PT, PTA, OT,
                OTA, SLP) with local healthcare facilities for PRN shifts.
              </p>
              <div className="capture-main-img">
                <MainImage />
              </div>
            </Col>
            <Col lg={6} className="email-connect">
              <div className="card">
                <h3>Let’s Connect.</h3>
                <span>Sign up to learn more about Purple PRN</span>
                <EmailCaptureForm />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default EmailCapture;
