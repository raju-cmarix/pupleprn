import React from "react";
import { Col, Row } from "reactstrap";
import { GetStartedFlag } from "../../../assets/svg";
import "./getStarted.scss"

function GetStarted() {
  return (
    <>
    <div className="get-started-main without-insta">
        <div className="custom-container">
            <div className="title">
                <h2><GetStartedFlag />It's Easy And Free To Get <span>Started</span>!</h2>
            </div>
            <h4>For Clinicians</h4>
            <div className="get-started-insta">
                <Row>
                    <Col>
                        <div className="without-insta-box">
                            <span>01</span>
                            <h6>Create </h6>
                            <p>your free account</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="without-insta-box">
                        <span>02</span>
                            <h6>Browse </h6>
                            <p>shifts in your area</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="without-insta-box">
                        <span>03</span>
                            <h6>Work </h6>
                            <p>your shift</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="without-insta-box">
                        <span>04</span>
                            <h6>Rate </h6>
                            <p>your experience</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="without-insta-box">
                        <span>05</span>
                            <h6>Get paid! </h6>
                        </div>
                    </Col>
                </Row>
            </div>
            <h4 className="mt-5">For Facilities</h4>
            <div className="get-started-insta">
                <Row>
                    <Col>
                        <div className="without-insta-box">
                            <span>01</span>
                            <h6>Create </h6>
                            <p>your free account</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="without-insta-box">
                        <span>02</span>
                            <h6>Post </h6>
                            <p>a shift</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="without-insta-box">
                        <span>03</span>
                            <h6>Book A Therapist</h6>
                            <p>see their rating and experience</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="without-insta-box">
                        <span>04</span>
                            <h6>Therapist Arrives</h6>
                            <p>ready to work!</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="without-insta-box">
                        <span>05</span>
                            <h6>Review</h6>
                            <p>the clinician</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
    </>
  );
}

export default GetStarted;
