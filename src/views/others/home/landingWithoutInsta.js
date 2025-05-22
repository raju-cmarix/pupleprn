import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Benefits from "../../../component/home/benefits/benefits";
import GetStarted from "../../../component/landing/getStarted/getStarted";
import LandingMainhead from "../../../component/home/landingMainHead/landingMainHead";
import Launch from "../../../component/home/launch/launch";
import LocationMap from "../../../component/home/locationMap/locationMap";
import WhatPeopleSay from "../../../component/home/whatPeopleSay/whatPeopleSay";
import ContactUs from "component/facilityLanding/contactUs/contactUs";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import ApprovedTimesheetModal from "component/modals/ApprovedTimesheetModal";

function LandingWithoutInsta() {
  const featureRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  let qsObj = queryString.parse(search);
  const [timesheetModal, setTimesheetModal] = useState(
    qsObj?.timesheetId && qsObj?.status === "accepted",
  );

  useEffect(() => {
    let tag = searchParams.get("tag");
    if (tag) featureRef.current.scrollIntoView();
  }, [pathname, searchParams]);
  return (
    <>
      <Helmet>
        <title>Purple PRN - Landing</title>
      </Helmet>
      <LandingMainhead />
      <div ref={featureRef}>
        <Benefits />
      </div>
      <GetStarted />
      <Launch />
      <WhatPeopleSay />
      <LocationMap />
      <ContactUs />
      {timesheetModal && (
        <ApprovedTimesheetModal
          open={timesheetModal}
          toggle={() => {
            setTimesheetModal((prev) => !prev);
            setSearchParams({});
          }}
          timesheetData={qsObj}
        />
      )}
      <></>
    </>
  );
}

export default LandingWithoutInsta;
