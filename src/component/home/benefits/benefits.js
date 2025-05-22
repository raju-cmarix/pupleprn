import React from "react";
import { Col, Row } from "reactstrap";
import { ReactComponent as BenefitImage } from "../../../assets/images/icons/benefit1.svg";
import { ReactComponent as BenefitImage1 } from "../../../assets/images/icons/benefit2.svg";
import { ReactComponent as BenefitImage2 } from "../../../assets/images/icons/benefit3.svg";
import { LifeHeartIcon } from "../../../assets/svg";
import "./benefits.scss";

function Benefits() {
  return (
    <>
      <div className="benefits-main">
        <div className="custom-container">
          <div className="title">
            <h2>
              <LifeHeartIcon />
              Why Purple <span>PRN</span>?
            </h2>
          </div>
          <Row className="reverse">
            <Col lg={7}>
              <div className="benefits-text">
                <h5>For Clinicians</h5>
                <ul>
                  <li>
                    Create your own schedule: work as much or as little as you
                    want
                  </li>
                  <li>
                    Make more money working part time than your salaried peers
                  </li>
                  <li>
                    Try out different therapy settings without a long term
                    commitment
                  </li>
                  <li>
                    Search and apply for open shifts right from your phone
                  </li>
                  <li>Ratings and feedback for clinics and clinicians</li>
                  <li>
                    Try out a clinic and build relationships that can lead to a
                    full time shift
                  </li>
                  <li>
                    Access to our support team that will communicate with you
                    quickly
                  </li>
                  <li>Get paid directly to your bank account</li>
                </ul>
              </div>
            </Col>
            <Col lg={5}>
              <div className="benefits-img text-right">
                <BenefitImage />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <div className="benefits-img text-left">
                <BenefitImage1 />
              </div>
            </Col>
            <Col lg={7}>
              <div className="benefits-text">
                <h5>For Facilities</h5>
                <ul>
                  <li>Find coverage quickly</li>
                  <li>Flex with cyclical volume changes throughout the year</li>
                  <li>
                    See if a clinician is a good fit for a full time shift offer
                  </li>
                  <li>
                    Get staffing help when you’re almost, but not quite, busy
                    enough to hire a full time clinician
                  </li>
                  <li>
                    Easily book coverage for employees taking PTO, maternity
                    leave, FMLA, etc
                  </li>
                  <li>
                    Communicate directly with clinicians before, during, and
                    after a shift
                  </li>
                  <li>No exorbitant staffing company fees</li>
                  <li>
                    Review clinician profile and ratings before confirming a
                    shift
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="reverse">
            <Col lg={7}>
              <div className="benefits-text">
                <h5>For Patients</h5>
                <ul>
                  <li>
                    Better service: Clinicians aren't overloaded with 3-4
                    patients per hour
                  </li>
                  <li>Consistent care and adherence to your treatment plan</li>
                  <li>No last minute reschedules or cancellations</li>
                  <li>
                    Get excellent care from highly-trained and motivated
                    clinicians
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={5}>
              <div className="benefits-img text-right">
                <BenefitImage2 />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Benefits;
