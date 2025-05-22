import React from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import { Field, Form, Formik } from "formik";
import { EMail } from "../../../assets/svg";
import './contactUs.scss'

function ContactUs() {

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    companyName: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    phone: Yup.string()
      .min(10, 'Too Short!')
      .max(51, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

  return (
    <>
      <div className="landing-contactus">
        <div className="custom-container">
          <div className="title text-left mb-48">
            <h2><EMail />Contact Us</h2>
            <p>We usually respond within a few hours</p>
          </div>
          <div className="contact-form">
            <Formik
              initialValues={{
                firstName: '',
                companyName: '',
                email: '',
                phone: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Row>
                    <Col md={6} className="mb-12">
                      <div className="form-group">
                        <FormGroup>
                          <Label
                            htmlFor="firstName"
                          >
                            Your name:
                          </Label>
                          <Field name="firstName" id="Yourname" className={errors.firstName ? "form-control required" : "form-control"} />
                          {errors.firstName && touched.firstName ? (
                            <div className="text-danger">{errors.firstName}</div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Col>
                    <Col md={6} className="mb-12">
                      <div className="form-group ms-auto">
                        <FormGroup>
                          <Label
                            htmlFor="companyName"
                          >
                            Company (optional):
                          </Label>
                          <Field name="companyName" id="companyName" className={errors.companyName ? "form-control required" : "form-control"} />
                          {errors.companyName && touched.companyName ? (
                            <div className="text-danger">{errors.companyName}</div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Col>
                    <Col md={6} className="mb-12">

                      <div className="form-group">
                        <FormGroup>
                          <Label
                            htmlFor="email"
                          >
                            Email:
                          </Label>
                          <Field className={errors.email ? "form-control required" : "form-control"} name="email" id="email" type="email" />
                          {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                        </FormGroup>
                      </div>
                    </Col>
                    <Col md={6} className="mb-48">
                      <div className="form-group ms-auto">
                        <FormGroup>
                          <Label
                            htmlFor="phone"
                          >
                            Phone:
                          </Label>
                          <Field className={errors.phone ? "form-control required" : "form-control"} name="phone" id="phone" type="phone" />
                          {errors.phone && touched.phone ? <div className="text-danger">{errors.phone}</div> : null}
                        </FormGroup>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="form-group textarea mb-48">
                        <label htmlFor="Yourmessage">Your message:</label>
                        <textarea id="Yourmessage" className="form-control"></textarea>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="pt-btn btn-primary">Send</button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
