import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import "component/clinicianProfile/clinicianProfile.scss";
import { SmallBackArrow, Star, SmallMessageIcon, Bag } from "assets/svg";
import classnames from "classnames";
import GeneralInformation from "component/clinicianProfile/cilnicianProfile/generalInformation";
import ProfileReview from "component/clinicianProfile/cilnicianProfile/profileReview";
import { ReactComponent as Jonathan } from "assets/images/icons/Jonathan.svg";
import Gender from "assets/images/icons/gender.png";
import { Link } from "react-router-dom";

function ClinicianProfile() {
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  return (
    <>
      <Helmet>
        <title>Purple PRN - Profile</title>
      </Helmet>
      <div className="profile-main">
        <div className="custom-container">
          <div className="back-to-search">
            <SmallBackArrow />
            <Link to="/facility/shiftmanagement">Back to search</Link>
          </div>
          <div className="man-profile">
            <Row>
              <Col md="9" className="left-profile">
                <Row>
                  <Col sm="2" className="profile-image">
                    <Jonathan />
                  </Col>
                  <Col sm="10" className="profile-content">
                    <h3>Jonathan D.</h3>
                    <p>
                      This is the About Me blurb. d do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip
                      ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu
                      fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                      non proident, sunt in culpa qui officia deserunt mollit
                      anim id est laborum.
                    </p>
                    <Nav className="jona-links">
                      <NavItem>
                        <NavLink href="#">
                          <span>
                            <img src={Gender} />
                          </span>
                          Male
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">
                          <span>
                            <Star />
                          </span>
                          4/5
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">
                          <span>
                            <SmallMessageIcon />
                          </span>
                          12 reviews
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                                            <NavLink href="#"><span><Verified /></span>Credentials verified</NavLink>
                                        </NavItem> */}
                      <NavItem>
                        <NavLink href="#">
                          <span>
                            <Bag />
                          </span>
                          5 years experience
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
              </Col>
              {/* <Col md="3" className="profile-btn">
                        <button className="pt-btn btn-primary " type="button"
                                color="primary">Send Offer</button>
                        </Col> */}
            </Row>
          </div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === "1",
                })}
                onClick={() => {
                  toggle("1");
                }}
              >
                General information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === "2",
                })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Reviews
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <GeneralInformation />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <ProfileReview />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default ClinicianProfile;
