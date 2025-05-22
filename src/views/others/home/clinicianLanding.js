import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Howitworks from "../../../component/clinicianLanding/howitworks/howitworks";
import GetStarted from "../../../component/clinicianLanding/getStarted/getStarted";
import LandingMainhead from "../../../component/clinicianLanding/landingMainHead/landingMainHead";
import Launch from "../../../component/clinicianLanding/launch/launch";
import WhatIsPurple from "../../../component/clinicianLanding/whatIsPurple/whatIsPurple";
import ContactUs from "../../../component/clinicianLanding/contactUs/contactUs";
import UserContext from "utils/context/UserContext";
import { Slide, toast } from "react-toastify";
import {
  CLINICIAN_SIGNUP,
  COMPLETE_PROFILE_FIRST,
  FACILITY_SIGNUP,
  ROLE_CLINICIAN,
  ROLE_FACILITY,
  TOAST_AUTO_CLOSE,
} from "constants/AppConstants";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "utils/context/AuthContext";
import usePageEvent from "hooks/usePageEvent";
import { isEmpty } from "radash";

function ClinicianLanding() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    const pageTitle = document?.title;
    window.dataLayer.push({
      event: 'pageview',
      page: {
        path: window.location.pathname,
        title: `${pageTitle}`,
      },
    });
  }, []);
  const { user } = useContext(UserContext);
  const { isUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const showToast = (msg) => {
    toast.error(msg, {
      transition: Slide,
      autoClose: TOAST_AUTO_CLOSE,
    });
  };

  const clinicianCheck = () => {
    if (isUserAuthenticated) {
      if (user?.clinicianId && !user?.clinicianId?.isSignupCompleted) {
        showToast(COMPLETE_PROFILE_FIRST);
      } else if (
        ROLE_CLINICIAN.includes(user?.roles) &&
        !user?.isApprovedByAdmin
      ) {
        showToast("Call with Onboarding team is pending for verification");
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
        showToast("Call with Onboarding team is pending for verification");
      } else {
        if (!user?.isApprovedByAdmin)
          showToast("Facility signup/login is required");
      }
    } else {
      navigate(FACILITY_SIGNUP);
    }
  };

  const toasterButton = (name, className) => (
    window.dataLayer.push({
      event: 'buttonClick',
      button: {
        name:  name || "Find Shifts",
        location: 'Clinician Landing Page',
      },
    }),
    <Link
      to={isUserAuthenticated ? "" : CLINICIAN_SIGNUP}
      className={className || "btn-primary pt-btn me-sm-4"}
      onClick={clinicianCheck}
    >
      {name || "Find Shifts"}
    </Link>
  );

  const applyForWork = (name, className) =>
      isEmpty(user) || !isUserAuthenticated ? (
        window.dataLayer.push({
          event: 'buttonClick',
          button: {
            name: 'Register as Clinician',
            location: 'Clinician Landing Page',
          },
        }),
      // toasterButton()
      <Link
        to={CLINICIAN_SIGNUP}
        className={className || "btn-primary pt-btn me-sm-4"}
      >
        {name || "Register as Clinician"}
      </Link>
    ) : user?.isApprovedByAdmin ? (
      ROLE_CLINICIAN.includes(user?.roles) ? (
        window.dataLayer.push({
          event: 'buttonClick',
          button: {
            name:  name || 'Find Shifts',
            location: 'Clinician Landing Page',
          },
        }),
        <Link
          to={"/clinician/jobboard"}
          className={className || "btn-primary pt-btn me-sm-4"}
        >
          {/* {name || "Apply to Work"} */}
          {name || "Find Shifts"}
        </Link>
      ) : (
        <>{toasterButton(name, className)}</>
      )
    ) : (
      <>{toasterButton(name, className)}</>
    );

  // Meta Conversion API Event
  usePageEvent();

  return (
    <>
      <Helmet>
        <title>Purple PRN - Clinician</title>
      </Helmet>
      <LandingMainhead
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        applyForWork={applyForWork}
      />
      <WhatIsPurple
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        applyForWork={applyForWork}
      />
      <Howitworks
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        applyForWork={applyForWork}
      />
      <Launch clinicianCheck={clinicianCheck} facilityCheck={facilityCheck} />
      <GetStarted
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        applyForWork={applyForWork}
      />
      <ContactUs
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
      />
    </>
  );
}

export default ClinicianLanding;
