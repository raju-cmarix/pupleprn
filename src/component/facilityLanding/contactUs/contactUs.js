import ContactUsForm from "component/common/ContactUsForm";
import React from "react";
import { EMail } from "../../../assets/svg";
import "./contactUs.scss";

function ContactUs() {
  return (
    <div className="landing-contactus">
      <div className="custom-container">
        <div className="title text-left mb-48">
          <h2>
            <EMail />
            Contact Us
          </h2>
        </div>
        <div className="contact-form">
          <ContactUsForm md={6} />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
