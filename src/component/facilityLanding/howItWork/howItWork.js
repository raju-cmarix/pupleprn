import React from "react";
import { Col, Row } from "reactstrap";
import { SettingsIcon } from "../../../assets/svg";
import PostaShift from '../../../assets/images/icons/post-a-shifts.png';
import "./howItWork.scss"

function HowItWork() {
    return (
        <>
            <div className="get-started-main how-work-facility">
                <div className="custom-container">
                    <div className="title">
                        <h2><SettingsIcon />How It <span className="ms-2">Works</span></h2>
                    </div>
                    <Row className="get-started-content">
                        <Col md={6} className="postashift-img">
                        <img  src={PostaShift} className="PostaShift img-fluid" alt="PostaShift"/>
                        </Col>
                        <Col md={6} className="whats-box">
                            <ul>
                                <li className="list-none"><span>1</span><p>Create a free account</p></li>
                                <li className="list-none"><span>2</span><p>Post a shift requesting a PT, PTA, OT, OTA, or SLP</p></li>
                                <li className="list-none"><span>3</span><p>Clinicians get a notification about this shift.</p></li>
                                <li className="list-none"><span>4</span><p>Choose a clinician based on rating, work history, specialities, etc</p></li>
                                <li className="list-none"><span>5</span><p>Clinician works their shift at your facility</p></li>
                                <li className="list-none"><span>6</span><p>Purple PRN handles payments directly on your behalf</p></li>
                            </ul>
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    );
}

export default HowItWork;
