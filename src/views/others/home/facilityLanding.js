import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import ContactUs from "../../../component/facilityLanding/contactUs/contactUs";
import GetStarted from "../../../component/facilityLanding/getStarted/getStarted";
import LandingMainhead from "../../../component/facilityLanding/landingMainHead/landingMainHead";
import Launch from "../../../component/facilityLanding/launch/launch";
import WhatPeopleSay from "../../../component/facilityLanding/whatPeopleSay/whatPeopleSay";
import HowItWork from "../../../component/facilityLanding/howItWork/howItWork";
import {
  CLINICIAN_SIGNUP,
  COMPLETE_PROFILE_FIRST,
  FACILITY_SIGNUP,
  ROLE_CLINICIAN,
  ROLE_FACILITY,
  TOAST_AUTO_CLOSE,
} from "constants/AppConstants";
import { toast, Slide } from "react-toastify";
import UserContext from "utils/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "utils/context/AuthContext";
import { isEmpty } from "radash";
import usePageEvent from "hooks/usePageEvent";

function FacilityLanding() {
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
    if (isEmpty(user) || !isUserAuthenticated) {
      window.dataLayer.push({
        event: 'buttonClick',
        button: {
          name: 'Hire Staff',
          location: 'Facility Landing Page',
        },
      });
      navigate(FACILITY_SIGNUP);
    } else if (isUserAuthenticated || !isEmpty(user)) {
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

  const toasterButton = (name) => {
    if (isEmpty(user) || !isUserAuthenticated) {
      
      return (
        <Link
          to={FACILITY_SIGNUP}
          className="btn-primary pt-btn me-sm-4"
          onClick={facilityCheck}
        >
          {name || "Hire Staff"}
        </Link>
      );
    } else {
      
      return (
        <Link
          to={isUserAuthenticated ? "" : FACILITY_SIGNUP}
          className="btn-primary pt-btn me-sm-4"
          onClick={facilityCheck}
        >
          {name || " Post a shift"}
        </Link>
      );
    }
  };

  const hireStaffButton =
    isEmpty(user) || !isUserAuthenticated ? (
      window.dataLayer.push({
        event: 'buttonClick',
        button: {
          name: 'Register as Facility',
          location: 'Facility Landing Page',
        },
      }),
      // toasterButton()
      <Link
      to={FACILITY_SIGNUP}
      className="btn-primary pt-btn me-sm-4"
    >
    Register as Facility
    </Link>
    ) : user?.isApprovedByAdmin ? (
      ROLE_FACILITY.includes(user?.roles) ? (
        window.dataLayer.push({
          event: 'buttonClick',
          button: {
            name: 'Post a shift',
            location: 'Facility Landing Page',
          },
        }),
         <Link
         to="/facility/shiftmanagement"
         className="btn-primary pt-btn me-sm-4"
       >
        {/* Hire Staff */}
         Post a shift
       </Link>
      ) : (
        toasterButton()
      )
    ) : (
      toasterButton()
    );
  // Meta Conversion API Event
  usePageEvent();

  return (
    <>
      <Helmet>
        <title>Purple PRN - Facility</title>
      </Helmet>
      <LandingMainhead
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        hireStaffButton={hireStaffButton}
      />
      <GetStarted
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        hireStaffButton={hireStaffButton}
      />
      <Launch
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        hireStaffButton={hireStaffButton}
      />
      <HowItWork
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        hireStaffButton={hireStaffButton}
      />
      <WhatPeopleSay
        clinicianCheck={clinicianCheck}
        facilityCheck={facilityCheck}
        hireStaffButton={hireStaffButton}
      />
      {/* <WhyUsePT/> */}
      <ContactUs />
    </>
  );
}

export default FacilityLanding;
