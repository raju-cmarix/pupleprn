import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AboutHead from "component/about/aboutHead";
import AboutPurple from "component/about/aboutPurple";
import NewsLetter from "component/about/newsLetter";
import OurValues from "component/about/ourValues";
import WhatPeopleSay from "component/home/whatPeopleSay/whatPeopleSay";
import OurLeadership from "component/about/OurLeadership";

function AboutUs() {
  const PageTitle = document?.title;
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page: {
        title: `${PageTitle}`,
        url: window.location.href,
        path: window.location.pathname,
      }
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Purple PRN - About Us</title>
      </Helmet>
      <AboutHead />
      <div className="about-bg">
        <OurLeadership />
        <AboutPurple />
        <OurValues />
      </div>
      <div className="about-what-say">
        <WhatPeopleSay />
      </div>
      <NewsLetter />
    </>
  );
}

export default AboutUs;
