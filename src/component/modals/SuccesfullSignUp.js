import {
  CLINICIAN_CALENDLY_LINK,
  FACILITY_CALENDLY_LINK,
} from "constants/AppConstants";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Modal, ModalBody } from "reactstrap";
import ReactGA from "react-ga4";

const SuccessfullSignup = ({ isOpen, isClinician, setIsOpen }) => {
  ReactGA.send({
    hitType: "pageview",
    page: location?.pathname,
    title: `${document.title} - Completed`,
  });

  // Add ga-4 event
  const handleClick = (isHomeClick = false) => {
    ReactGA.event({
      category: "Signup",
      action: `Clicked ${isHomeClick ? "Home" : "Schedule Now"} Button`,
      label: `Completed ${isClinician ? "Clinician" : "Facility"} Sign Up -  ${
        isHomeClick ? "Home" : "Schedule Now"
      } Button`,
    });
  };

  return (
    <Modal
      centered
      isOpen={isOpen}
      className="SuccessfullSignup">
      <ModalBody>
        <div className="signup-layout signup-layout-final">
          <Container fluid>
            <div className="signup-card">
              {/* <span
                onClick={() => setIsOpen(false)}
                className="successfull-close-button"
              >
                <RiCloseFill size={35} />
              </span> */}
              <Link
                to="/"
                className="mainhome"
                onClick={() => handleClick(true)}>
                Home
              </Link>
              <div className="title">
                <h1>
                  You Have Successfully<br></br>
                  <span>Signed Up!</span>
                </h1>
              </div>

              <div className="signedup">
                {isClinician ? (
                  <>
                    <p>
                      The last step is a short call (avg is 8 minutes) with an
                      onboarding team member (we're all PTs).
                    </p>
                    <ol className="text-left">
                      <li>
                        <p className="mb-1">
                          We need to make sure you're a real person
                        </p>
                      </li>
                      <li>
                        <p className="mb-1">
                          We'll answer any questions you have
                        </p>
                      </li>
                      <li>
                        <p className="mb-1">
                          Then we're done and we'll get you activated
                        </p>
                      </li>
                      <li>
                        <p className="mb-1">
                          We know you're busy so we'll make this call as short
                          or as long as you'd like
                        </p>
                      </li>
                    </ol>
                    <a
                      rel="noreferrer"
                      href={CLINICIAN_CALENDLY_LINK}
                      target={"_blank"}
                      onClick={handleClick}
                      className="pt-btn btn-primary sign-btn">
                      Schedule Now!
                    </a>
                  </>
                ) : (
                  <>
                    <p>
                      The next step is to set up a short call (avg is 12
                      minutes) with the Director of Operations and Founder(s) of
                      Purple PRN.
                    </p>
                    <ol className="text-left">
                      <li>
                        <p className="mb-1">
                          We'll give you the Cliff's Notes version of how it
                          works
                        </p>
                      </li>
                      <li>
                        <p className="mb-1">
                          We'll answer any questions you have
                        </p>
                      </li>
                      <li>
                        <p className="mb-1">We'll get you activated</p>
                      </li>
                      <li>
                        <p className="mb-1">
                          We know you're busy so we'll make this call as short
                          or as long as you'd like
                        </p>
                      </li>
                    </ol>
                    <a
                      rel="noreferrer"
                      onClick={handleClick}
                      href={FACILITY_CALENDLY_LINK}
                      target={"_blank"}
                      className="pt-btn btn-primary sign-btn">
                      Schedule Now!
                    </a>
                  </>
                )}
              </div>
            </div>
          </Container>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SuccessfullSignup;
