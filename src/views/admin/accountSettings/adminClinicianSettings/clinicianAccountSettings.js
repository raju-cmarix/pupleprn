import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "component/accountSettings/accountSettings.scss";
import classnames from "classnames";
import AdminClinicianGeneralInformation from "./clinicianGeneralSettings";
import { api } from "api/Api";
import { GET_CLINICIAN_DATA } from "constants/ApiUrls";
import { useParams } from "react-router-dom";
import { RESPONSE_OK } from "constants/AppConstants";
import "component/facilityProfile/facilityProfile.scss";
import "component/profile/profile.scss";
import MyConfirmShifts from "component/myDashboard/confirmShift";

function AdminClinicianAccountSetting() {
  const params = useParams();
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [clinicianId, setClinicianId] = useState(null);

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  const [user, setUser] = useState({});

  const getClinicianById = () => {
    api(GET_CLINICIAN_DATA, {}, null, {
      id: params.id,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setUser(res.data.data);
        setClinicianId(res.data.data.userId.id);
      }
    });
  };

  useEffect(() => {
    getClinicianById();
  }, []);

  return (
    <>
      <Helmet>
        <title>Purple PRN - Account Settings</title>
      </Helmet>
      <div className="account-settings-main">
        <div className="custom-container">
          <h2>Clinician Account</h2>
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
                  active: currentActiveTab === "3",
                })}
                onClick={() => {
                  toggle("3");
                }}>
                Shifts
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            <TabPane tabId="1">
              <AdminClinicianGeneralInformation
                user={user}
                setUser={setUser}
              />
            </TabPane>
            <TabPane tabId="3">
              <MyConfirmShifts
                values={user}
                currentActiveTab={currentActiveTab}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default AdminClinicianAccountSetting;
