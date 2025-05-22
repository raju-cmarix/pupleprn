import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Helmet } from "react-helmet";
import SignupClinicianForm from "./SignupClinicianForm";
import { Link } from "react-router-dom";
import useQuery from "hooks/useQuery";
import AuthContext from "utils/context/AuthContext";
export default function SignupClinician() {
  let classNames = ["first", "second", "third", "fourth", "fifth"]; // for dynamic class name
  const [curStep, setCurStep] = useState(1); // to control steps
  const { isUserAuthenticated } = useContext(AuthContext);
  let query = useQuery();

  let step = query.get('step');

  useEffect(() => {
    let stepNum = step ? parseInt(step) + 1 : isUserAuthenticated ? 2 : 1;
    setCurStep(stepNum)
  }, [step])

  useEffect(() => window.scrollTo(0, 0), [1]);

  return (
    <>
      <Helmet>
        <title>Purple PRN - Sign Up As a Clinician</title>
      </Helmet>
      <div
        className={`signup-layout 
          signup-layout-${classNames[curStep - 1]} clinician`}
      >
        <Container fluid>
          <div className="signup-card">
            <Link to="/" className="mainhome">
              Home
            </Link>
            <div className="title">
              <h1>
                Sign Up
                <span>&nbsp;As a Clinician </span>
              </h1>
            </div>
            <div className="progress-bar">
              <span>Step {curStep} of 2</span>
              <div className="bar">
                <div className="innerbar"></div>
              </div>
            </div>
            <SignupClinicianForm
              setCurStep={(val) => setCurStep(val)}
              curStep={curStep}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
