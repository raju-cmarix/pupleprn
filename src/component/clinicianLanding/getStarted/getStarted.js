import ConditionalLinks from "component/common/ConditionalLinks";
import React from "react";
import {
  BenefitIcon,
  BenefitIcon1,
  BenefitIcon2,
  LifeHeartIcon,
  BenefitIcon3,
} from "../../../assets/svg";
import "./getStarted.scss";

function GetStarted({ applyForWork }) {
  return (
    <>
      <div className="get-started-main">
        <div className="custom-container">
          <div className="title">
            <h2>
              <LifeHeartIcon />
              Our Benefits
            </h2>
          </div>
          <div className="get-started-content">
            <div className="whats-box">
              <BenefitIcon />
              <h5>Better Shifts, Better Facilities, Better Pay!</h5>
              <p>
                Earn more as a part-time clinician than most clinics pay in base
                salary. Don’t settle for poor working conditions and burnout.
              </p>
              <p>
                Purple PRN is partnering with amazing clinics and healthcare
                facilities. Facilities are currently looking to book clinicians
                so click the link below to register!
              </p>
            </div>
            {/* <div className="whats-box">
              <BenefitIcon1 />
              <h5>Ratings And Feedback For Both Clinicians and Clinics</h5>
              <p>
                {" "}
                Know what you’re walking into before your shift. Entering a
                facility for the first time can be scary. With Purple PRN,
                before you accept a shift you can see how other clinicians have
                rated the facilities.
              </p>
              <p>
                The highest-rated clinicians move to the top of the search
                results so your profile is the first to be seen by facilities.
              </p>
            </div> */}
            <div className="whats-box">
              <BenefitIcon2 />
              <h5>Apply In Minutes</h5>
              <p>
                The days of filling out paper applications and sitting through
                in-person interviews are over. All you need to apply with Purple
                PRN is internet access. We keep your documents and
                certifications secured and easily accessible for whenever you
                need them.
              </p>
            </div>
          </div>
          <div className="get-started-content">
            <div className="whats-box">
              <BenefitIcon3 />
              <h5>Other Benefits</h5>
              <ul>
                <li>No minimum hours or number of shifts.</li>
                <li>
                  Try different clinical settings to see what you enjoy before
                  committing full-time
                </li>
                <li>Access to our support team</li>
                <li>Access to financial planning and tax resources</li>
              </ul>
            </div>
          </div>
          <div className="our-benefit-btn">
            {applyForWork("Join us!", "btn-secondary pt-btn")}
          </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
