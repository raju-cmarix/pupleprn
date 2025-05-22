import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LaunchIcon } from "../../../assets/svg";
import "./launch.scss";
import UserContext from "utils/context/UserContext";
import {
  ApplyToWork,
  CLINICIAN_SIGNUP,
  COMPLETE_PROFILE_FIRST,
  FACILITY_SIGNUP,
  HireStaff,
  ROLE_CLINICIAN,
  ROLE_FACILITY,
  TOAST_AUTO_CLOSE,
} from "constants/AppConstants";
import AuthContext from "utils/context/AuthContext";
import { toast, Slide } from "react-toastify";

function Launch() {
  const { user } = useContext(UserContext);
  const { isUserAuthenticated } = useContext(AuthContext);
  const HS = HireStaff(isUserAuthenticated);
  const AW = ApplyToWork(isUserAuthenticated);
  const navigate = useNavigate();
  const showToast = (msg) => {
    toast.error(msg, {
      transition: Slide,
      autoClose: TOAST_AUTO_CLOSE,
    });
  };
  const verifyFirst = () => {
    showToast("Call with Onboarding team is pending for verification");
    window.scrollTo(0, 0);
  };
  const clinicianCheck = () => {
    if (isUserAuthenticated) {
      if (user?.clinicianId && !user?.clinicianId?.isSignupCompleted) {
        showToast(COMPLETE_PROFILE_FIRST);
      } else if (ROLE_CLINICIAN.includes(user?.roles)) {
        verifyFirst();
      } else {
        showToast("Clinician signup/login is required");
      }
    } else {
      navigate(CLINICIAN_SIGNUP);
    }
  };
  const facilityCheck = () => {
    if (isUserAuthenticated) {
      if (user?.facilityId && !user?.facilityId?.isSignupCompleted) {
        showToast(COMPLETE_PROFILE_FIRST);
      } else if (
        ROLE_FACILITY.includes(user?.roles) &&
        !user?.isApprovedByAdmin
      ) {
        verifyFirst();
      } else {
        showToast("Facility signup/login is required");
      }
    } else {
      navigate(FACILITY_SIGNUP);
    }
  };
  return (
    <>
      <div className="launch-main">
        <div className="launch-content">
          <LaunchIcon />
          <p>
            We’re in the following cities:
            <br />
            Houston, The Woodlands, Katy, Galveston, Austin, San Antonio,
            Dallas-Fort Worth, Miami-Ft. Lauderdale, Phoenix and Tucson
          </p>
          <p>
            We’re excited to launch in:
            <br />
            Chicago, Philadelphia, and Atlanta
          </p>
          {/* <p className="mb-0">
            Coming soon in 2024 <br />
          </p> */}
          <div className="landing-btns">
            {/* {(!isUserAuthenticated || user?.facilityId) && } */}
            {isUserAuthenticated &&
            user?.facilityId &&
            user?.isApprovedByAdmin ? (
              ROLE_FACILITY.includes(user?.roles) ? (
                <Link
                  to="/facility/shiftmanagement"
                  className="btn-primary pt-btn me-sm-4">
                  {HS}
                </Link>
              ) : (
                <Link
                  to={isUserAuthenticated ? "" : FACILITY_SIGNUP}
                  className="btn-primary pt-btn me-sm-4"
                  onClick={facilityCheck}>
                  {HS}
                </Link>
              )
            ) : (
              <Link
                to={isUserAuthenticated ? "" : FACILITY_SIGNUP}
                className="btn-primary pt-btn me-sm-4"
                onClick={facilityCheck}>
                {HS}
              </Link>
            )}

            {/* {(!isUserAuthenticated || user?.clinicianId) && } */}
            {user?.isApprovedByAdmin ? (
              ROLE_CLINICIAN.includes(user?.roles) ? (
                <Link
                  to={"/clinician/jobboard"}
                  className="btn-secondary pt-btn ms-3">
                  {AW}
                </Link>
              ) : (
                <Link
                  to={isUserAuthenticated ? "" : CLINICIAN_SIGNUP}
                  onClick={clinicianCheck}
                  className="btn-secondary pt-btn ms-3">
                  {AW}
                </Link>
              )
            ) : (
              <>
                <Link
                  to={isUserAuthenticated ? "" : CLINICIAN_SIGNUP}
                  className="btn-secondary pt-btn ms-3"
                  onClick={clinicianCheck}>
                  {AW}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Launch;
