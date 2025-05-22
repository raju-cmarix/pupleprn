import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import "component/myDashboard/dashboard.scss";
import MyConfirmShifts from "component/myDashboard/confirmShift";
import UserContext from "utils/context/UserContext";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

function MyDashboard() {
  window.dataLayer.push({
    event: 'pageview',
    page: {
      title: 'Clinician Dashboard',
      url: window.location.href,
      path: window.location.pathname,
    }
  });
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  // 1 === Job Board Applications
  // 2 === Nothing
  // 3 === Confirmed shifts
  // 4 ===  My earnings
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("3");

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  useEffect(() => {
    let qsObj = queryString.parse(location.search);
    if (qsObj.confirmedshifts && Number(qsObj.confirmedshifts) === 1) {
      setCurrentActiveTab("3");
      navigate(location?.pathname);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Purple PRN - My Dashboard</title>
      </Helmet>
      <div className="dashboard-main">
        <div className="custom-container">
          <h1>My Dashboard</h1>
          <p>
            Here you can view your Job Board applications and Confirmed Shifts
          </p>
          <Nav tabs>
            {/* <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === "1",
                })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Job Board applications
              </NavLink>
            </NavItem> */}

            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === "3",
                })}
                onClick={() => {
                  toggle("3");
                }}
              >
                My Shifts
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === "4",
                })}
                onClick={() => {
                  toggle("4");
                }}
              >
                My earnings
              </NavLink>
            </NavItem> */}
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            {/* <TabPane tabId="1">
              <JobBoardApplicant user={user} />
            </TabPane> */}

            {currentActiveTab === "3" && (
              <TabPane tabId="3">
                <MyConfirmShifts user={user} />
              </TabPane>
            )}
            {/* {currentActiveTab === "4" && (
              <TabPane tabId="4">
                <MYEarning user={user} />
              </TabPane>
            )} */}
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default MyDashboard;
