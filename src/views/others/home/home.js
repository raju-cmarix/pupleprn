import React from "react";
import { Helmet } from "react-helmet";
import Benefits from "../../../component/home/benefits/benefits";
import ContactUs from "../../../component/home/contactUs/contactUs";
import GetStarted from "../../../component/home/getStarted/getStarted";
import LandingMainhead from "../../../component/home/landingMainHead/landingMainHead";
import Launch from "../../../component/home/launch/launch";
import LocationMap from "../../../component/home/locationMap/locationMap";
import WhatIsPurple from "../../../component/home/whatIsPurple/whatIsPurple";
import WhatPeopleSay from "../../../component/home/whatPeopleSay/whatPeopleSay";

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Purple PRN - Home</title>
      </Helmet>
      <LandingMainhead />
      <WhatIsPurple />
      <GetStarted />
      <Launch />
      <Benefits />
      <WhatPeopleSay />
      <LocationMap />
      <ContactUs />
    </>
  );
}

export default Dashboard;
