import React, { useState, useEffect, useContext } from "react";
import RequireNpiNumberModal from "component/modals/RequireNpiNumberModal";
import AddAccountFirstModal from "component/modals/jobApply/AddAccountFirst";
import { GET_BANK_ACCOUNTS, GET_JOB_BY_ID_URL } from "constants/ApiUrls";
import {
  INVALID_JOB_STATUS,
  RESPONSE_OK,
  SmallLogoURL,
} from "constants/AppConstants";
import { isEmpty } from "radash";
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
import "component/clinicianJobProfile/clinicianJobProfile.scss";
import { SmallBackArrow, Star, SmallMessageIcon } from "assets/svg";
import classnames from "classnames";
import EditJobReview from "component/clinicianJobProfile/clinicianJobProfile/clinicianJobReview";
import { Link, useNavigate, useParams } from "react-router-dom";
import JobApplyModal from "component/modals/jobApply/JobApplyModal";
import { api } from "api/Api";
import GeneralInformation from "component/editJobPosting/editjobposting/generalInformation";
import AboutFacility from "component/editJobPosting/editjobposting/aboutFacility";
import UserContext from "utils/context/UserContext";
import AuthContext from "utils/context/AuthContext";
import FormButton from "component/common/FormButton";
import ReactHtmlParser from "react-html-parser";

function ClinicianJobProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const [applyModal, setApplyModal] = useState(false);
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const { user } = useContext(UserContext);
  const [loaderButton, setLoaderButton] = useState(false);
  const { isUserAuthenticated } = useContext(AuthContext);
  const [addAccountFirst, setAddAccountFirst] = useState(false);
  const [requireNpiNumberModal, setRequireNpiNumberModal] = useState(false);
  useEffect(() => {
    setLoader(true);
    api(GET_JOB_BY_ID_URL, {}, null, {
      ...params,
      clinicianId: user?.clinicianId?.id,
    }).then((res) => {
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
      }
      setLoader(false);
    });
  }, [params?.id]);

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  const handleApply = () => {
    if (!user?.clinicianId?.npiNumber && data?.clinicianType === "pt") {
      setRequireNpiNumberModal(true);
    } else {
      setApplyModal(!applyModal);
    }
  };

  const handleSuccess = () => {
    navigate("/clinician/jobboard");
  };
  useEffect(() => {
    const facilityType = data?.facilityType || "";
    const arrayOfficeName = data?.officeName?.split(" ");
    let serialNumber = "";
    arrayOfficeName?.forEach((name) => {
      if (name.startsWith("#")) {
        serialNumber = name;
      }
    });
    const newName = `${facilityType} ${serialNumber}`;
    if (newName.trim()) {
      setName(newName);
    }
  }, [data]);
  const getBankAccounts = async () => {
    setLoaderButton(true);
    if (user && user?.id && isUserAuthenticated) {
      try {
        const response = await api(GET_BANK_ACCOUNTS, {}, null, {
          userId: user?.id,
        });
        setLoaderButton(false);
        return response?.data?.data?.length || 0;
      } catch (error) {
        setLoaderButton(false);
        console.log(error);
        return 0;
      }
    }
  };
  const getAccounts = async (data) => {
    const res = await getBankAccounts();
    if (res < 1) {
      setAddAccountFirst(true);
    } else {
      setApplyModal(!applyModal);
    }
  };

  const applyJob = () => {
    setApplyModal(!applyModal);
  };
  return (
    <>
      <Helmet>
        <title>Purple PRN - View Shift Posting</title>
      </Helmet>
      <div className="clinicianjob-main">
        {!isEmpty(data) && !loader && (
          <>
            {INVALID_JOB_STATUS?.includes(data?.status) ? (
              <div className="applicant-list-main custom-container">
                {window.history?.length > 1 ? (
                  <div
                    className="back-to-search"
                    onClick={() => navigate(-1)}>
                    <SmallBackArrow />
                    <a
                      className=""
                      onClick={() => navigate(-1)}>
                      Back
                    </a>
                  </div>
                ) : (
                  <div className="back-to-search">
                    <SmallBackArrow />
                    <Link to="/clinician/dashboard">Back to dashboard</Link>
                  </div>
                )}
                <p
                  id="noApplicants"
                  style={{ textAlign: "center" }}>
                  This shift was {data?.status ? data?.status : "deleted"}{" "}
                  recently
                </p>
              </div>
            ) : (
              <div className="custom-container">
                {window.history?.length > 1 ? (
                  <div
                    className="back-to-search"
                    onClick={() => navigate(-1)}>
                    <SmallBackArrow />
                    <a
                      className=""
                      onClick={() => {}}>
                      Back
                    </a>
                  </div>
                ) : (
                  <div className="back-to-search">
                    <SmallBackArrow />
                    <Link to="/clinician/dashboard">Back to dashboard</Link>
                  </div>
                )}
                <div className="man-profile">
                  <Row>
                    <Col
                      className={`left-profile ${
                        !data.isApplyForJob
                          ? "col-xxl-10 col-lg-9"
                          : "col-md-12"
                      }`}>
                      <Row>
                        <Col
                          sm="2"
                          className="profile-image">
                          <img
                            src={
                              data?.jobAddressPic ||
                              data?.ProfilePicUrl ||
                              SmallLogoURL
                            }
                            alt="Facility profile"
                          />
                        </Col>
                        <Col
                          sm="10"
                          className="profile-content">
                          <h3>
                            {data?.officeName || name} |{" "}
                            {data?.facilityOfficeName}{" "}
                          </h3>
                          <p>{ReactHtmlParser(data?.jobDescription)}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xxl="2"
                      lg="3"
                      className="profile-btn mb-4">
                      {!data.isApplyForJob && (
                        // <button
                        //   className="pt-btn btn-primary "
                        //   type="button"
                        //   onClick={getAccounts}
                        //   color="primary"
                        // >
                        //   Apply
                        // </button>
                        <FormButton
                          pt-btn
                          btn-primary
                          type={"button"}
                          label={"Apply"}
                          loader={loaderButton}
                          onClick={handleApply}
                        />
                      )}
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
                      Shift details
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
                      About facility
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={currentActiveTab}>
                  <TabPane tabId="1">
                    <GeneralInformation
                      data={data}
                      officeAddress={true}
                      clinician={true}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <AboutFacility data={data} />
                  </TabPane>
                  {/* <TabPane tabId="3">
                    <EditJobReview
                      ratings={ratings}
                      count={ratings?.count}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </TabPane> */}
                </TabContent>
              </div>
            )}
          </>
        )}
        <div className="title">{loader && <Spinner />}</div>
      </div>
      {!isEmpty(data) && (
        <JobApplyModal
          officeAddress={data}
          data={data}
          modal={applyModal}
          redirect={true}
          successCallback={() => handleSuccess()}
          toggle={() => handleApply()}
          addAccountFirst={addAccountFirst}
          setAddAccountFirst={setAddAccountFirst}
        />
      )}
      {addAccountFirst && (
        <AddAccountFirstModal
          modal={addAccountFirst}
          toggle={() => {
            setAddAccountFirst(!addAccountFirst);
          }}
          apply={() => {
            setApplyModal(true);
            setAddAccountFirst(!addAccountFirst);
          }}
        />
      )}
      {!user?.clinicianId?.npiNumber && data.clinicianType === "pt" && (
        <RequireNpiNumberModal
          modal={requireNpiNumberModal}
          data={data}
          toggle={() => setRequireNpiNumberModal(!requireNpiNumberModal)}
        />
      )}
    </>
  );
}
export default ClinicianJobProfile;
