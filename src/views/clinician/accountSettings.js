import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "component/accountSettings/accountSettings.scss";
import classnames from "classnames";
import GeneralInformation from "component/accountSettings/clinicianSettings/generalInformation";
import LoginInformation from "component/accountSettings/clinicianSettings/loginInformation";
import PaymentInformation from "component/accountSettings/clinicianSettings/paymentInformation";
import NotificationSetting from "component/accountSettings/clinicianSettings/NotificationSetting";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import UserContext from "utils/context/UserContext";

function ClinicianAccountSetting() {
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const location = useLocation();
  const [qsObj, setQsObj] = useState({});

  const { user } = useContext(UserContext);
  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  useEffect(() => {
    let qs = queryString.parse(location.search);
    if (
      (qs.payment && Number(qs.payment) === 1) ||
      (qs.addaccount && Number(qs.addaccount) === 1)
    ) {
      setCurrentActiveTab("3");
    }
    if (qs.accountaddfailure && Number(qs.accountaddfailure) === 1) {
      setCurrentActiveTab("3");
    }
    setQsObj(qs);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Purple PRN - Account Settings</title>
      </Helmet>
      <div className="account-settings-main">
        <div className="custom-container">
          <h2>Account Settings</h2>
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
                Login information
              </NavLink>
            </NavItem>
            {user?.isApprovedByAdmin && (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "3",
                  })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Payout
                </NavLink>
              </NavItem>              
            )}
             <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === "4",
                })}
                onClick={() => {
                  toggle("4");
                }}
              >
                Notification Settings
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            <TabPane tabId="1">
              <GeneralInformation
                currentActiveTab={currentActiveTab}
                location={location}
              />
            </TabPane>
            <TabPane tabId="2">
              {currentActiveTab === "2" && <LoginInformation />}
            </TabPane>
            <TabPane tabId="3">
              <PaymentInformation
                currentActiveTab={currentActiveTab}
                qsObj={qsObj}
              />
            </TabPane>
            <TabPane tabId="4">
              {currentActiveTab === "4" && <NotificationSetting />}
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default ClinicianAccountSetting;
