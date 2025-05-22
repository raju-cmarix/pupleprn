import React from "react";
import { Col, Row } from "reactstrap";

import { ReactComponent as MainImage } from "../../../assets/images/icons/facility-main.svg";
import "./landingMain.scss";

function LandingMainhead({ hireStaffButton }) {
  window.dataLayer.push({
    event: 'pageview',
    page: {
      title: 'For Facilities',
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
              <div className="landing-main-img text-center">
                <MainImage />
              </div>
            </Col>
            <Col lg={6}>
              <div className="landing-main-content">
                <h1>
                  Hire Staff <span>Quickly and Simply</span>
                </h1>
                <div className="landing-btns">
                  {hireStaffButton}

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
