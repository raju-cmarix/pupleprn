import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "component/accountSettings/accountSettings.scss";
import classnames from "classnames";
import AdminFacilityGeneralInformation from "views/admin/accountSettings/adminFacilitySettings/facilityGeneralSettings";
import AdminFacilityLoginInformation from "views/admin/accountSettings/adminFacilitySettings/facilityLoginInformation";
import { api } from "api/Api";
import { GET_FACILITY_DATA } from "constants/ApiUrls";
import { useParams } from "react-router-dom";
import { RESPONSE_OK } from "constants/AppConstants";

function AdminFacilityAccountSetting() {
  const params = useParams();
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  useEffect(() => {
    getFacilityById();
  }, []);

  const getFacilityById = () => {
    setLoader(true);
    setResetPasswordModal(false);

    api(GET_FACILITY_DATA, {}, null, {
      id: params.id,
    }).then((res) => {
      if (res.status === RESPONSE_OK) setUser(res.data.data);
      setLoader(false);
    });
  };

  return (
    <>
      <Helmet>
        <title>Purple PRN - Account Settings</title>
      </Helmet>
      <div className="account-settings-main">
        <div className="custom-container">
          <h2>Facility Account</h2>
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
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            <TabPane tabId="1">
              <AdminFacilityGeneralInformation
                user={user}
                getFacilityData={getFacilityById}
                resetPasswordModal={resetPasswordModal}
                setResetPasswordModal={setResetPasswordModal}
                loader={loader}
                setLoader={setLoader}
              />
            </TabPane>
            <TabPane tabId="2">
              <AdminFacilityLoginInformation facilityUser={user} />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default AdminFacilityAccountSetting;
