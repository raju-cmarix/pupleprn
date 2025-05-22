import React, { useState, useEffect } from "react";
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
import { SmallBackArrow, Bag } from "assets/svg";
import classnames from "classnames";
import GeneralInformation from "component/facilityProfile/facilityProfile/generalInformation";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "api/Api";
import { GET_CLINICIAN_DATA } from "constants/ApiUrls";
import { RESPONSE_OK, SmallLogoURL } from "constants/AppConstants";
import { getFullName } from "utils/Utils";
import { isEmpty } from "radash";
import Gender from "assets/images/icons/gender.png";
import queryString from "query-string";
import MyConfirmShifts from "component/myDashboard/confirmShift";

function ClinicianProfile() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [queryStringObj, setQueryStringObj] = useState({});
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    let qsObj = queryString.parse(location.search);
    setQueryStringObj({ ...qsObj });
  }, []);

  useEffect(() => {
    if (isEmpty(params)) return;
    getData();
  }, [params]);

  const getData = () => {
    setLoader(true);
    api(GET_CLINICIAN_DATA, {}, null, {
      ...params,
    }).then((res) => {
      if (res.status === RESPONSE_OK) setData(res.data.data);
      setLoader(false);
    });
  };

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
            {/* <Link
              to={
                queryStringObj?.jobId
                  ? `/admin/jobdetails/${queryStringObj?.jobId}`
                  : `/admin/users`
              }
            >
              Back
            </Link> */}
            <Link onClick={() => navigate(-1)}>Back</Link>
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
                  <Col
                    md="9"
                    className="left-profile">
                    <Row>
                      <Col
                        sm="2"
                        className="profile-image">
                        <img
                          src={data.profileUrl || SmallLogoURL}
                          alt="profile"
                        />
                      </Col>
                      <Col
                        sm="10"
                        className="profile-content">
                        <Link
                          to={`/admin/cliniciandetails/${params?.id}`}
                          style={{ textDecoration: "none" }}>
                          <h3>
                            {getFullName(data)}{" "}
                            {data?.clinicianType
                              ? `(${data?.clinicianType?.toUpperCase()})`
                              : data?.roles
                              ? `(${data?.roles?.toUpperCase()})`
                              : ""}
                          </h3>
                          <p>{data.aboutMe}</p>
                        </Link>
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
                  <Row>
                    <Col sm="12">
                      <GeneralInformation
                        data={data}
                        admin={true}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <MyConfirmShifts values={data} />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ClinicianProfile;
