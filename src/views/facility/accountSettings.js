import React, { useEffect, useState, useContext } from "react";

import { Helmet } from "react-helmet";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "component/accountSettings/accountSettings.scss";
import classnames from "classnames";
import GeneralInformation from "component/accountSettings/facilitySettings/generalInformation";
import PaymentInformation from "component/accountSettings/facilitySettings/paymentInformation";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import UserContext from "utils/context/UserContext";

const LoginInformation = React.lazy(() =>
  import("component/accountSettings/facilitySettings/loginInformation"),
);

function FacilityAccountSetting() {
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [qsObj, setQsObj] = useState({});
  const [addCardModal, setAddCardModal] = useState(false);
  const [addBankModal, setAddBankModal] = useState(false);

  const { user } = useContext(UserContext);

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  const toggleCardModal = () => setAddCardModal(!addCardModal);
  const toggleBankModal = () => setAddBankModal(!addBankModal);

  const location = useLocation();

  useEffect(() => {
    let qs = queryString.parse(location.search);

    if (
      qs.payments &&
      (Number(qs.payments) === 1 || Number(qs.payments) === 2)
    ) {
      setCurrentActiveTab("3");
      setQsObj(qs);
      if (qs.payments === 1) {
        toggleCardModal();
      }
      if (qs.payments === 2) {
        toggleBankModal();
      }
    }
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
                }}>
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
                }}>
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
                  }}>
                  Payments
                </NavLink>
              </NavItem>
            )}
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
                qs={qsObj}
                setCurrentActiveTab={setCurrentActiveTab}
                currentActiveTab={currentActiveTab}
                toggleCardModal={toggleCardModal}
                addCardModal={addCardModal}
                addBankModal={addBankModal}
                toggleBankModal={toggleBankModal}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default FacilityAccountSetting;
