import ConditionalLinks from "component/common/ConditionalLinks";
import React from "react";
import { ReactComponent as BenefitImage } from "../../../assets/images/icons/benefit1.svg";
import { ReactComponent as BenefitImage1 } from "../../../assets/images/icons/benefit2.svg";
import { ReactComponent as BenefitImage2 } from "../../../assets/images/icons/benefit3.svg";
import {
  HowItWorks,
  ClinicianHowFirst,
  ClinicianHowSecond,
  ClinicianHowThird,
} from "../../../assets/svg";
import "./howitworks.scss";

function Howitworks({ applyForWork }) {
  return (
    <>
      <div className="howitworks-main">
        <div className="custom-container">
          <div className="title">
            <h2>
              <HowItWorks />
              How It <span>Works</span>
            </h2>
          </div>
          <div className="how-cards-main">
            <div className="how-card">
              <div className="how-card-img">
                <ClinicianHowFirst />
              </div>
              <ul>
                <li>Create your free profile</li>
                <li>Browse open shifts</li>
              </ul>
            </div>
            <div className="how-card">
              <div className="how-card-img">
                <ClinicianHowSecond />
              </div>
              <ul>
                <li>Work your shift</li>
              </ul>
            </div>
            <div className="how-card">
              <div className="how-card-img">
                <ClinicianHowThird />
              </div>
              <ul>
                <li>Rate your experience</li>
                <li>Get paid!</li>
              </ul>
            </div>
          </div>

          {/* <Row>
            <Col md={7}>
              <div className="howitworks-text">
                <h5>The first way</h5>
                <ol className="howitworks-text-list">
                  <li>Create your free profile</li>
                  <li>Search and apply to open shifts in your area</li>
                  <li>Get accepted by facility and carry out your shift</li>
                  <li>Rate your experience</li>
                  <li>Get paid!</li>
                </ol>
              </div>
            </Col>
            <Col md={5}>
              <div className="howitworks-img text-right">
                <BenefitImage />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <div className="howitworks-img text-left">
                <BenefitImage1 />
              </div>
            </Col>
            <Col md={7}>
              <div className="howitworks-text">
                <h5>The second way</h5>
                <ol className="howitworks-text-list">
                  <li>Create your free profile</li>
                  <li>Set your available hours</li>
                  <li>Clinics will book you based on your availability</li>
                  <li>Confirm shift</li>
                  <li>Carry our your shift</li>
                  <li>Rate your experience</li>
                  <li>Get paid!</li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <div className="howitworks-text">
                <p>Update your availability in your profile and clinics will contact you to book a shift. We also have a job board where clinicians can browse open shifts. You can book a shift starting tomorrow or one that begins in a few months.</p>
                <p>Freedom, flexibility, and control over your career are the cornerstones of per-diem work at Purple PT. Are you ready to join us?</p>
              </div>
            </Col>
            <Col md={5}>
              <div className="howitworks-img text-right">
                <BenefitImage2 />
              </div>
            </Col>
          </Row> */}
          <div className="how-it-works-btn">{applyForWork("Join us!")}</div>
        </div>
      </div>
    </>
  );
}

export default Howitworks;
