import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import "component/facilityProfile/facilityProfile.scss";
import { SmallBackArrow, Bag, CheckIcon, CrossIcon } from "assets/svg";
import classnames from "classnames";
import GeneralInformation from "component/facilityProfile/facilityProfile/generalInformation";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { api } from "api/Api";
import {
  APPROVE_REJECT_APPLICANT_URL,
  GET_CLINICIAN_DATA,
  GET_JOB_BY_ID_URL,
} from "constants/ApiUrls";
import {
  PaymentMethods,
  RESPONSE_OK,
  SmallLogoURL,
} from "constants/AppConstants";
import { getFullName } from "utils/Utils";
import { isEmpty } from "radash";
import Gender from "assets/images/icons/gender.png";
import queryString from "query-string";
import UserContext from "utils/context/UserContext";
import AcceptClinicianApplicationWInvoice from "component/jobPosting/Modals/AcceptClinicianApplicationWInvoice";
import RejectClinicianApplication from "component/jobPosting/Modals/RejectClinicianApplication";

function FacilityProfile() {
  const params = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryStringObj, setQueryStringObj] = useState({});
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [jobData, setJobData] = useState();
  const { user } = useContext(UserContext);
  const [accept, setAccept] = useState(0);
  const [reject, setReject] = useState(false);
  const [currentActiveTab, setCurrentActiveTab] = useState("1");

  useEffect(() => {
    let qsObj = queryString.parse(location.search);
    setQueryStringObj({ ...qsObj });
  }, []);

  useEffect(() => {
    if (isEmpty(queryStringObj)) return;
    if (queryStringObj?.jobId) getJobData();
    getData();
  }, [queryStringObj]);

  const getData = () => {
    setLoader(true);
    api(GET_CLINICIAN_DATA, {}, null, {
      ...params,
      jobId: queryStringObj.jobId,
      facilityId: queryStringObj.facilityId,
    }).then((res) => {
      if (res.status === RESPONSE_OK) setData(res.data.data);
      setLoader(false);
    });
  };

  const getJobData = () => {
    setLoader(true);
    api(GET_JOB_BY_ID_URL, {}, null, { id: queryStringObj?.jobId })
      .then((res) => {
        if (res.status === RESPONSE_OK) setJobData(res.data.data);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  const handleApplication = async (status, price) => {
    if (status === "accepted") {
      setLoader(true);
      let reqObj = {
        facilityId: queryStringObj?.facilityId,
        jobId: queryStringObj?.jobId,
        id: queryStringObj?.applicationId,
        status: status,
        role: "facility",
        ...price,
      };
      const sendPayment = () => {
        api(APPROVE_REJECT_APPLICANT_URL, reqObj)
          .then(() => {
            setAccept(0);
          })
          .finally(() => {
            setQueryStringObj({
              jobId: queryStringObj.jobId,
              facilityId: queryStringObj.facilityId,
            });
            setSearchParams({
              jobId: queryStringObj.jobId,
              facilityId: queryStringObj.facilityId,
            });
            getJobData();
            setLoader(false);
          });
      };
      if (price?.paymentMethod === PaymentMethods?.Invoice) {
        sendPayment();
      }
    } else if (status === "rejected") {
      let reqObj = {
        facilityId: queryStringObj?.facilityId,
        jobId: queryStringObj?.jobId,
        id: queryStringObj?.applicationId,
        status: status,
        role: "facility",
      };
      setLoader(true);
      api(APPROVE_REJECT_APPLICANT_URL, reqObj)
        .then(() => {
          setReject(!reject);
        })
        .finally(() => {
          setQueryStringObj((prev) => ({
            jobId: prev.jobId,
            facilityId: prev.facilityId,
          }));
          setSearchParams({
            jobId: queryStringObj.jobId,
            facilityId: queryStringObj.facilityId,
          });
          getJobData();
          setLoader(false);
        });
    }
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
            <Link
              to={
                queryStringObj.confirmed
                  ? "/facility/shiftmanagement"
                  : `/facility/applicants${location.search}`
              }>
              Back to applicants
            </Link>
          </div>
          {loader && (
            <div className="title">
              <Spinner />
            </div>
          )}
          {!isEmpty(data) && (
            <>
              <div className="man-profile">
                <Row>
                  <Col className="left-profile">
                    <Row>
                      <Col
                        sm="2"
                        className="profile-image">
                        <img
                          src={data?.profileUrl || SmallLogoURL}
                          alt="profile"
                        />
                      </Col>
                      <Col
                        sm="10"
                        className="profile-content">
                        <h3>
                          {getFullName(data)}{" "}
                          {data?.clinicianType
                            ? `(${data?.clinicianType?.toUpperCase()})`
                            : data?.roles
                            ? `(${data?.roles?.toUpperCase()})`
                            : ""}
                        </h3>
                        <p>{data.aboutMe}</p>
                        <Nav className="jona-links">
                          <NavItem>
                            <NavLink href="#">
                              <span>
                                <img
                                  src={Gender}
                                  className="img-fluid"
                                  alt="gender"
                                />
                              </span>
                              {data.gender === "M" ? "Male" : "Female"}
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="#">
                              <span>
                                <Bag />
                              </span>
                              {data.totalPracticYears} years experience
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Col>
                    </Row>
                  </Col>
                  {jobData?.status === "posted" &&
                    user?.roles === "facility" &&
                    queryStringObj?.approveDecline === "1" && (
                      <Col
                        xxl="2"
                        lg="3"
                        className="right-profile">
                        <button
                          id={"approve"}
                          className="pt-btn-icon btn-secondary mx-2 rounded-5"
                          onClick={() => {
                            setAccept(true);
                          }}>
                          <CheckIcon />
                        </button>
                        <button
                          id={"reject"}
                          className="pt-btn-icon btn-danger rounded-5"
                          onClick={() => {
                            setReject(true);
                          }}>
                          <CrossIcon />
                        </button>
                      </Col>
                    )}
                </Row>
              </div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "1",
                    })}
                    onClick={() => toggle("1")}>
                    General information
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "2",
                    })}
                    onClick={() => toggle("2")}>
                    Reviews
                  </NavLink>
                </NavItem> */}
              </Nav>
              <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <GeneralInformation data={data} />
                    </Col>
                  </Row>
                </TabPane>
                {/* <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <ProfileReview
                        ratings={ratings}
                        count={ratings?.count}
                        filters={filters}
                        setFilters={setFilters}
                      />
                    </Col>
                  </Row>
                </TabPane> */}
              </TabContent>
            </>
          )}
          <AcceptClinicianApplicationWInvoice
            isOpen={accept}
            toggle={() => {
              setAccept(false);
            }}
            args={{}}
            accept={accept}
            setAccept={(e) => {
              setAccept(e);
              setLoader(false);
            }}
            handleApplication={(paymentCharges) =>
              handleApplication("accepted", paymentCharges)
            }
            loader={loader}
          />
          <RejectClinicianApplication
            isOpen={reject}
            toggle={() => setReject(false)}
            handleApplication={() => handleApplication("rejected")}
          />
        </div>
      </div>
    </>
  );
}

export default FacilityProfile;
