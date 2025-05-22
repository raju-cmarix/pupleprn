import React from "react";
import { Helmet } from "react-helmet";
import LocationHead from "../../component/ourLocation/ourLocationHead";
import FindUS from "../../component/ourLocation/findUs";
import WhatPeopleSay from "../../component/home/whatPeopleSay/whatPeopleSay";
import ContactUs from "../../component/clinicianLanding/contactUs/contactUs";

function OurLocation() {
  return (
    <>
      <Helmet>
        <title>Purple PRN - Our Location</title>
      </Helmet>
      <LocationHead />
      <FindUS />
      <div className="location-what-say">
        <WhatPeopleSay />
      </div>

      <div className="location-contactus">
        <ContactUs />
      </div>
    </>
  );
}

export default OurLocation;
