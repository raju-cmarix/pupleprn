import React, { useState, useEffect } from "react";
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
import { Link, useParams } from "react-router-dom";
import { isEmpty } from "radash";
import { api } from "api/Api";
import { GET_APPLICANTS_LIST_URL, GET_JOB_BY_ID_URL } from "constants/ApiUrls";
import { SmallBackArrow, MoneyEnvelop } from "assets/svg";
import classnames from "classnames";
import CustomPagination from "component/common/customPagination";
import { RESPONSE_OK } from "constants/AppConstants";
import ApplicantCard from "component/jobPosting/applicantBox";
import Logo from "assets/images/icons/small-logo.svg";
import EditJobReview from "component/editJobPosting/editjobposting/jobReview";
import ReactHtmlParser from "react-html-parser";

import "component/clinicianJobProfile/clinicianJobProfile.scss";
import GeneralInformationForAdmin from "component/editJobPosting/editjobposting/GeneralInformationForAdmin";
function StripeProfile(editable) {
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const params = useParams();

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [applicantsList, setApplicantsList] = useState([]);
  useEffect(() => getJobDetails(), []);

  const getJobDetails = () => {
    setLoader(true);
    api(GET_JOB_BY_ID_URL, {}, null, { ...params }).then((res) => {
      if (res.status === RESPONSE_OK) {
        const resData = { ...res.data.data };
        const id = resData.id;
        setData({
          ...resData,
          ...resData.facilityId,
          facilityType: resData.facilityType,
          id: id,
          jobId: id,
          officeName: resData.officeName,
        });

        getApplicantsList(id, resData.facilityId.id);
      }

      setLoader(false);
    });
  };

  const getApplicantsList = (jobId, facilityId) => {
    setLoader(true);

    api(GET_APPLICANTS_LIST_URL, {}, null, {
      jobId: jobId,
      facilityId: facilityId,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setApplicantsList(res.data.data);
      }
      setLoader(false);
    });
  };

  return (
    <>
      <Helmet>
        <title>Purple PRN - Edit Shift Posting</title>
      </Helmet>
      <div className="clinicianjob-main">
        <div className="custom-container">
          <div className="back-to-search">
            <SmallBackArrow />
            <Link to="/admin/shifts">Back to list</Link>
          </div>
          <div className="man-profile">
            <Row>
              <Col md="9" className="left-profile">
                <Row>
                  <Col sm="2" className="profile-image">
                    <img
                      src={data?.primaryAddress?.picUrl || Logo}
                      alt={"Profile Pic"}
                    />
                  </Col>

                  <Col sm="10" className="profile-content">
                    {/* <h3>{data?.officeName || data?.facilityId?.officeName}</h3> */}
                    <p>{ReactHtmlParser(data?.jobDescription)}</p>
                    <Nav className="jona-links">
                      <NavItem>
                        <NavLink href="#">
                          <span>
                            <MoneyEnvelop />
                          </span>
                          ${data?.hourlyRate} per hour
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === "1",
                })}
                onClick={() => toggle("1")}
              >
                Shift details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === "2",
                })}
                onClick={() => toggle("2")}
              >
                Applicants
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            <TabPane tabId="1">
              <div className="stripe-general">
                {!isEmpty(data) && (
                  <GeneralInformationForAdmin
                    data={{
                      ...data,
                      jobSlots: data?.jobSlots,
                      applicantSlots: applicantsList.flatMap(
                        (applicant) =>
                          applicant.isProposedNewTime === true && applicant.applicantSlots && applicant.status === 'accepted'
                            ? applicant.applicantSlots
                            : []
                      )
                    }}
                    editable={editable}
                    getData={getJobDetails}
                  />
                )}
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="applicant-job-list pt-0 stripe-applicant">
                <div className="custom-container">
                  <div className="applicant-list-main ">
                    {applicantsList.map((applicant) => {
                      return (
                        <ApplicantCard
                          key={applicant.id}
                          data={{
                            ...applicant,
                            applicantSlots: applicant?.applicantSlots,
                          }}
                          linkTo={`/admin/clinicianprofile/${
                            applicant?.clinicianId?.id || applicant?.clinicianId
                          }?jobId=${params?.id || ""}`}
                          jobSlots={data?.jobSlots}
                          timeZone={data?.timeZone ?? "America/Chicago"}
                        />
                      );
                    })}
                  </div>
                  <CustomPagination />
                </div>
              </div>
            </TabPane>
            {/* <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <EditJobReview
                    count={ratings?.count}
                    ratings={ratings}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </Col>
              </Row>
            </TabPane> */}
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default StripeProfile;
