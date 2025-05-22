import React, { useState, useEffect, useContext, useRef } from "react";
import { Helmet } from "react-helmet";
import { Nav, NavItem, NavLink, UncontrolledTooltip } from "reactstrap";
import "component/userListing/userListing.scss";
import classnames from "classnames";
import EmailCapture from "component/userListing/emailCapture";
import { api } from "api/Api";
import { GET_FACILITY_DATA, USER_LIST_URL } from "constants/ApiUrls";
import {
  APP_LIMIT,
  CLICK_COPY,
  CURSORPOINTER,
  EMAIL_COPIED_TO_CLIPBOARD,
  INCOMPLETE_PROFILE,
  LOGIN_STATUS_LABELS,
  RESPONSE_OK,
  ROLES_LABELS,
} from "constants/AppConstants";
import { getDateFormat, getFullName } from "utils/Utils";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ApproveFacilityClinicianModal from "component/modals/ApproveFacilityClinicianModal";
import queryString from "query-string";
import { toast } from "react-toastify";
import DeactivateFacilityClinicianModal from "component/modals/DeactivateFacilityClinicianModal";
import AuthContext from "utils/context/AuthContext";
import UserContext from "utils/context/UserContext";
import PostAJobModal from "component/modals/PostAJobModal";
import { Pencil } from "assets/svg";
import EditFeePercetageModal from "component/modals/facility/EditFeePercetageModal";

const INDEX_OF_EMAIL = 3;

