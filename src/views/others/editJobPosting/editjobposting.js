import { api } from "api/Api";
import { MoneyEnvelop, Pencil, SmallBackArrow } from "assets/svg";
import classnames from "classnames";
import "component/editJobPosting/editjobposting.scss";
import AboutFacility from "component/editJobPosting/editjobposting/aboutFacility";
import GeneralInformation from "component/editJobPosting/editjobposting/generalInformation";
import EditJobDescriptionModal from "component/modals/EditJobDescriptionModal";
import { GET_JOB_BY_ID_URL } from "constants/ApiUrls";
import { CONFIRMED, RESPONSE_OK, SmallLogoURL } from "constants/AppConstants";
import { isEmpty } from "radash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ReactHtmlParser from "react-html-parser";
import { Link, useParams } from "react-router-dom";
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

function FacilityAccountSetting({ editable }) {
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [editJobDescriptionModal, setEditJobDescriptionModal] = useState(false);

  if (
    data.status === "confirmed" ||
    data.status === "completed" ||
    data.applicantCount > 0
  ) {
    editable = false;
  } else {
    editable = true;
  }

  const getData = () => {
    setLoader(true);
    api(GET_JOB_BY_ID_URL, {}, null, params).then((res) => {
      if (res.status === RESPONSE_OK) {
        setData({ ...res.data.data.facilityId, ...res.data.data });
        setLoader(false);
      }
    });
  };

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  return (
    <>
      <Helmet>
        <title>Purple PRN - Edit Shift Posting</title>
      </Helmet>

      <div className="Editjob-main">
        {loader && (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        )}
        {!isEmpty(data) && (
          <>
            <div className="custom-container">
              <div className="back-to-search">
                <SmallBackArrow />
                <Link to="/facility/shiftmanagement">Back</Link>
              </div>
              <div className="man-profile">
                <Row>
                  <Col
                    md="12"
                    className="left-profile">
                    <Row>
                      <Col
                        sm="2"
                        className="profile-image">
                        {/* <MedicalClinic /> */}
                        <img
                          src={data?.jobAddressPic || SmallLogoURL}
                          alt="Facility profile"
                        />
                      </Col>
                      <Col
                        sm="10"
                        className="profile-content">
                        <h3>{data?.officeName}</h3>
                        <p
                          className="job-description"
                          style={{ marginRight: "10px" }}>
                          {ReactHtmlParser(data?.jobDescription)}
                          {editable && (
                            <span
                              className="pencilicon"
                              onClick={() =>
                                setEditJobDescriptionModal(
                                  !editJobDescriptionModal,
                                )
                              }>
                              <Pencil />
                            </span>
                          )}
                        </p>

                        <Nav className="jona-links">
                          <NavItem>
                            <NavLink href="#">
                              <span>
                                <MoneyEnvelop />
                              </span>
                              ${data.hourlyRate} per hour
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
                      active: currentActiveTab === "2",
                    })}
                    onClick={() => {
                      toggle("2");
                    }}>
                    About facility
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "3",
                    })}
                    onClick={() => {
                      toggle("3");
                    }}>
                    Reviews
                  </NavLink>
                </NavItem> */}
              </Nav>
              <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <GeneralInformation
                        data={data}
                        editable={
                          !CONFIRMED?.includes(data?.status) &&
                          data?.applicantCount === 0
                        }
                        isTimeEditable={!CONFIRMED?.includes(data?.status)}
                        getData={getData}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <AboutFacility
                        data={data}
                        editable={true}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
            <EditJobDescriptionModal
              modal={editJobDescriptionModal}
              toggle={() =>
                setEditJobDescriptionModal(!editJobDescriptionModal)
              }
              data={data}
              callbackFn={() => {
                setEditJobDescriptionModal(!editJobDescriptionModal);
                getData();
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default FacilityAccountSetting;
