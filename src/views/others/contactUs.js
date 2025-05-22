import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Col, Row } from "reactstrap";
import ContactHead from "component/contactUs/contactHead";
import ContactImage from "assets/images/icons/contactus.svg";
import "component/contactUs/contactUs.scss";
import ContactUsForm from "component/common/ContactUsForm";
function ContactUs() {
  const PageTitle = document?.title;
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page: {
        title: `${PageTitle}`,
        url: window.location.href,
        path: window.location.pathname,
      }
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Purple PRN - Contact Us</title>
      </Helmet>
      <ContactHead />
      <div className="contact-bg">
        <div className="custom-container">
          <div className="contact-main">
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="contact-image">
                  <h1>
                    Here To <span>Help</span>
                  </h1>
                  <p>We usually respond within a few hours</p>
                  <img src={ContactImage} alt={ContactImage} />
                </div>
              </Col>
              <Col lg={6}>
                <div className="contact-form mb-12">
                  <ContactUsForm md={12} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