function UserListing() {
  const initFilters = {
    tabName: "clinicians",
    skip: 0,
    limit: APP_LIMIT,
  };
  const { isUserAuthenticated } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ ...initFilters });
  const [loader, setLoader] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [status, setStatus] = useState("");
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const role = localStorage.getItem("userRole");
  const [newModal, setNewModal] = useState(false);
  const [facilityData, setFacilityData] = useState({});
  const params = useParams();
  const requestSequenceRef = useRef(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [getFacilityDataLoader, setGetFacilityDataLoader] = useState(false);
  const [facilityFeePercentageModal, setFacilityFeePercentageModal] =
    useState(false);
  const [currentFilterName, setCurrentFilterName] = useState({
    prevTab: initFilters?.tabName,
    currentTab: initFilters?.tabName,
  });
  const isSubadmin = user?.roles === 'subadmin';
   
  const toggleNewModal = (facilityId = null, event = null) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    setNewModal(!newModal);
    if (facilityId) {
      getFacilityData(facilityId);
    }
  };

  const getFacilityData = (facilityId) => {
    setGetFacilityDataLoader(true);
    api(GET_FACILITY_DATA, {}, null, {
      id: facilityId,
    })
      .then((res) => {
        if (res.status === RESPONSE_OK) setFacilityData(res?.data?.data);
        else setFacilityData({});
      })
      .finally(() => {
        setGetFacilityDataLoader(false);
      });
  };

  const common = [
    {
      name: "User ID",
      width: "70px",
      selector: (row, index) =>
        filters.tabName !== "facility" ? (
          <>{row?.clinicianId?.serialNumber?.toUpperCase() || index + 1}</>
        ) : (
          <>{row?.facilityId?.serialNumber?.toUpperCase() || index + 1}</>
        ),
    },
    {
      name:
        filters.tabName === "clinicians"
          ? "Clinicians name"
          : filters.tabName === "all"
          ? "User Name"
          : filters.tabName === "subadmin"
          ? "Sub Admin name"
          : "Facility name",
      width: "150px",
      selector: (row) => (
        <>
          <div
            className="emailcapture-msg"
            id={"name" + row.id}
            style={{ cursor: "default" }}
            onClick={() => {
              navigator.clipboard.writeText(row.email);
              toast?.success(EMAIL_COPIED_TO_CLIPBOARD);
            }}>
            {row?.facilityId?.isSignupCompleted ||
            row?.clinicianId?.isSignupCompleted ? (
              filters.tabName === "facility" ? (
                user.roles === "subadmin" ? (
                  row?.facilityId?.officeName || "-" // Show only text, no link for subadmin
                ) : (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/admin/facilitydetails/${row.facilityId?.id}`}
                    target="_blank"
                  >
                    {row?.facilityId?.officeName || "-"}
                  </Link>
                )
              ) : (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/admin/facility/clinicianprofile/${row?.clinicianId.id}?jobId=${row.id}&facilityId=${row.facilityId}`}
                  target="_blank">
                  {getFullName(row)}
                </Link>
              )
            ) : filters.tabName === "all" &&
              !row?.clinicianId &&
              !row?.facilityId ? (
              getFullName(row)
            ) : filters.tabName === "subadmin" ? (
              getFullName(row)
            ) : (
              "-"
            )}
          </div>
          <UncontrolledTooltip
            placement="right"
            target={"name" + row.id}>
            {row.email
              ? row?.email
              : filters.tabName === "facility"
              ? row?.facilityId?.officeName || "-"
              : getFullName(row)}
          </UncontrolledTooltip>
        </>
      ),
    },
  ];
  const commonForFacilityAndClinician = [
    {
      name: filters.tabName !== "all" ? "Joined Date" : "",
      width: filters.tabName !== "all" ? "100px" : "0px",
      selector: (row) =>
        filters.tabName !== "all" && getDateFormat(row.createdAt),
    },
    {
      name: filters.tabName !== "all" ? "Email" : "",
      width: filters.tabName !== "all" ? "210px" : "0px",
      selector: (row) =>
        filters.tabName !== "all" && (
          <>
            <p
              className="email"
              onClick={() => {
                navigator.clipboard.writeText(row.email);
                toast?.success(EMAIL_COPIED_TO_CLIPBOARD);
              }}
              style={CURSORPOINTER}
              id={"email-" + row.id}>
              {row.email}
            </p>
            <UncontrolledTooltip
              placement="right"
              target={"email-" + row.id}>
              {CLICK_COPY}
            </UncontrolledTooltip>
          </>
        ),
    },
  ];
  const commonForSubAdmin = [
    {
      name: "User ID",
      width: "85px",
      selector: (row, index) => <>00{index + 1}</>,
    },
    {
      name: "Sub Admin name",

      width: "150px",
      selector: (row) => (
        <>
          <div
            className="emailcapture-msg"
            id={"name" + row.id}
            style={{ cursor: "default" }}
            onClick={() => {
              navigator.clipboard.writeText(row.email);
              toast?.success(EMAIL_COPIED_TO_CLIPBOARD);
            }}>
            {getFullName(row)}
          </div>
          <UncontrolledTooltip
            placement="right"
            target={"name" + row.id}>
            {getFullName(row)}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "Created Date",
      width: "150px",
      selector: (row) => getDateFormat(row.createdAt),
    },
    {
      name: "Email",
      width: "300px",
      selector: (row) => (
        <>
          <p
            className="email"
            onClick={() => {
              navigator.clipboard.writeText(row.email);
              toast?.success(EMAIL_COPIED_TO_CLIPBOARD);
            }}
            style={CURSORPOINTER}
            id={"email-" + row.id}>
            {row.email}
          </p>
          <UncontrolledTooltip
            placement="right"
            target={"email-" + row.id}>
            {CLICK_COPY}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "Phone No",
      width: "130px",
      selector: (row) => <div>{row.phone}</div>,
    },
    {
      name: "Status",
      width: "100px",
      selector: (row) => (
        <div
          className={
            row.status === "pending"
              ? "text-secondary"
              : row.status === "deactivate"
              ? "text-danger"
              : "text-primary"
          }>
          {LOGIN_STATUS_LABELS.get(row.status)}
        </div>
      ),
    },
    {
      name: "",
      width: "100px",
      selector: (row) => (
        <div className="text-primary min-100">
          <Link
            onClick={() => {
              setSelectedRow(row);
              setDeactivateModal(!deactivateModal);
              setStatus(row.status);
            }}>
            {row.status !== "deactivate" ? "Deactivate" : "Activate"}
          </Link>
        </div>
      ),
    },
  ];
  filters?.tabName === "all" && common.splice(INDEX_OF_EMAIL, 1);

  //for super admin
  const navItems = [
    { title: "Clinicians", value: "clinicians" },
    { title: "Facilities", value: "facility" },
    { title: "Email capture", value: "all" },
    { title: "Subadmin's", value: "subadmin" },
  ];

  //for sub admin
  const navForSubAdminItems = [
    { title: "Clinicians", value: "clinicians" },
    { title: "Facilities", value: "facility" },
    { title: "Email capture", value: "all" },
  ];

  const navItemsValues = navItems?.map((e) => e?.value);

  const initColumns = {
    clinicians: [
      ...common,
      {
        name: filters.tabName === "clinicians" && "Zip Code",

        width: filters.tabName === "clinicians" && "65px",

        selector: (row) =>
          filters.tabName === "clinicians" && (
            <> {row.clinicianId?.homeAddressZipCode || "-"}</>
          ),
      },
      ...commonForFacilityAndClinician,
      {
        name: "No of Shifts",
        width: "68px",
        selector: (row) => <>{row.numberOfShifts || "-"}</>,
      },
      {
        name: "Mal practice fees",
        width: "120px",
        selector: (row) =>
          row?.clinicianId?.malpracticeFee
            ? `$${row?.clinicianId?.malpracticeFee}`
            : "-",
      },
      // {
      //   name: "Rating",
      //   width: "73px",
      //   selector: (row) => (
      //     <>{row.averageRating ? `${row.averageRating}/5` : "-"} </>
      //   ),
      // },
      {
        name: "Status",
        width: "97px",
        selector: (row) =>
          row?.clinicianId?.isSignupCompleted ? (
            <div
              className={
                row.status === "pending"
                  ? "text-secondary"
                  : row.status === "deactivate"
                  ? "text-danger"
                  : "text-primary"
              }>
              {LOGIN_STATUS_LABELS.get(row.status)}
            </div>
          ) : (
            <div
              className={
                row.status === "deactivate" ? "text-danger" : "text-primary"
              }>
              {row.status === "deactivate" ? "Deactivated" : INCOMPLETE_PROFILE}
            </div>
          ),
      },
      {
        name: "",
        width: "125px",
        selector: (row) =>
          row?.clinicianId?.isSignupCompleted && row?.status === "pending" ? (
            <div className="text-primary min-100">
              <Link
                onClick={() => {
                  setSelectedRow(row);
                  setApproveModal(!approveModal);
                }}>
                Approve request
              </Link>
            </div>
          ) : (
            <>-</>
          ),
      },
      {
        name: "",
        width: "88px",
        selector: (row) =>
          row?.clinicianId?.isSignupCompleted ? (
            <div className="text-primary min-100">
              <Link
                onClick={() => {
                  setSelectedRow(row);
                  setDeactivateModal(!deactivateModal);
                  setStatus(row.status);
                }}>
                {row.status !== "deactivate" ? "Deactivate" : "Activate"}
              </Link>
            </div>
          ) : (
            <div className="text-primary min-100">
              <Link
                onClick={() => {
                  setSelectedRow(row);
                  setDeactivateModal(!deactivateModal);
                  setStatus(row.status);
                }}>
                {row.status !== "deactivate" ? "Deactivate" : "Activate"}
              </Link>
            </div>
          ),
      },

      {
        name: "",
        width: "100px",
        selector: (row) =>
          row?.clinicianId ? (
            <div className="text-primary">
              <Link
                to={`/admin/cliniciandetails/${row?.clinicianId?.id}`}
                rel="noreferrer"
                target="_blank">
                View details
              </Link>
            </div>
          ) : (
            <>-</>
          ),
      },
    ],
    facility: [
      ...common,
      ...commonForFacilityAndClinician,
      {
        name: "No of Shifts",
        width: "100px",
        selector: (row) => <>{row.numberOfShifts || "-"}</>,
      },
      // {
      //   name: "Rating",
      //   width: "75px",
      //   selector: (row) => (
      //     <>{row.averageRating ? `${row.averageRating}/5` : "-"} </>
      //   ),
      // },
      {
        name: "Facility Fee",
        width: "110px",
        selector: (row) =>
          row?.facilityId?.isSignupCompleted &&
          filters?.tabName === "facility" &&
          row?.status === "approved" ? (
            <div className="text-primary text-decoration-none">
              {row?.facilityId.facilityFeePercentage}%
              <Link
                className="pencil-icon mr-1"
                onClick={() => {
                  setSelectedRow(row);
                  setFacilityFeePercentageModal(true);
                }}>
               {user.roles !== 'subadmin' ? <Pencil /> : ''}
              </Link>
            </div>
          ) : (
            " - "
          ),
      },
      {
        name: "Status",
        selector: (row) =>
          row?.facilityId?.isSignupCompleted ? (
            <div
              className={
                row.status === "pending"
                  ? "text-secondary"
                  : row.status === "deactivate"
                  ? "text-danger"
                  : "text-primary"
              }>
              {LOGIN_STATUS_LABELS.get(row.status)}
            </div>
          ) : (
            <div
              className={
                row.status === "deactivate" ? "text-danger" : "text-primary"
              }>
              {row.status === "deactivate" ? "Deactivated" : INCOMPLETE_PROFILE}
            </div>
          ),
      },
      {
        name: "",
        width: "150px",
        selector: (row) => {
          if (row?.facilityId?.isSignupCompleted && row?.status === "pending") {
            return (
              <div className="text-primary min-100">
                <Link
                  onClick={() => {
                    setSelectedRow(row);
                    setApproveModal(!approveModal);
                  }}>
                  Approve request
                </Link>
              </div>
            );
          } else if (
            row?.facilityId?.isSignupCompleted &&
            filters?.tabName === "facility" &&
            row?.status === "approved"
          ) {
            return (
              <div className="text-primary min-100">
                <div>
              {!isSubadmin && (<Link
                  onClick={(e) => {
                    const selectedFacilityId = row.facilityId?.id; // Get the facilityId
                    toggleNewModal(selectedFacilityId, e); // Pass the facilityId and event
                    setSelectedRow(row);
                    setStatus(row.status);
                  }}>
                  Post Shift
                </Link>
                )} 
                </div>
              </div>
            );
          } else {
            return <>-</>;
          }
        },

        // selector: (row) =>
        //   row?.facilityId?.isSignupCompleted && row?.status === 'pending' ? (
        //     <div className="text-primary min-100">
        //       <Link
        //         onClick={() => {
        //           setSelectedRow(row);
        //           setApproveModal(!approveModal);
        //         }}>
        //         Approve request
        //       </Link>
        //     </div>
        //   ) : (
        //     <>-</>
        //   ),
      },
      {
        name: "",
        width: "95px",
        selector: (row) =>
          row?.facilityId?.isSignupCompleted  && user.roles !== "subadmin" ? (
            <div className="text-primary min-100">
              <Link
                onClick={() => {
                  setSelectedRow(row);
                  setDeactivateModal(!deactivateModal);
                  setStatus(row.status);
                }}>
                {row.status !== "deactivate" ? "Deactivate" : "Activate"}
              </Link>
            </div>
          ) : user.roles !== "subadmin" ? (
            <div className="text-primary min-100">
              <Link
                onClick={() => {
                  setSelectedRow(row);
                  setDeactivateModal(!deactivateModal);
                  setStatus(row.status);
                }}>
                {row.status !== "deactivate" ? "Deactivate" : "Activate"}
              </Link>
            </div>
          ) : (
            ""
          ),
      },
      {
        name: "",
        width: "100px",
        selector: (row) =>
          row?.facilityId?.isSignupCompleted ? (
            <div className="text-primary">
              {user.roles !== "subadmin" && (<Link
                to={`/admin/facilitydetails/${row?.facilityId?.id}`}
                rel="noreferrer"
                target="_blank">
                View details
              </Link>)}
            </div>
          ) : (
            <>-</>
          ),
      },
    ],
    all: [
      ...common,
      {
        name: "Joined Date",
        width: "120px",
        selector: (row) => getDateFormat(row.createdAt),
      },
      {
        name: "Email address",
        width: "200px",
        selector: (row) => row.email,
      },
      {
        name: "User Type",
        width: "120px",
        selector: (row) => ROLES_LABELS.get(row.roles),
      },
      {
        name: "Status",
        width: "120px",
        selector: (row) => {
          return (
            <>
              {filters?.tabName === "all" ? (
                <div
                  className={
                    !row.isVerified ? "text-secondary" : "text-primary"
                  }>
                  {row.isVerified ? "Verified" : "Not verified"}
                </div>
              ) : (
                <div
                  className={
                    row.status === "pending" ? "text-secondary" : "text-primary"
                  }>
                  {LOGIN_STATUS_LABELS.get(row.status)}
                </div>
              )}
            </>
          );
        },
      },
      {
        name: "Zip code",
        width: "90px",
        selector: (row) => row.zipCode || "-",
      },
      {
        name: "Message",
        width: "200px",
        selector: (row) => (
          <div
            className="emailcapture-msg"
            id={"message" + row.id}>
            {row.message || "-"}
            {row.message?.length > 0 && (
              <UncontrolledTooltip
                placement="right"
                target={"message" + row.id}>
                {row.message}
              </UncontrolledTooltip>
            )}
          </div>
        ),
      },
    ],
    subadmin: [...commonForSubAdmin],
  };
  const [columns, setColumns] = useState([initColumns[initFilters.tabName]]);

  // useEffect(() => {
  //   setColumns(initColumns[filters.tabName]);
  //   getData();
  // }, [filters]);
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    setColumns(initColumns[filters.tabName]);
    getData();
  }, [filters]);

  const getData = (withLoader = true) => {
    setApproveModal(false);
    setDeactivateModal(false);
    withLoader && setLoader(true);

    const currentRequestSequence = ++requestSequenceRef.current;
    return api(USER_LIST_URL, {}, null, { ...filters })
      .then((res) => {
        if (currentRequestSequence === requestSequenceRef.current) {
          if (res.status === RESPONSE_OK) {
            let filteredData = res.data.data;
             // Remove 'deactivate' users when status is 'incomplete'
             if (filters.status === "incomplete") {
              filteredData = filteredData.filter(user => user.status !== "deactivate");
            }
           
            setList([...filteredData]);
            setCount(res.data.count);
            // setList([...res.data.data]);
          }
          withLoader && setLoader(false);
        }
      })
      .catch((error) => {
        if (currentRequestSequence === requestSequenceRef.current) {
          console.error("Error fetching data:", error);
          setLoader(false);
        }
      });
  };

  useEffect(() => {
    let qsObj = queryString?.parse(location?.search);
    if (qsObj?.tab && navItemsValues?.includes(qsObj?.tab)) {
      setFilters({ ...initFilters, tabName: qsObj?.tab });
      navigate(location?.pathname);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Purple PRN - User Listing</title>
      </Helmet>
      <div className="account-settings-main user-listing">
        {isUserAuthenticated && role === "admin" ? (
          <div className="custom-container">
            <h1>Users</h1>
            <Nav tabs>
              {navItems.map((item, index) => {
                return (
                  <NavItem key={index}>
                    <NavLink
                      className={classnames({
                        active: filters.tabName === item.value,
                      })}
                      onClick={() => {
                        setList([]);
                        setCurrentFilterName((prev) => {
                          return {
                            prevTab: prev.currentTab,
                            currentTab: item.value,
                          };
                        });
                        setFilters({
                          ...initFilters,
                          tabName: item.value,
                          search: "",
                          userType: "",
                          status: "",
                        });
                      }}>
                      {item.title}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>

            <EmailCapture
              currentFilterName={currentFilterName}
              count={count}
              filters={filters}
              setFilters={setFilters}
              list={list}
              columns={columns}
              loader={loader}
            />
          </div>
        ) : (
          <div className="custom-container">
            <h1>Users</h1>
            <Nav tabs>
              {navForSubAdminItems.map((item) => {
                return (
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: filters.tabName === item.value,
                      })}
                      onClick={() => {
                        setList([]);
                        setCurrentFilterName((prev) => {
                          return {
                            prevTab: prev.currentTab,
                            currentTab: item.value,
                          };
                        });
                        setFilters({
                          ...initFilters,
                          tabName: item.value,
                          search: "",
                          userType: "",
                          status: "",
                        });
                      }}>
                      {item.title}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>

            <EmailCapture
              currentFilterName={currentFilterName}
              count={count}
              filters={filters}
              setFilters={setFilters}
              list={list}
              columns={columns}
              loader={loader}
            />
          </div>
        )}
      </div>

      <ApproveFacilityClinicianModal
        modal={approveModal}
        toggle={() => setApproveModal(!approveModal)}
        data={selectedRow}
        getData={getData}
      />
      <EditFeePercetageModal
        modal={facilityFeePercentageModal}
        data={selectedRow}
        toggle={() => setFacilityFeePercentageModal(false)}
        getData={getData}
      />
      <DeactivateFacilityClinicianModal
        modal={deactivateModal}
        status={status}
        toggle={() => setDeactivateModal(!deactivateModal)}
        data={selectedRow}
        getData={getData}
      />
      <PostAJobModal
        resetList={() => setFilters({ ...initFilters })}
        facilityId={
          selectedRow?.facilityId?.id || user?.facilityId?.id || params.id
        }
        facilityDataLoader={getFacilityDataLoader}
        modal={newModal}
        toggle={toggleNewModal}
        data={list}
        facilityInfo={facilityData}
      />
    </>
  );
}

export default UserListing;
