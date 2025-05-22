import React from "react";
import { Col, Row } from "reactstrap";
import { ReactComponent as MainImage } from "../../../assets/images/icons/main-vector.svg";
import "./landingMain.scss";

function LandingMainhead({ applyForWork }) {
  window.dataLayer.push({
    event: 'pageview',
    page: {
      title: 'For Clinicians',
      url: window.location.href,
      path: window.location.pathname,
    }
  });
  return (
    <>
      <div className="landing-main-head">
        <div className="custom-container">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="landing-main-img">
                <MainImage />
              </div>
            </Col>
            <Col lg={6}>
              <div className="landing-main-content">
                <h1>
                  apply to work<span>Quickly And Simply</span>
                </h1>
                <p>
                  Purple PRN connects allied health professionals (PT, PTA, OT,
                  OTA, SLP) with local healthcare facilities for flexible shifts
                </p>
                <div className="landing-btns">
                  {applyForWork()}
                  {/* <Link to="/contactus" className="btn-secondary pt-btn ms-3">
                    Contact Us
                  </Link> */}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default LandingMainhead;
