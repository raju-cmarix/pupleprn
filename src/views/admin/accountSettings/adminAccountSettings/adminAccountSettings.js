import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "component/adminAccountSettings/adminAccountSettings.scss";
import classnames from "classnames";
import GeneralInformation from "component/adminAccountSettings/generalInformation";
import PaymentInformation from "component/adminAccountSettings/paymentInformation";
import UserContext from "utils/context/UserContext";
import LoginInformation from "component/adminAccountSettings/loginInformation";
import MedianRates from "component/adminAccountSettings/MedianRatesSettings";

function AdminAccountSetting() {
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  let navItems = [
    { id: "1", label: "General information" },
    { id: "2", label: "Security information" },
    // { id: "3", label: "Payout" },
    { id: "4", label: "Median Rates" },
  ];

  const { user, setUser } = useContext(UserContext);
  const role = localStorage.getItem("userRole");
  // Remove the item with id "4" if the role is "subadmin"
if (role === "subadmin") {
  navItems = navItems.filter(item => item.id !== "4");
}
 
  return (
    <>
      <Helmet>
        <title>Purple PRN - Admin Account Settings</title>
      </Helmet>
      <div className="account-settings-main">
        <div className="custom-container">
          <h2>
            {role === "subadmin"
              ? " Sub Administrator Account"
              : "Administrator Account"}
          </h2>
          <Nav tabs>
            {navItems.map((item) => {
              return (
                <NavItem key={item.id}>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === item.id,
                    })}
                    onClick={() => {
                      toggle(item.id);
                    }}>
                    {item.label}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            <TabPane tabId="1">
              <GeneralInformation data={user} />
            </TabPane>
            <TabPane tabId="2">
              <LoginInformation />
            </TabPane>
            {role !== "subadmin" && (
              <TabPane tabId="4">
                <MedianRates />
              </TabPane>
            )}
            <TabPane tabId="3">
              <PaymentInformation />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default AdminAccountSetting;
