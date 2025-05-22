import React from "react";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import Image from '../../../assets/images/image.jpg'
import { MessageIcon } from "../../../assets/svg";
import "./whatPeopleSay.scss"




function WhatPeopleSay() {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <>
      <div className="what-people-say">
        <div className="custom-container">
          <Row>
            <Col md={6}className="align-self-md-center">
              <img src={Image} alt={Image} />
            </Col>
            <Col md={6} className="p-md-0">
              <div className="title text-left">
                <h2><MessageIcon />What People Say About Us</h2>
              </div>
              <div className="what-people-slider">

                <Slider {...settings}>
                  <div className="what-people-content">
                    <p>Purple PRN helped us find staffing during a high volume period. With them we’ve been able to scale up and down our workforce in a flexible manner. Each therapist I have worked with through Purple PRN has been professional, dependable, and personable. They jumped right in, anticipating and responding to patient needs, and have been excellent with patient engagement and coworkers. Lastly, the customer service at Purple PRN is top notch and I highly recommend them for exceptional therapist sourcing and staffing.</p>
                 <div className="what-people-sub">
                      <span>Jana R.</span>
                      <p>Director, Outpatient PT clinic</p>
                    </div>
                  </div>
                  <div className="what-people-content">
                    <p>I have thoroughly enjoyed working with Purple PRN as a PRN therapist.  I have better work/life balance and pick the types of clinics I want to work for.  Purple PRN is very user-friendly, all done in real time, and provides all the information up front so you’re never left wondering what you are walking into with new clinics. Also I could easily take vacation when I wanted at the drop of a hat. I would recommend Purple PRN for full time, part time, or even if you’re just looking for supplemental income.”</p>
                   <div className="what-people-sub">
                      <span>Michael H.</span>
                      <p>Physical Therapist</p>
                    </div>
                  </div>
                </Slider>

              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default WhatPeopleSay;
