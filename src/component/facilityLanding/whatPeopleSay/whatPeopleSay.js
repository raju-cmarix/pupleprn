import React from "react";
import { Col, Row } from "reactstrap";
import Image from '../../../assets/images/image.jpg'
import { ChatGroupIcon, JobApplicationIcon, MedalIcon, MessageIcon, RefundIcon } from "../../../assets/svg";
import "./whatPeopleSay.scss"


function WhatPeopleSay() {
  return (
    <>
      <div className="what-people-say facility">
        <div className="custom-container">
          <div className="title">
            <h2><MessageIcon />Our <span className="ms-2">Benefits</span></h2>
          </div>
          <Row className="reverse">
            <Col lg={6}>
              <div className="facility-benefits">
                <div className="facility-benefit-box">
                    <MedalIcon />
                    <p>Next-day and same-day booking available.</p>
                </div>
                <div className="facility-benefit-box">
                    <RefundIcon />
                    <p>Free to post shifts</p>
                </div>
                <div className="facility-benefit-box">
                    <JobApplicationIcon />
                    <p>Significant cost savings vs. traditional staffing agency</p>
                </div>
                <div className="facility-benefit-box">
                    <ChatGroupIcon />
                    <p>Therapists have reviews, ratings, and work history</p>
                </div>
                <div className="facility-benefit-box">
                    <MedalIcon />
                    <p>View a clinician’s credentials, specialties, and vaccination status</p>
                </div>
                <div className="facility-benefit-box">
                    <RefundIcon />
                    <p>Communicate directly with clinicians using our messenger</p>
                </div>
                <div className="facility-benefit-box">
                    <JobApplicationIcon />
                    <p>Purple PRN checks that every clinician is licensed and in good standing</p>
                </div>
                <div className="facility-benefit-box">
                    <ChatGroupIcon />
                    <p>Access to our support team</p>
                </div>
              </div>
            </Col>
            <Col lg={6} className="benefit-img">
              <img src={Image} alt={Image} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default WhatPeopleSay;
