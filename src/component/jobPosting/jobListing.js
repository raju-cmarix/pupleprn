import { api } from "api/Api";
import DatesLabel from "component/common/DatesLabel";
import DeleteAJobModal from "component/modals/DeleteAJobModal";
import PostAJobModal from "component/modals/PostAJobModal";
import {
  DELETE_FACILITY_JOB_URL,
  GET_FACILITY_DATA,
  GET_FACILITY_JOB_POST_URL,
} from "constants/ApiUrls";
import { APP_LIMIT, EXPIRED, RESPONSE_OK } from "constants/AppConstants";
import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import {
  Button,
  Col,
  Input,
  Row,
  Spinner,
  UncontrolledPopover,
} from "reactstrap";
import UserContext from "utils/context/UserContext";
import { DownArrow, Options, TickCalender } from "assets/svg";
import CustomPagination from "../common/customPagination";
import Select from "react-dropdown-select";
import {
  jobListingsSortBy,
  jobStatus,
} from "../../views/authentication/signUpClinician/HourlyConstant";
import { ReactComponent as SortIcon } from "../../assets/images/icons/arrows-up.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/icons/close.svg";
import FilterIcon from "../../assets/images/icons/filter.png";
import "./jobPosting.scss";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import ApplicantCell from "./ApplicantCell";
import TimeLabel from "component/common/TimeLabel";
import AddressLabel from "component/common/AddressLabel";
import FacilityMassHourlyRateUpdateModal from "component/modals/FacilityMassHourlyRateUpdateModal";

