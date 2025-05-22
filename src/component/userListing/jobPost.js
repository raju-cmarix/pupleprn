import { api } from "api/Api";
import { ReactComponent as SearchIcon } from "assets/images/icons/search-icon.svg";
import { DownArrow, Options, Pencil } from "assets/svg";
import AddressLabel from "component/common/AddressLabel";
import DatesLabel from "component/common/DatesLabel";
import FormButton from "component/common/FormButton";
import TimeLabel from "component/common/TimeLabel";
import CancelJobPOstModal from "component/modals/CancelJobPOstModal";
import DeleteAJobModal from "component/modals/DeleteAJobModal";
import EditAdminHourlyRateModal from "component/modals/EditAdminHourlyRateModal";
import EditHourlyRateModal from "component/modals/EditHourlyRateModal";
import MakeJobPostedModal from "component/modals/MakeJobPostedModal";
import "component/userListing/userListing.scss";
import {
  DELETE_FACILITY_JOB_URL,
  GET_ALL_JOB_POST_URL,
} from "constants/ApiUrls";
import {
  APP_LIMIT,
  CURSORPOINTER,
  DEFAULT_TIMEZONE,
  FacilityJobPostSortOptions,
  RESPONSE_OK,
  SPACE_KEY,
} from "constants/AppConstants";
import { capitalize } from "radash";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import Select from "react-dropdown-select";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Spinner,
  UncontrolledPopover,
  UncontrolledTooltip,
} from "reactstrap";
import UserContext from "utils/context/UserContext";
import {
  getAdminDateFormat,
  getDateFormat,
  getLabelDate,
  makeId,
} from "utils/Utils";
import { ReactComponent as SortIcon } from "../../assets/images/icons/arrows-up.svg";
import {
  defaultMetroAreaFilters,
  jobPostStatus,
} from "../../views/authentication/signUpClinician/HourlyConstant";
import CustomPagination from "../common/customPagination";
import AdminApplicantCell from "./AdminApplicantCell";
import "./userListing.scss";
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timer = useRef(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, [value, delay]);

  return debouncedValue;
};

function Sort({ sortObject }) {
  const [column, setColumn] = useState("");

  let id = useMemo(() => makeId(10), []);

  useEffect(() => {
    let el = document.getElementById(`header-name-${id}`);
    let parent = el.parentNode?.parentNode;
    setColumn(parent?.dataset?.columnId || "");
  }, []);

  const getColumnName = () => {
    return sortObject?.[column]?.toUpperCase() || "";
  };
  return (
    <>
      <span
        id={`header-name-${id}`}
        className="assddsds">
        <SortIcon />
      </span>
      {getColumnName() && (
        <UncontrolledTooltip
          placement="top"
          target={`header-name-${id}`}>
          {getColumnName()}
        </UncontrolledTooltip>
      )}
    </>
  );
}

