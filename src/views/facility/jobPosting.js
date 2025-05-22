import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "../../component/accountSettings/accountSettings.scss";
import classnames from "classnames";
import JobListing from "../../component/jobPosting/jobListing";
import ConfirmedShifts from "../../component/jobPosting/confirmedShifts";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "utils/context/UserContext";
import {
  APPROVE_REJECT_APPLICANT_URL,
  APPROVE_REJECT_APPLICANT_URL_SILENT,
  GET_LOGIN_DATA_URL,
} from "constants/ApiUrls";
import { api } from "api/Api";
import {
  AcceptClinicianApplicationTexts,
  LOCALSTORAGE_CONFIRMSHIFT,
  RESPONSE_OK,
} from "constants/AppConstants";
import AuthContext from "utils/context/AuthContext";
import { toast } from "react-toastify";

function JobPostListing() {
  const navItems = [
    { id: "1", label: "Shift postings" },
    { id: "2", label: "Confirmed shifts" },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { isUserAuthenticated } = useContext(AuthContext);
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  useEffect(() => {
    let qsObj = queryString.parse(location.search);
    if (qsObj.confirmedshifts && Number(qsObj.confirmedshifts) === 1) {
      setCurrentActiveTab("2");
    }
    if (qsObj.achpayment && qsObj.achpayment === "sucess") {
      navigate(location?.pathname);
      let retrievedObject = localStorage?.getItem(LOCALSTORAGE_CONFIRMSHIFT);
      retrievedObject = JSON.parse(retrievedObject);
      if (retrievedObject && Object.keys(retrievedObject).length > 0) {
        const ApproveShift = async () => {
          try {
            await api(APPROVE_REJECT_APPLICANT_URL_SILENT, retrievedObject);
          } catch (err) {
            console.log({ err });
            toast?.error(AcceptClinicianApplicationTexts.SOMETHING);
          }
          localStorage?.removeItem(LOCALSTORAGE_CONFIRMSHIFT);
        };

        ApproveShift();
      }
    }
    if (qsObj.achpayment && Number(qsObj.achpayment) === "fail") {
      navigate(location?.pathname);
      localStorage?.removeItem(LOCALSTORAGE_CONFIRMSHIFT);
    }
  }, [location]);

  const getUserObj = () => {
    api(GET_LOGIN_DATA_URL, {}).then((res) => {
      if (res.status === RESPONSE_OK) setUser(res.data.data);
      else setUser({});
    });
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      getUserObj();
    }
  }, [currentActiveTab, location, isUserAuthenticated]);

  useEffect(() => {
    if (!user?.isApprovedByAdmin) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Purple PRN - Shift Post Listing</title>
      </Helmet>
      <div className="account-settings-main">
        <div className="custom-container">
          <h2 className="mb-2">Shift Management</h2>
          <p className="mb-48">
            Here you can view current Shift Postings and Confirmed Shifts
          </p>
          <Nav tabs>
            {navItems.map((item, index) => {
              return (
                <NavItem key={index}>
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
              <JobListing currentActiveTab={currentActiveTab} />
            </TabPane>

            {currentActiveTab === "2" && (
              <TabPane tabId="2">
                <ConfirmedShifts currentActiveTab={currentActiveTab} />
              </TabPane>
            )}
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default JobPostListing;
