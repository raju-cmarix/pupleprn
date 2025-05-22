import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Helmet } from "react-helmet";
import SignupFacilityForm from "./SignupFacilityForm";
import { Link } from "react-router-dom";
import useQuery from "hooks/useQuery";
import AuthContext from "utils/context/AuthContext";

export default function SignupFacility() {
  const [curStep, setCurStep] = useState(1);
  let className = ["first", "second", "third", "fourth"];
  const { isUserAuthenticated } = useContext(AuthContext);
  let query = useQuery();

  useEffect(() => {
    let step = query.get('step');
    let stepNum = step ? parseInt(step) + 1 : isUserAuthenticated ? 2 : 1;
    setCurStep(stepNum)
  }, [])

  useEffect(() => window.scrollTo(0, 0), [curStep]);

  return (
    <>
      <Helmet>
        <title>Purple PRN - Sign Up As Facility</title>
      </Helmet>
      <div className={`signup-layout signup-layout-${className[curStep - 1]}`}>
        <Container fluid>
          <div className="signup-card">
            <Link to="/" className="mainhome">
              Home
            </Link>
            <div className="title">
              <h1>
                Sign Up As a
                <span>&nbsp;Facility</span>
              </h1>
            </div>
            <div className="progress-bar">
              <span>Step {curStep} of 4</span>
              <div className="bar">
                <div className="innerbar"></div>
              </div>
            </div>
            <SignupFacilityForm
              setCurStep={(val) => setCurStep(val)}
              curStep={curStep}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