function JobPost() {
  const initFilters = {
    skip: 0,
    limit: APP_LIMIT,
    status: "posted",
    shiftTime: "desc",
  };

  const [list, setList] = useState([]);
  const [search, setSearch] = useState();
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({ ...initFilters });
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [cancelJob, setCancelJob] = useState(false);
  const [cancelJobID, setCancelJobID] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const csvLinkEl = useRef(null);
  const [exportData, setExportData] = useState([]);
  const role = localStorage.getItem("userRole");
  const debouncedSearchTerm = useDebounce(search, 1000);
  const [editHourlyRateModal, setEditHourlyRateModal] = useState(false);
  const [editAdminHourlyRateModal, setEditAdminHourlyRateModal] =
    useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [makeItPostedModal, setMakeItPostedModal] = useState(false);
  const [metroAreaFilters, setMetroAreaFilters] = useState(
    defaultMetroAreaFilters,
  );
  const isSubadmin = user?.roles === 'subadmin';
  const css = new Map();
  css.set("expired", "danger");
  css.set("deleted", "danger");
  css.set("completed", "secondary");
  css.set("posted", "primary");
  css.set("confirmed", "secondary");
  css.set("cancelled", "gray");

  const toggleCancelJob = () => {
    setCancelJob(!cancelJob);
  };
  const handleChange = (val) => {
    setSearch(val.target.value);
  };

  const handleSort = (field, direction) => {
    if (field?.name === "Facility Name") {
      setFilters((prev) => {
        let facilityName = "desc";
        if (prev?.facilityName) {
          facilityName = prev?.facilityName === "desc" ? "asc" : "desc";
        }
        return {
          ...prev,
          facilityName: facilityName,
        };
      });
    }

    if (field?.name === "Day & Time (Original)") {
      setFilters((prev) => {
        let shiftTime = "desc";
        if (prev?.shiftTime) {
          shiftTime = prev?.shiftTime === "desc" ? "asc" : "desc";
        }

        return {
          ...prev,
          shiftTime: shiftTime,
        };
      });
    }

    if (field?.name === "State") {
      setFilters((prev) => {
        let state = "desc";
        if (prev?.state) {
          state = prev?.state === "desc" ? "asc" : "desc";
        }
        return {
          ...prev,
          state: state,
        };
      });
    }
    // const newSortOrder =
    //   filters.sort === "DESC" ? "ASC" : filters.sort === "ASC" ? "DESC" : "ASC";
    // setFilters({ ...filters, sort: newSortOrder });
  };

  const columns = [
    {
      id: "job_id",
      name: "Shift ID",
      width: "60px",
      selector: (row) => (
        <div className="min-100">
          <Link
            to={`/admin/jobdetail/${row.id}`}
            target="_blank">
            {row.serialNumber || "-"}
          </Link>
        </div>
      ),
    },
    {
      id: "Date_posted",
      name: "Date",
      width: "65px",
      selector: (row) => getAdminDateFormat(row.createdAt),
    },
    {
      id: "jobMetroAreaName",
      name: "Metro Area",
      width: "70px",
      selector: (row) => (
        <>{row.jobMetroAreaName ? capitalize(row.jobMetroAreaName) : "-"}</>
      ),
    },
    {
      id: "location",
      name: "Location",
      width: "85px",
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
    },
    {
      id: "state",
      name: "State",
      width: "75px",
      sortable: true,
      selector: (row) => <>{row.state || "-"}</>,
    },
    {
      id: "zipCode",
      name: "Zip Code",
      width: "64px",
      selector: (row) => <>{row.zipCode || "-"}</>,
    },
    {
      id: "facilityName",
      name: "Facility Name",
      width: "135px",
      sortable: true,
      selector: (row) => (
        <>
          <Link
            to={`/admin/facilitydetails/${row?.facilityId}`}
            className="emailcapture-msg text-decoration-none"
            id={"facility-" + row.id}
            target="_blank">
            {row.officeName}
          </Link>
          <UncontrolledTooltip
            placement="right"
            target={"facility-" + row.id}>
            {row.email || row.officeName}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      id: "shiftTime",
      name: "Day & Time (Original)",
      width: "130px",
      sortable: true,
      selector: (row) => (
        <DatesLabel
          arr={row.jobSlots}
          timeZone={row.timeZone ?? DEFAULT_TIMEZONE}
        />
      ),
    },
    {
      id: "proposedTime",
      name: "Day & Time (Proposed)",
      width: "125px",
      selector: (row) => {
        if (row.applicants && row.applicants.length > 0) {
          const proposedTimes = row.applicants.map((applicant, index) => {
            if (applicant.isProposedNewTime === 1) {
              return (
                <div
                  key={applicant.id}
                  style={{ marginTop: index !== 0 ? "12px" : "0px" }}>
                  <TimeLabel
                    key={applicant.id}
                    arr={[applicant]}
                    timeZone={row.timeZone ?? DEFAULT_TIMEZONE}
                  />
                </div>
              );
            }
            return (
              <div
                style={{
                  color: "#01a796",
                  marginTop: index !== 0 ? "15px" : "0px",
                }}>
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
    },
    {
      id: "hour_rate",
      name: "Hourly Rate",
      width: "78px",
      selector: (row) => (
        <div className="text-primary text-decoration-none ">
          ${row.hourlyRate}
          {!isSubadmin && (<Link
            className="pencil-icon"
            onClick={() => {
              setSelectedRow({ ...row });
              setEditHourlyRateModal(!editHourlyRateModal);
            }}>
            <Pencil />
          </Link>)}
        </div>
      ),
    },
    {
      name: "Admin Hourly Rate",
      width: "83px",
      selector: (row) => (
        <div
          className={`${
            row.adminHourlyRate > row.hourlyRate
              ? "text-secondary"
              : "text-primary"
          } text-decoration-none`}>
          {row?.adminHourlyRate === null
            ? `\$${row.hourlyRate}`
            : `\$${row?.adminHourlyRate}`}
         {!isSubadmin && (<Link
            className="pencil-icon"
            onClick={() => {
              setSelectedRow({ ...row });
              setEditAdminHourlyRateModal(!editAdminHourlyRateModal);
            }}>
            <Pencil
              fillColor={`${
                row.adminHourlyRate > row.hourlyRate ? "#01a796" : ""
              }`}
            />
          </Link>)}
        </div>
      ),
    },
    {
      id: "clinicianType",
      name: "",
      width: "54px",
      selector: (row) => <>{row.clinicianType?.toUpperCase() || "-"}</>,
    },
    {
      id: "name_application",
      name: "Name of Applicants",
      width: "170px",
      cell: (row) => (
        <AdminApplicantCell
          row={row}
          getList={getList}
        />
      ),
    },
    {
      id: "action",
      name: "",
      width: "30px",
      selector: (row) => (
        <div>
          {!isSubadmin && row?.status === "posted" && (
            <>
              <Button
                id={"id-" + row?.id}
                className="table-dot"
                type="button">
                <Options />
              </Button>
              {/* <UncontrolledPopover
                id="table-option"
                placement="bottom"
                target={"id-" + row?.id}
                trigger="legacy"
                className="adminconfirmshiftoptions">
                <p
                  onClick={() => {
                    toggleCancelJob();
                    setCancelJobID(row?.id);
                  }}
                  style={CURSORPOINTER}>
                  Cancel Shift
                </p>
              </UncontrolledPopover> */}
              <UncontrolledPopover
                id="table-option"
                placement="bottom"
                target={"id-" + row?.id}
                trigger="legacy"
                className="adminconfirmshiftoptions">
                <p
                  onClick={() => {
                    setSelectedRow(row);
                    setDeleteModal(true);
                  }}
                  style={CURSORPOINTER}>
                  Delete Shift
                </p>
              </UncontrolledPopover>
            </>
          )}
          {(row?.status === "deleted" || row?.status === "cancelled") && (
            <>
              <Button
                id={"id-" + row?.id}
                className="table-dot"
                type="button">
                <Options />
              </Button>
              <UncontrolledPopover
                id="table-option"
                placement="bottom"
                target={"id-" + row?.id}
                trigger="legacy"
                className="adminconfirmshiftoptions">
                <p
                  onClick={() => {
                    setMakeItPostedModal(true);
                    setSelectedRow(row);
                  }}
                  style={CURSORPOINTER}>
                  Make It Posted
                </p>
              </UncontrolledPopover>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (user?.id)
      if (initialLoad) {
        setInitialLoad(false);
        return;
      }
    getList();
  }, [filters]);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      setFilters({
        ...filters,
        skip: 0,
        search: debouncedSearchTerm,
      });
    } else if (debouncedSearchTerm === "") {
      setFilters({
        ...filters,
        skip: 0,
        search: "",
      });
    }
  }, [debouncedSearchTerm]);

  const getList = (withLoader = true) => {
    withLoader && setLoader(true); // refresh the data without showing loader

    api(GET_ALL_JOB_POST_URL, {}, null, {
      ...filters,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setCount(res.data.count);
        let data = [...res.data.data];

        if (filters?.sortBy) {
          data = data?.sort((a, b) => {
            if (filters?.sortBy === "totalPay") {
              if (filters?.direction === "zToA") {
                return Number(b?.totalPay) - Number(a?.totalPay);
              } else {
                return Number(a?.totalPay) - Number(b?.totalPay);
              }
            } else if (filters?.sortBy === "createdAt") {
              if (filters?.direction === "zToA") {
                return new Date(b?.createdAt) - new Date(a?.createdAt);
              } else {
                return new Date(a?.createdAt) - new Date(b?.createdAt);
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

        // Create metro area filter options
        if (res?.data?.metroAreas?.length) {
          const filterOptions = res?.data?.metroAreas.map((ma) => ({
            label: capitalize(ma.metroAreaName),
            value: ma.metroAreaName,
          }));

          setMetroAreaFilters([...defaultMetroAreaFilters, ...filterOptions]);
        }
      }
      withLoader && setLoader(false);
    });
  };

  const handleExport = async () => {
    try {
      setIsExport(true);
      const { limit, ...filtersWithoutLimit } = filters;
      const response = await api(GET_ALL_JOB_POST_URL, {}, null, {
        ...filtersWithoutLimit,
        limit: Number.MAX_SAFE_INTEGER,
      });

      if (response.status === RESPONSE_OK) {
        let data = [...response.data.data]; // Keep the original data declaration

        if (filters?.sortBy) {
          data = data?.sort((a, b) => {
            // if (filters?.sortBy === "totalPay") {
            //   return filters?.direction === "zToA"
            //     ? Number(b?.totalPay) - Number(a?.totalPay)
            //     : Number(a?.totalPay) - Number(b?.totalPay);
            // } else
            if (filters?.sortBy === "createdAt") {
              return filters?.direction === "zToA"
                ? new Date(b?.createdAt) - new Date(a?.createdAt)
                : new Date(a?.createdAt) - new Date(b?.createdAt);
            } else if (filters?.sortBy === "numberOfApplicants") {
              return filters?.direction === "zToA"
                ? Number(b?.numberOfApplicants) - Number(a?.numberOfApplicants)
                : Number(a?.numberOfApplicants) - Number(b?.numberOfApplicants);
            }
          });
        }

        // setExportData(
        //   data.map((d) => {
        //     const acceptedApplicants = d?.applicants
        //       ?.filter((a) => a?.status === 'accepted')
        //       ?.map((a) => `${a?.clinicianFirstName || ''} ${a?.clinicianLastName || ''}`)
        //       .join(', ');

        //     const nonAcceptedApplicants = d?.applicants
        //       ?.filter((a) => a?.status !== 'accepted')
        //       ?.map((a) => `${a?.clinicianFirstName || ''} ${a?.clinicianLastName || ''}`)
        //       .join(', ');

        //     const formattedApplicants = acceptedApplicants
        //       ? `(${acceptedApplicants})${nonAcceptedApplicants ? ', ' + nonAcceptedApplicants : ''}`
        //       : nonAcceptedApplicants || '';

        //     return {
        //       ...d,
        //       totalPay: `$${d.totalPay}`,
        //       hourlyRate: `$${d.hourlyRate}`,
        //       shiftTime: getLabelDate(d.jobSlots),
        //       datePosted: getDateFormat(d?.createdAt),
        //       applicants: formattedApplicants || '-',
        //     };
        //   })
        // );
        setExportData(
          data.map((d) => {
            const acceptedApplicants = d?.applicants
              ?.filter((a) => a?.status === "accepted")
              ?.map(
                (a) =>
                  `${a?.clinicianFirstName || ""} ${
                    a?.clinicianLastName || ""
                  }`,
              )
              .join(", ");

              const getTotalWorkedHours = d?.applicants
              ?.filter((a) => a?.status === "accepted")
              ?.map((a) => a.totalWorkedHour);

            const nonAcceptedApplicants = d?.applicants
              ?.filter((a) => a?.status !== "accepted")
              ?.map(
                (a) =>
                  `${a?.clinicianFirstName || ""} ${
                    a?.clinicianLastName || ""
                  }`,
              )
              .join(", ");

            let formattedApplicants = "";

            if (acceptedApplicants) {
              if (nonAcceptedApplicants) {
                formattedApplicants = `(${acceptedApplicants})${
                  nonAcceptedApplicants ? ", " + nonAcceptedApplicants : ""
                }`;
              } else {
                formattedApplicants = acceptedApplicants;
              }
            } else {
              formattedApplicants = nonAcceptedApplicants || "-";
            }

            return {
              ...d,
              location: d.jobAddressNickname || "",
              hourlyRate: `$${d.hourlyRate}`,
              adminHourlyRate: d.adminHourlyRate
                ? `$${d.adminHourlyRate}`
                : "-",
              totalWorkedHours:d?.applicants.length > 0 ? getTotalWorkedHours[0] : "-",
              shiftTime: getLabelDate(d.jobSlots, null, d.timeZone),
              datePosted: getDateFormat(d?.createdAt),
              applicants: formattedApplicants, // Final output based on the conditions
              clinicianType: d?.clinicianType?.toUpperCase() || "",
              zipCode: d?.zipCode,
            };
          }),
        );

        if (csvLinkEl.current) {
          csvLinkEl.current.link.click(); // Trigger CSV export
        }
      }

      setIsExport(false);
    } catch (error) {
      console.error(error);
      setIsExport(false);
    }
  };

  const handleJobCanceled = () => {
    toggleCancelJob();
    setFilters({ ...filters });
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
    getList(false);
  };

  const deleteJob = () => {
    api(DELETE_FACILITY_JOB_URL, {
      id: selectedRow?.id,
      facilityId: selectedRow?.facilityId,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setSelectedRow({});
        toggleDeleteModal();
        getList(false);
      }
    });
  };

  const exportHeaderForJobPost = [
    { label: "Shift ID", key: "serialNumber" },
    { label: "Date Posted", key: "datePosted" },
    { label: "Facility ID", key: "faciltySerialNumber" },
    { label: "Facility Name", key: "officeName" },
    { label: "Location", key: "location" },
    { label: "Zip Code", key: "zipCode" },
    { label: "Shift Time", key: "shiftTime" },
    { label: "Status", key: "status" },
    { label: "Hourly Rate", key: "hourlyRate" },
    { label: "Boosted Hourly Rate", key: "adminHourlyRate" },
    { label: "Final Worked Hours", key: "totalWorkedHours" },
    { label: "Email", key: "email" },
    { label: "Number Of Applicants", key: "numberOfApplicants" },
    { label: "Applicants", key: "applicants" },
    { label: "Clinician Type", key: "clinicianType" },
  ];

  return (
    <>
      <Helmet>
        <title>Purple PRN - Job Posts</title>
      </Helmet>
      <div className="facility-payment-detail user-listing confirm-shift-table  jobpost">
        <div className="custom-container">
          <h1>Job Posts</h1>
          <div className="header">
            <div className="user-sorting usertype">
              <label htmlFor="type">Status</label>
              <div className="sort dropdown-limited-width">
                <Select
                  placeholder={jobPostStatus[2]?.label}
                  onChange={(val) => {
                    setFilters((prev) => ({
                      ...prev,
                      status: val && val.length ? val[0]?.value : "",
                    }));
                  }}
                  options={jobPostStatus}
                  id="type"
                />
              </div>
            </div>
            <div className="user-sorting usertype">
              <label htmlFor="search">Search</label>
              <div className="search">
                <SearchIcon />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by facility name"
                  style={{ width: "190px" }}
                  onChange={(val) => {
                    handleChange(val);
                  }}
                  onKeyDown={(e) => {
                    if (e.code === SPACE_KEY) {
                      e?.preventDefault();
                    }
                  }}
                  value={search}
                  onWheel={(e) => e?.target?.blur()}
                />
              </div>
            </div>
            {metroAreaFilters.length > 1 && (
              <div className="user-sorting usertype">
                <label htmlFor="type">Metro Areas</label>
                <div className="sort dropdown-limited-width">
                  <Select
                    placeholder={metroAreaFilters[0]?.label}
                    onChange={(val) => {
                      setFilters((prev) => ({
                        ...prev,
                        metroAreaName: val && val.length ? val[0]?.value : "",
                      }));
                    }}
                    options={metroAreaFilters}
                    id="metroAreaFilters"
                  />
                </div>
              </div>
            )}
            <div className="user-sorting usertype ms-md-auto me-0">
              <label htmlFor="hourlySelect">Sort by</label>
              <div className="sort dropdown-limited-width">
                <Select
                  onChange={(data) =>
                    setFilters({
                      ...filters,
                      sortBy: data?.[0]?.value,
                      direction: filters?.direction || "aToZ",
                    })
                  }
                  options={FacilityJobPostSortOptions}
                  placeholder={[FacilityJobPostSortOptions[0]?.label]}
                  id="type"
                />
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

              {user.roles === "admin" && (
                <div className="ms-2">
                  <FormButton
                    className="pt-btn btn-primary pt-btn-small"
                    type={"button"}
                    label={"Export"}
                    disabled={isExport}
                    onClick={handleExport}
                  />
                  <CSVLink
                    headers={exportHeaderForJobPost}
                    data={exportData}
                    filename="job_post_data"
                    className="text-decoration-none "
                    ref={csvLinkEl}
                  />
                </div>
              )}
            </div>
          </div>
          <EditHourlyRateModal
            modal={editHourlyRateModal}
            data={selectedRow}
            toggle={() => setEditHourlyRateModal(!editHourlyRateModal)}
            getList={getList}
          />

          <MakeJobPostedModal
            modal={makeItPostedModal}
            data={selectedRow}
            toggle={() => {
              setMakeItPostedModal(false);
              setSelectedRow({});
            }}
            getList={getList}
          />
          <EditAdminHourlyRateModal
            modal={editAdminHourlyRateModal}
            data={selectedRow}
            jobId={selectedRow.id}
            toggle={() =>
              setEditAdminHourlyRateModal(!editAdminHourlyRateModal)
            }
            getList={getList}
          />
          <DataTable
            className="d-flex justify-between rounded-5"
            columns={columns}
            data={list}
            progressPending={loader}
            progressComponent={
              <div className="h100px">
                <Spinner color="primary" />
              </div>
            }
            sortServer={false}
            onSort={(column, sortDirection) =>
              handleSort(column, sortDirection)
            }
            sortIcon={<Sort sortObject={filters} />}
          />
          <CustomPagination
            count={count}
            filters={filters}
            setFilters={setFilters}
          />
          <DeleteAJobModal
            modal={deleteModal}
            toggle={toggleDeleteModal}
            deleteCallback={deleteJob}
          />
          <CancelJobPOstModal
            modal={cancelJob}
            toggle={toggleCancelJob}
            id={cancelJobID}
            onDone={handleJobCanceled}
          />
        </div>
      </div>
    </>
  );
}

export default JobPost;