function JobListing({ currentActiveTab }) {
  const [date, setDate] = useState([]);
  const JobStatusRef = useRef(null);
  const DateRef = useRef(null);
  const initFilters = {
    skip: 0,
    limit: APP_LIMIT,
    jobStatus: "posted",
    startDate: "",
    endDate: "",
  };

  const handleSort = (field, sortDirection) => {
    let listData = list?.sort((a, b) => {
      if (field?.sortField === "createdAt") {
        if (sortDirection === "asc") {
          return new Date(b?.createdAt) - new Date(a?.createdAt);
        } else {
          return new Date(a?.createdAt) - new Date(b?.createdAt);
        }
      } else if (field?.sortField === "totalPay") {
        if (sortDirection === "asc") {
          return Number(b?.totalPay) - Number(a?.totalPay);
        } else {
          return Number(a?.totalPay) - Number(b?.totalPay);
        }
      } else if (field?.sortField === "numberOfApplicants") {
        if (sortDirection === "asc") {
          return Number(b?.numberOfApplicants) - Number(a?.numberOfApplicants);
        } else {
          return Number(a?.numberOfApplicants) - Number(b?.numberOfApplicants);
        }
      } else if (field?.sortField === "serialNumber") {
        if (sortDirection === "asc") {
          return Number(b?.serialNumber) - Number(a?.serialNumber);
        } else {
          return Number(a?.serialNumber) - Number(b?.serialNumber);
        }
      } else if (field?.sortField === "jobAddressNickname") {
        if (sortDirection === "asc") {
          return (b?.jobAddressNickname || "").localeCompare(
            a?.jobAddressNickname || ""
          );
        } else {
          return (a?.jobAddressNickname || "").localeCompare(
            b?.jobAddressNickname || ""
          );
        }
      } else if (field?.sortField === "day1") {
        if (sortDirection === "asc") {
          return (
            new Date(b?.jobSlots?.[0]?.startDate || b?.timeZone) -
            new Date(a?.jobSlots?.[0]?.startDate || a?.timeZone)
          );
        } else {
          return (
            new Date(a?.jobSlots?.[0]?.startDate || a?.timeZone) -
            new Date(b?.jobSlots?.[0]?.startDate || b?.timeZone)
          );
        }
      } else if (field?.sortField === "day2") {
        const getProposedStartDate = (row) => {
          const proposedApplicant = row.applicants?.find(
            (applicant) => applicant.isProposedNewTime === 1
          );
          return proposedApplicant
            ? new Date(proposedApplicant.startDate)
            : null;
        };

        const dateA = getProposedStartDate(a);
        const dateB = getProposedStartDate(b);

        if (sortDirection === "asc") {
          return (dateB || 0) - (dateA || 0); // Sort descending
        } else {
          return (dateA || 0) - (dateB || 0); // Sort ascending
        }
      } else if (field?.sortField === "applicationDetails") {
        if (sortDirection === "asc") {
          return (
            b?.applicants?.[0]?.clinicianFirstName?.toLowerCase() || ""
          ).localeCompare(
            a?.applicants?.[0]?.clinicianFirstName?.toLowerCase() || ""
          );
        } else {
          return (
            a?.applicants?.[0]?.clinicianFirstName?.toLowerCase() || ""
          ).localeCompare(
            b?.applicants?.[0]?.clinicianFirstName?.toLowerCase() || ""
          );
        }
      } else if (field?.sortField === "clinicianType") {
        if (sortDirection === "asc") {
          return (b?.clinicianType || "").localeCompare(a?.clinicianType || "");
        } else {
          return (a?.clinicianType || "").localeCompare(b?.clinicianType || "");
        }
      } else if (field?.sortField === "hourlyRate") {
        if (sortDirection === "asc") {
          return new Date(b?.hourlyRate) - new Date(a?.hourlyRate);
        } else {
          return new Date(a?.hourlyRate) - new Date(b?.hourlyRate);
        }
      }
    });

    setList([...listData]);
  };

  const handleDateChange = (val = []) => {
    setDate(val);
    if (val[0] && val[1]) {
      setFilters({
        ...filters,
        skip: 0,
        startDate: dayjs(val[0]).startOf("day").unix() * 1000,
        endDate: dayjs(val[1]).endOf("day").unix() * 1000,
      });
    } else {
      setFilters({
        ...filters,
        skip: 0,
        startDate: "",
        endDate: "",
      });
    }
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({ ...initFilters });
  const { user } = useContext(UserContext);
  const [selectedStatus, setSelectedStatus] = useState([
    { label: "Posted", value: "posted" },
  ]);
  const [massUpdateJobIds, setMassUpdateJobIds] = useState([]);
  const [massUpdateModal, setMassUpdateModal] = useState(false);

  const handleJobMultiSelect = (e, jobId) => {
    // If checked add jobId in array, else remove if it is unchecked
    if (e.target.checked) {
      setMassUpdateJobIds((prev) => {
        if (!prev.includes(jobId)) {
          return [...prev, jobId];
        }
        return prev;
      });
    } else {
      setMassUpdateJobIds((prev) => prev.filter((id) => id !== jobId));
    }
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleNewModal = () => {
    setNewModal(!newModal);
  };

  const css = new Map();
  css.set("deleted", "danger");
  css.set("posted", "primary");
  css.set("completed", "secondary");
  css.set("confirmed", "primary");

  useEffect(() => {
    if (user?.facilityId?.id) {
      getList(true);
    }
  }, [filters, currentActiveTab, user?.facilityId?.id]);

  //"It's refreshing every minute, causing the address to change and filters not to persist."
  // useEffect(() => {
  //   if (user?.facilityId?.id) {
  //     const interval = setInterval(() => getListWOutLoader(), MINUTE_MS);

  //     return () => clearInterval(interval);
  //   }
  // }, [user?.facilityId?.id]);

  const columns = [
    {
      name: "Shift ID",
      sortable: true,
      width: "75px",
      sortField: "serialNumber",
      selector: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-1">
          {row?.status === "posted" && row?.isDeleted === 0 && (
            <Input
              className="d-inline"
              type={"checkbox"}
              id={row.serialNumber}
              checked={massUpdateJobIds.includes(row.id)}
              defaultChecked={false}
              onChange={(ev) => {
                handleJobMultiSelect(ev, row.id);
              }}
            />
          )}
          <span className="">{row.serialNumber || "-"}</span>
        </div>
      ),
    },
    {
      name: "Location",
      sortable: true,
      sortField: "jobAddressNickname",
      selector: (row) => (
        <AddressLabel
          arr={[
            {
              jobAddressNickname: row.jobAddressNickname,
              jobAddress1: row.jobAddress1,
              jobAddress2: row.jobAddress2,
              city: row.city,
              state: row.state,
              zipCode: row.zipCode,
            },
          ]}
        />
      ),
      width: "96px",
    },
    {
      name: (
        <div>
          Day & Time <br />
          (Original)
        </div>
      ),
      sortable: true,
      sortField: "day1",
      selector: (row) =>
        <DatesLabel arr={row.jobSlots} timeZone={row.timeZone} /> || "-",
      width: "200px",
    },
    {
      name: (
        <div>
          Day & Time <br />
          (Proposed)
        </div>
      ),
      sortable: true,
      sortField: "day2",
      selector: (row) => {
        if (row.applicants && row.applicants.length > 0) {
          const proposedTimes = row.applicants.map((applicant, index) => {
            if (applicant.isProposedNewTime === 1) {
              return (
                <div
                  key={applicant.id}
                  style={{ marginTop: index !== 0 ? "12px" : "0px" }}
                >
                  <TimeLabel
                    key={applicant.id}
                    arr={[applicant]}
                    timeZone={row.timeZone}
                  />
                </div>
              );
            }
            return (
              <div
                style={{
                  color: "#01a796",
                  marginTop: index !== 0 ? "15px" : "0px",
                }}
              >
                {" "}
                -
              </div>
            );
          });
          return proposedTimes;
        } else {
          return <div style={{ color: "#01a796" }}> - </div>;
        }
      },
      width: "130px",
    },
    {
      name: "Applicant Details",
      width: "200px",
      sortable: true,
      sortField: "applicationDetails",
      cell: (row) => <ApplicantCell row={row} getList={getList} />,
    },
    {
      name: "Clinician Type",
      width: "96px",
      sortable: true,
      sortField: "clinicianType",
      selector: (row) => row?.clinicianType?.toUpperCase() || "",
    },
    {
      width: "70px",
      name: "$/hr",
      sortable: true,
      sortField: "hourlyRate",
      selector: (row) => Number(row.hourlyRate) || 0,
    },
    {
      name: "number of applicants",
      width: "120px",
      sortable: true,
      sortField: "numberOfApplicants",
      selector: (row) =>
        row?.status !== EXPIRED && row.numberOfApplicants ? (
          <Link
            to={`/facility/applicants?jobId=${row.id}&facilityId=${row.facilityId}`}
            target="_blank"
          >
            {Number(row.numberOfApplicants) || 0}
          </Link>
        ) : (
          <>{Number(row.numberOfApplicants) || 0}</>
        ),
    },
    {
      name: "Status",
      width: "90px",
      selector: (row) => (
        <div className={`text-${css.get(row.status)} text-capitalize`}>
          {row.status}
        </div>
      ),
    },
    {
      name: "Shift Details",
      // minWidth: "15px",
      width: "85px",
      selector: (row) => (
        <div className="text-secondary min-100">
          <Link to={`/facility/jobprofile/${row.id}`}>Shift Details</Link>
        </div>
      ),
    },
    {
      name: "Edit Shift",
      allowOverflow: true,
      headerClassName: "one-head",
      width: "65px",
      cell: (row) => {
        return (
          <Fragment key={row.id}>
            <Button id={"a" + row.id} className="table-dot" type="button">
              <Options />
            </Button>
            <UncontrolledPopover
              id="table-option"
              placement="right"
              target={"a" + row.id}
              trigger="legacy"
            >
              <Link to={`/facility/jobprofile/${row.id}`}>Edit </Link>
              <Link
                onClick={() => {
                  setSelectedId(row.id);
                  setDeleteModal(!deleteModal);
                }}
              >
                Delete
              </Link>
            </UncontrolledPopover>
          </Fragment>
        );
      },
    },
  ];

  const getList = () => {
    setLoader(true);
    let JobStatusRefValue = "";
    jobStatus?.forEach((status) => {
      if (status?.label === JobStatusRef?.current?.select?.current?.innerText) {
        JobStatusRefValue = status?.value?.toLowerCase();
      }
    });

    const startDateRefValue =
      dayjs(DateRef?.current?.input?.value?.split("-")[0])
        ?.startOf("day")
        ?.unix() * 1000 || "";
    const endDateRefValue =
      dayjs(DateRef?.current?.input?.value?.split("-")[1])
        .startOf("day")
        .unix() * 1000 || "";

    jobStatus?.forEach((status) => {
      if (status?.label === JobStatusRef?.current?.select?.current?.innerText) {
        JobStatusRefValue = status?.value?.toLowerCase();
      }
    });

    const getJobObj = {
      facilityId: user?.facilityId?.id,
      ...filters,
      jobStatus: filters?.jobStatus || JobStatusRefValue || "",
      startDate: filters?.startDate || startDateRefValue || "",
      endDate: filters?.endDate || endDateRefValue || "",
    };

    if (!getJobObj?.startDate) {
      delete getJobObj.endDate;
    }

    api(GET_FACILITY_JOB_POST_URL, {}, null, {
      ...getJobObj,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setCount(res.data.count);
        let data = [...res.data.data];

        if (filters?.sortBy) {
          data = data?.sort((a, b) => {
            if (filters?.sortBy === "createdAt") {
              if (filters?.direction === "zToA") {
                return new Date(b?.createdAt) - new Date(a?.createdAt);
              } else {
                return new Date(a?.createdAt) - new Date(b?.createdAt);
              }
            } else if (filters?.sortBy === "totalPay") {
              if (filters?.direction === "zToA") {
                return Number(b?.totalPay) - Number(a?.totalPay);
              } else {
                return Number(a?.totalPay) - Number(b?.totalPay);
              }
            } else if (filters?.sortBy === "numberOfApplicants") {
              if (filters?.direction === "zToA") {
                return (
                  Number(b?.numberOfApplicants) - Number(a?.numberOfApplicants)
                );
              } else {
                return (
                  Number(a?.numberOfApplicants) - Number(b?.numberOfApplicants)
                );
              }
            } else if (filters?.sortBy === "serialNumber") {
              if (filters?.direction === "zToA") {
                return Number(b?.serialNumber) - Number(a?.serialNumber);
              } else {
                return Number(a?.serialNumber) - Number(b?.serialNumber);
              }
            } else if (filters?.sortBy === "jobAddressNickname") {
              if (filters?.direction === "zToA") {
                return (b?.jobAddressNickname || "").localeCompare(
                  a?.jobAddressNickname || ""
                );
              } else {
                return (a?.jobAddressNickname || "").localeCompare(
                  b?.jobAddressNickname || ""
                );
              }
            } else if (filters?.sortBy === "day1") {
              if (filters?.direction === "zToA") {
                return (
                  new Date(b?.jobSlots?.[0]?.startDate || b?.timeZone) -
                  new Date(a?.jobSlots?.[0]?.startDate || a?.timeZone)
                );
              } else {
                return (
                  new Date(a?.jobSlots?.[0]?.startDate || a?.timeZone) -
                  new Date(b?.jobSlots?.[0]?.startDate || b?.timeZone)
                );
              }
            } else if (filters?.sortBy === "day2") {
              const getProposedStartDate = (row) => {
                const proposedApplicant = row.applicants?.find(
                  (applicant) => applicant.isProposedNewTime === 1
                );
                return proposedApplicant
                  ? new Date(proposedApplicant.startDate)
                  : null;
              };

              const dateA = getProposedStartDate(a);
              const dateB = getProposedStartDate(b);

              if (filters?.direction === "zToA") {
                return (dateB || 0) - (dateA || 0); // Sort descending
              } else {
                return (dateA || 0) - (dateB || 0); // Sort ascending
              }
            } else if (filters?.sortBy === "applicationDetails") {
              if (filters?.direction === "zToA") {
                return (
                  b?.applicants?.[0]?.clinicianFirstName?.toLowerCase() || ""
                ).localeCompare(
                  a?.applicants?.[0]?.clinicianFirstName?.toLowerCase() || ""
                );
              } else {
                return (
                  a?.applicants?.[0]?.clinicianFirstName?.toLowerCase() || ""
                ).localeCompare(
                  b?.applicants?.[0]?.clinicianFirstName?.toLowerCase() || ""
                );
              }
            } else if (filters?.sortBy === "clinicianType") {
              if (filters?.direction === "zToA") {
                return (b?.clinicianType || "").localeCompare(
                  a?.clinicianType || ""
                );
              } else {
                return (a?.clinicianType || "").localeCompare(
                  b?.clinicianType || ""
                );
              }
            } else if (filters?.sortBy === "hourlyRate") {
              if (filters?.direction === "zToA") {
                return new Date(b?.hourlyRate) - new Date(a?.hourlyRate);
              } else {
                return new Date(a?.hourlyRate) - new Date(b?.hourlyRate);
              }
            }
          });
        }

        setList([...data]);
      }
      setLoader(false);
    });
  };

  const getListWOutLoader = () => {
    let JobStatusRefValue = "";
    jobStatus?.forEach((status) => {
      if (status?.label === JobStatusRef?.current?.select?.current?.innerText) {
        JobStatusRefValue = status?.value?.toLowerCase();
      }
    });

    const startDateRefValue =
      dayjs(DateRef?.current?.input?.value?.split("-")[0])
        ?.startOf("day")
        ?.unix() * 1000 || "";
    const endDateRefValue =
      dayjs(DateRef?.current?.input?.value?.split("-")[1])
        .startOf("day")
        .unix() * 1000 || "";

    jobStatus?.forEach((status) => {
      if (status?.label === JobStatusRef?.current?.select?.current?.innerText) {
        JobStatusRefValue = status?.value?.toLowerCase();
      }
    });

    const getJobObj = {
      facilityId: user?.facilityId?.id,
      ...filters,
      jobStatus: filters?.jobStatus || JobStatusRefValue || "",
      startDate: filters?.startDate || startDateRefValue || "",
      endDate: filters?.endDate || endDateRefValue || "",
    };

    if (!getJobObj?.startDate) {
      delete getJobObj.endDate;
    }

    api(GET_FACILITY_JOB_POST_URL, {}, null, {
      ...getJobObj,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setCount(res.data.count);
        let data = [...res.data.data];
        if (filters?.sortBy) {
          data = data?.sort((a, b) => {
            if (filters?.sortBy === "createdAt") {
              if (filters?.direction === "zToA") {
                return new Date(b?.createdAt) - new Date(a?.createdAt);
              } else {
                return new Date(a?.createdAt) - new Date(b?.createdAt);
              }
            } else if (filters?.sortBy === "totalPay") {
              if (filters?.direction === "zToA") {
                return Number(b?.totalPay) - Number(a?.totalPay);
              } else {
                return Number(a?.totalPay) - Number(b?.totalPay);
              }
            } else if (filters?.sortBy === "numberOfApplicants") {
              if (filters?.direction === "zToA") {
                return (
                  Number(b?.numberOfApplicants) - Number(a?.numberOfApplicants)
                );
              } else {
                return (
                  Number(a?.numberOfApplicants) - Number(b?.numberOfApplicants)
                );
              }
            }
          });
        }

        setList([...data]);
      }
    });
  };

  const deleteJob = () => {
    api(DELETE_FACILITY_JOB_URL, {
      facilityId: user?.facilityId?.id,
      id: selectedId,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setSelectedId(null);
        toggleDeleteModal();
        getList();
      }
    });
  };

  useEffect(() => {
    jobStatus.forEach((element) => {
      if (element?.value === filters?.jobStatus) {
        setSelectedStatus([element]);
      }
    });
  }, [filters?.jobStatus]);

  return (
    <Row>
      <Col sm="12">
        <div className="facility-payment-detail">
          <div className="header">
            <button
              className="pt-btn btn-primary pt-btn-small post-job-btn"
              onClick={toggleNewModal}
              // disabled={loader}
            >
              Post a new shift
            </button>
            {/* filter status is posted or all */}
            {massUpdateJobIds.length > 0 &&
              (filters?.jobStatus === "posted" ||
                filters?.jobStatus === "") && (
                <button
                  className="btn-secondary pt-btn pt-btn-small me-2 p-2"
                  onClick={() => setMassUpdateModal(true)}
                  disabled={!massUpdateJobIds.length}
                >
                  Update Hourly Rate
                </button>
              )}
            <div className="userfilter  d-none">
              <label htmlFor="filter">Filter</label>
              <div className="daterange-input">
                <DatePicker
                  ref={DateRef}
                  selectsRange={true}
                  startDate={date[0]}
                  endDate={date[1]}
                  onChange={(val) => handleDateChange(val)}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Start - End"
                />
                <div
                  onClick={() => {
                    if (date?.length > 0) handleDateChange();
                  }}
                >
                  {date?.length < 1 ? <TickCalender /> : <CloseIcon />}
                </div>
              </div>
            </div>

            <div className="user-sorting usertype ms-auto">
              <label htmlFor="jobStatus">Status</label>
              <div className="sort">
                <Select
                  placeholder={jobStatus[0]?.label}
                  onChange={(val) => {
                    setFilters({
                      ...filters,
                      skip: 0,
                      jobStatus:
                        val && val.length ? val[0]?.value?.toLowerCase() : "",
                    });
                  }}
                  options={jobStatus}
                  id="jobStatus"
                  ref={JobStatusRef}
                  values={selectedStatus}
                />
              </div>
            </div>
            <div className="user-sorting usertype filter">
              <div className="filter-btn">
                <span
                  className={`uparrow`}
                  onClick={() => {
                    setDate([]);
                    setFilters({
                      ...initFilters,
                    });
                  }}
                >
                  <img
                    src={FilterIcon}
                    className="img-fluid"
                    alt="filter icon"
                  />
                </span>
              </div>
            </div>
            {/* <div className="hourly me-0">
              <div className="hourly-select">
                <div className="user-sorting usertype">
                  <label htmlFor="type">Sort by</label>
                  <div className="sort">
                    <Select
                      placeholder={jobListingsSortBy[0]?.label}
                      onChange={(val) => {
                        setFilters({
                          ...filters,
                          skip: 0,
                          limit: APP_LIMIT,
                          sortBy: val && val.length ? val[0].value : "",
                        });
                      }}
                      options={jobListingsSortBy}
                      id="type"
                    />
                  </div>
                </div>
              </div>
              {filters?.sortBy && (
                <div className="hourly-btn">
                  <span
                    className={`uparrow ${
                      (filters.direction === "aToZ" || !filters?.direction) &&
                      "active"
                    }`}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        direction: filters.direction !== "aToZ" ? "aToZ" : "",
                      })
                    }>
                    <DownArrow />
                  </span>
                  <span
                    className={`down ${
                      filters.direction === "zToA" && "active"
                    }`}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        direction: filters.direction !== "zToA" ? "zToA" : "",
                      })
                    }>
                    <DownArrow />
                  </span>
                </div>
              )}
            </div> */}
          </div>

          <DataTable
            columns={columns}
            data={list}
            progressPending={loader}
            progressComponent={
              <div className="h100px">
                <Spinner color="primary" />
              </div>
            }
            onSort={(sortField, sortDirection) =>
              handleSort(sortField, sortDirection)
            }
            sortIcon={<SortIcon />}
          />
          <CustomPagination
            count={count}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <DeleteAJobModal
          modal={deleteModal}
          toggle={toggleDeleteModal}
          deleteCallback={deleteJob}
        />

        <PostAJobModal
          resetList={() => setFilters({ ...initFilters })}
          facilityId={user?.facilityId?.id}
          modal={newModal}
          toggle={toggleNewModal}
          data={list}
          facilityInfo={user?.facilityId}
        />
        <FacilityMassHourlyRateUpdateModal
          modal={massUpdateModal}
          jobIds={massUpdateJobIds}
          toggle={() => {
            setMassUpdateModal(false);
            setMassUpdateJobIds([]);
          }}
          setList={setList}
        />
      </Col>
    </Row>
  );
}

export default JobListing;
