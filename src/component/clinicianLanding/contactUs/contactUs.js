import ContactUsForm from "component/common/ContactUsForm";
import React from "react";
import * as Yup from "yup";
import { EMail } from "../../../assets/svg";
import "./contactUs.scss";

function ContactUs() {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    companyName: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .min(10, "Too Short!")
      .max(51, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <>
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
    </>
  );
}

export default ContactUs;
