import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { USER_LIST_URL } from "constants/ApiUrls";
import { APP_LIMIT, RESPONSE_OK, SPACE_KEY } from "constants/AppConstants";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import Select from "react-dropdown-select";
import { Input, Spinner } from "reactstrap";
import { convertServerDateToDate, getDateFormat } from "utils/Utils";
import {
  adminStatus,
  statusVerify,
} from "views/authentication/signUpClinician/HourlyConstant";
import { ReactComponent as SortIcon } from "../../assets/images/icons/arrows-up.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/icons/close.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/icons/search-icon.svg";
import { TickCalender } from "../../assets/svg";
import Dropdown from "../common/CheckboxDropdown";
import CustomPagination from "../common/customPagination";

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

export default function EmailCaptureListing({
  list,
  columns,
  loader,
  filters,
  setFilters,
  currentFilterName,
  count,
}) {
  const [search, setSearch] = useState();
  const [date, setDate] = useState();
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [isExport, setIsExport] = useState(true);
  const [prevFilters, setPrevFilters] = useState([filters.tabName]);
  const csvLinkEl = useRef(null);
  const role = localStorage.getItem("userRole");
  const debouncedSearchTerm = useDebounce(search, 1000);

  const handleDateChange = (val) => {
    setDate(val);
    if (val) {
      setFilters({
        ...filters,
        skip: 0,
        startDate: dayjs(val).startOf("day").unix() * 1000,
        endDate: dayjs(val).endOf("day").unix() * 1000,
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

  const handleExport = async () => {
    try {
      setIsExport(false);
      const { limit, ...filtersWithoutLimit } = filters;
      const response = await api(USER_LIST_URL, {}, null, {
        ...filtersWithoutLimit,
      });

      if (response.status === RESPONSE_OK) {
        setIsExport(true);
        let filteredData = response.data.data;
        //Remove 'deactivate' users when status is 'incomplete'
        if (filters.status === "incomplete") {
          filteredData = filteredData.filter(user => user.status !== "deactivate");
        }
        const tempArray = [...filteredData];
        let excelArrayData = [];
        if (filters.tabName === "facility") {
          for (let i = 0; i < tempArray.length; i++) {
            const el = tempArray[i];
            const primaryAddress = el?.facilityId?.addresses?.[0];
            const obj = {
              display_number: el.facilityId?.serialNumber?.toUpperCase(),
              Name: el.facilityId?.officeName,
              FirstName: el.firstName,
              LastName: el.lastName,
              fullAddress: !el.homeAddress1
                ? `${el.homeAddressZipCode}`
                : `${el.homeAddress1 ? `${el.homeAddress1}, ` : ""}${
                    el.homeAddress2 ? `${el.homeAddress2}, ` : ""
                  }${el.homeAddressCity || ""}${el.homeAddressState || ""}${
                    el.homeAddressZipCode ? `${el.homeAddressZipCode}, ` : ""
                  }`,
              CPRdate:
                el.clinicianId?.cprExpiryDate &&
                el.clinicianId?.cprExpiryDate !== "NaN"
                  ? getDateFormat(el.clinicianId?.cprExpiryDate, "MM/YYYY")
                  : "-",
              npi: el.clinicianId?.npiNumber || "-",
              aboutMe: el.clinicianId?.aboutMe,
              languagesSpoken: el.clinicianId?.knownLanuages,
              patientExpDay: (
                el.clinicianId?.patientExperience.map((exp) => exp.day) || []
              ).join(", "),
              patientExpTime: (
                el.clinicianId?.patientExperience.map((exp) => exp.startTime) ||
                []
              ).join(", "),
              facilityExpDay: (
                el.clinicianId?.facilityExperience.map((exp) => exp.day) || []
              ).join(", "),
              facilityExpTime: (
                el.clinicianId?.facilityExperience.map(
                  (exp) => exp.startTime,
                ) || []
              ).join(", "),
              emrList: el?.facilityId?.emrList,
              facilityAddress: [
                primaryAddress?.address1,
                primaryAddress?.address2,
                primaryAddress?.city,
                // primaryAddress?.zipCode,
                // primaryAddress?.state,
              ]
                .filter(Boolean)
                .join(", "),
              facilityAddressNickname: primaryAddress?.nickname || "",
              homeAddress: `${el.clinicianId?.homeAddress1 || ""} ${
                el.clinicianId?.homeAddress2 || ""
              }`,
              homeCity: el.clinicianId?.homeAddressCity,
              homeState: el.clinicianId?.homeAddressState,
              facilityAddressCity: primaryAddress?.city,
              facilityAddressState: primaryAddress?.state,
              ZipCode: el.zipCode,
              facilityAddressZipCode: primaryAddress?.zipCode,
              joined_Date: getDateFormat(el.createdAt),
              lastSignInTime: el?.lastSignInTime
                ? getDateFormat(el.lastSignInTime)
                : "",
              phone: el.phone,
              totalReviews: el.totalReviews,
              isoCode: el.isoCode,
              email: el.email,
              role: el.roles,
              dateOfBirth: getDateFormat(el.facilityId?.dateOfBirth),
              shifts: el.numberOfShifts,
              rating: `${el.averageRating}/5`,
              status: el.facilityId?.isSignupCompleted
                ? el.status
                : "Incomplete",
              isApprovedByAdmin:
                el.isApprovedByAdmin === 1 ? "Approved" : "Not Approved",
              totalReviews: el.totalReviews,
              terms: el.isTermAccept === 1 ? "Accepted" : "Not Accepted",
              Activate_Deactivate: el.facilityId?.isSignupCompleted
                ? el.status === "deactivate"
                  ? "Deactivate"
                  : "Activate"
                : "",
            };
            excelArrayData.push(obj);
            // If there multiple locations of the same facility, repeat the rows with different addres
            // Starting the loop from 1 because first address is primary which is taken in account in upper obj
            if (
              el?.facilityId?.addresses &&
              el?.facilityId?.addresses.length > 1
            ) {
              for (let j = 1; j < el?.facilityId?.addresses?.length; j++) {
                const elm = el?.facilityId?.addresses[j];
                const newAdd = {
                  facilityAddress: [
                    elm?.address1,
                    elm?.address2,
                    elm?.city,
                    // elm?.zipCode,
                    // elm?.state,
                  ]
                    .filter(Boolean)
                    .join(", "),
                  facilityAddressCity: elm?.city,
                  // facilityAddressState: elm?.state,
                  // facilityAddressZipCode: elm?.zipCode,
                  facilityAddressNickname: elm?.nickname,
                };
                excelArrayData.push({ ...obj, ...newAdd });
              }
            }
          }
        } else {
          for (let i = 0; i < tempArray.length; i++) {
            let obj = {
              display_number:
                tempArray[i].clinicianId?.serialNumber?.toUpperCase(),
              FirstName: tempArray[i].firstName,
              LastName: tempArray[i].lastName,
              fullAddress: !tempArray[i].clinicianId?.homeAddress1
                ? `""`
                : `${
                    tempArray[i].clinicianId?.homeAddress1
                      ? `${tempArray[i].clinicianId.homeAddress1}, `
                      : ""
                  }${
                    tempArray[i].clinicianId?.homeAddress2
                      ? `${tempArray[i].clinicianId.homeAddress2}, `
                      : ""
                  }${
                    tempArray[i].clinicianId?.homeAddressCity
                      ? `${tempArray[i].clinicianId.homeAddressCity}`
                      : ""
                  }`,
              CPRdate:
                tempArray[i].clinicianId?.cprExpiryDate &&
                tempArray[i].clinicianId?.cprExpiryDate !== "NaN"
                  ? getDateFormat(
                      tempArray[i].clinicianId?.cprExpiryDate,
                      "MM/YYYY",
                    )
                  : "-",
              npi: tempArray[i].clinicianId?.npiNumber || "-",
              aboutMe: tempArray[i]?.clinicianId?.aboutMe
                ? tempArray[i]?.clinicianId?.aboutMe?.replace(/"/g, '""')
                : "-",
              languagesSpoken: tempArray[i].clinicianId?.knownLanuages,
              homeAddress: `${tempArray[i].clinicianId?.homeAddress1 || ""} ${
                tempArray[i].clinicianId?.homeAddress2 || ""
              }`,
              homeCity: tempArray[i].clinicianId?.homeAddressCity,
              homeState: tempArray[i].clinicianId?.homeAddressState,
              ZipCode: tempArray[i].zipCode,
              joined_Date: getDateFormat(tempArray[i].createdAt),
              lastSignInTime: tempArray[i].lastSignInTime
                ? getDateFormat(tempArray[i].lastSignInTime)
                : "",
              phone: tempArray[i].phone,
              totalReviews: tempArray[i].totalReviews,
              isoCode: tempArray[i].isoCode,
              zipCode: tempArray[i].clinicianId?.homeAddressZipCode,
              email: tempArray[i].email,
              role: tempArray[i].roles,
              dateOfBirth: getDateFormat(tempArray[i].clinicianId?.dateOfBirth),
              shifts: tempArray[i].numberOfShifts,
              rating: `${tempArray[i].averageRating}/5`,
              status: tempArray[i].clinicianId?.isSignupCompleted
                ? tempArray[i].status
                : "Incomplete",
              isApprovedByAdmin:
                tempArray[i].isApprovedByAdmin === 1
                  ? "Approved"
                  : "Not Approved",
              terms:
                tempArray[i].isTermAccept === 1 ? "Accepted" : "Not Accepted",
              termAcceptedDateTime: tempArray[i].clinicianId.agreementDateTime,
              Activate_Deactivate: tempArray[i].clinicianId?.isSignupCompleted
                ? tempArray[i].status === "deactivate"
                  ? "Deactivate"
                  : "Activate"
                : "",
              patientExpDay:
                tempArray[i]?.clinicianId?.patientExperience?.length > 0
                  ? tempArray[i]?.clinicianId?.patientExperience?.[0]?.day || ""
                  : "",
              patientExpTime:
                tempArray[i]?.clinicianId?.patientExperience?.length > 0
                  ? tempArray[i]?.clinicianId?.patientExperience?.[0]
                      ?.startTime || ""
                  : "",
              facilityExpDay:
                tempArray[i]?.clinicianId?.facilityExperience?.length > 0
                  ? tempArray[i]?.clinicianId?.facilityExperience?.[0]?.day ||
                    ""
                  : "",
              facilityExpTime:
                tempArray[i]?.clinicianId?.facilityExperience?.length > 0
                  ? tempArray[i]?.clinicianId?.facilityExperience?.[0]
                      ?.startTime || ""
                  : "",
              licenseNumber:
                tempArray[i]?.clinicianId?.licenseDetails?.length > 0
                  ? tempArray[i]?.clinicianId?.licenseDetails?.[0]
                      ?.licenseNumber
                  : "",
              licenseExpDate:
                tempArray[i]?.clinicianId?.licenseDetails?.length > 0
                  ? convertServerDateToDate(
                      tempArray[i]?.clinicianId?.licenseDetails?.[0]
                        ?.licenseExpDate,
                    )
                    ? getDateFormat(
                        convertServerDateToDate(
                          tempArray[i]?.clinicianId?.licenseDetails?.[0]
                            ?.licenseExpDate,
                        ),
                      )
                    : ""
                  : "",
            };
            excelArrayData.push(obj);
            if (
              tempArray[i]?.clinicianId?.patientExperience?.length > 0 ||
              tempArray[i]?.clinicianId?.facilityExperience?.length > 0 ||
              tempArray[i]?.clinicianId?.licenseDetails?.length > 0
            ) {
              let length = Math.max(
                tempArray[i]?.clinicianId?.patientExperience?.length || 0,
                tempArray[i]?.clinicianId?.facilityExperience?.length || 0,
                tempArray[i]?.clinicianId?.licenseDetails?.length || 0,
              );
              for (let j = 1; j < length; j++) {
                let innerObj = {
                  display_number: "",
                  FirstName: "",
                  LastName: "",
                  fullAddress: ``,
                  CPRdate: "",
                  npi: "",
                  aboutMe: "",
                  languagesSpoken: "",
                  homeAddress: ``,
                  homeState: "",
                  ZipCode: "",
                  joined_Date: "",
                  lastSignInTime: "",
                  phone: "",
                  // totalReviews: "",
                  isoCode: "",
                  zipCode: "",
                  email: "",
                  role: "",
                  dateOfBirth: "",
                  shifts: "",
                  // rating: ``,
                  status: "",
                  isApprovedByAdmin: "",
                  terms: "",
                  Activate_Deactivate: "",
                  patientExpDay:
                    tempArray[i]?.clinicianId?.patientExperience?.[j]?.day ||
                    "",
                  patientExpTime:
                    tempArray[i]?.clinicianId?.patientExperience?.[j]
                      ?.startTime || "",
                  facilityExpDay:
                    tempArray[i]?.clinicianId?.facilityExperience?.[j]?.day ||
                    "",
                  facilityExpTime:
                    tempArray[i]?.clinicianId?.facilityExperience?.[j]
                      ?.startTime || "",
                  licenseNumber:
                    tempArray[i]?.clinicianId?.licenseDetails?.[j]
                      ?.licenseNumber || "",
                  licenseExpDate: tempArray[i]?.clinicianId?.licenseDetails?.[j]
                    ?.licenseExpDate
                    ? convertServerDateToDate(
                        tempArray[i]?.clinicianId?.licenseDetails?.[j]
                          ?.licenseExpDate,
                      )
                      ? getDateFormat(
                          convertServerDateToDate(
                            tempArray[i]?.clinicianId?.licenseDetails?.[j]
                              ?.licenseExpDate,
                          ),
                        )
                      : ""
                    : "",
                };
                excelArrayData.push(innerObj);
              }
            }
          }
        }
        setExportData(excelArrayData);

        // Trigger CSV export using the ref
        if (csvLinkEl.current) {
          csvLinkEl.current.link.click();
        }
      }
    } catch (error) {
      console.error("Export error: ", error);
    }
  };

  const handleChange = (val) => {
    setSearch(val.target.value);
  };

  useEffect(() => {
    const updatedFilters = {
      ...filters,
      skip: 0,
      search: debouncedSearchTerm || "",
    };
    if (JSON.stringify(updatedFilters) !== JSON.stringify(filters)) {
      setFilters(updatedFilters);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (filters.tabName !== prevFilters.tabName) {
      setSearch("");
    }
  }, [filters.tabName, prevFilters.tabName]);

  useEffect(() => {
    adminStatus.forEach((element) => {
      if (element?.value === filters?.status) {
        setSelectedStatus([element]);
      }
    });
  }, [filters?.status, filters.tabName]);

  // officeAddressZipCode homeAddressZipCode
  const customHeadersForClinician = [
    { label: "Clinician ID", key: "display_number" },
    { label: "First name", key: "FirstName" },
    { label: "Last name", key: "LastName" },
    { label: "Joined Date", key: "joined_Date" },
    { label: "Last Time SignIn", key: "lastSignInTime" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "ISO Code", key: "isoCode" },
    { label: "Roles", key: "role" },
    { label: "No of Shifts", key: "shifts" },
    { label: "Status", key: "status" },
    // { label: "Rating", key: "rating" },
    { label: "CPR expiration date", key: "CPRdate" },
    { label: "NPI", key: "npi" },
    // { label: "Home address", key: "homeAddress" },
    { label: "Address", key: "fullAddress" },
    { label: "State", key: "homeState" },
    { label: "Zip code", key: "zipCode" },
    { label: "Approved By Admin", key: "isApprovedByAdmin" },
    // { label: "Total Reviews", key: "totalReviews" },
    { label: "T&C Accpeted", key: "terms" },
    { label: "T&C Acceptance Time", key: "termAcceptedDateTime" },
    { label: "Activate/Deactivate", key: "Activate_Deactivate" },
    { label: "About Me", key: "aboutMe" },
    { label: "Languages Spoken", key: "languagesSpoken" },
    { label: "License Number", key: "licenseNumber" },
    { label: "License Expiry Date", key: "licenseExpDate" },
    {
      label: "Patient experience Day",
      key: "patientExpDay",
    },
    {
      label: "Patient experience startTime",
      key: "patientExpTime",
    },
    {
      label: "Facility experience Day",
      key: "facilityExpDay",
    },
    {
      label: "Facility experience startTime",
      key: "facilityExpTime",
    },
  ];

  const customHeadersForFacility = [
    { label: "Facility ID", key: "display_number" },
    { label: "Office Name", key: "Name" },
    { label: "First name", key: "FirstName" },
    { label: "Last name", key: "LastName" },
    { label: "Joined Date", key: "joined_Date" },
    { label: "Last Time SignIn", key: "lastSignInTime" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "ISO Code", key: "isoCode" },
    { label: "Roles", key: "role" },
    { label: "No of Shifts", key: "shifts" },
    { label: "Status", key: "status" },
    { label: "EMR", key: "emrList" },
    // { label: "Rating", key: "rating" },
    { label: "Address Nickname", key: "facilityAddressNickname" },
    { label: "Office Address", key: "facilityAddress" },
    { label: "Office City", key: "facilityAddressCity" },
    { label: "Office State", key: "facilityAddressState" },
    { label: "Office Zip Code", key: "facilityAddressZipCode" },
    { label: "Approved By Admin", key: "isApprovedByAdmin" },
    // { label: "Total Reviews", key: "totalReviews" },
    { label: "Activate/Deactivate", key: "Activate_Deactivate" },
  ];

  return (
    <div className="facility-payment-detail ">
      {filters?.tabName !== "subadmin" ? (
        <div className="d-flex justify-content-between">
          <div className="header">
            <div className="userfilter">
              <label htmlFor="filter">Filter</label>
              <div className="daterange-input">
                <DatePicker
                  selected={date}
                  onChange={(val) => handleDateChange(val)}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Select Joined Date"
                />
                <div
                  onClick={() => {
                    if (date) {
                      handleDateChange();
                    }
                  }}>
                  {/*                        CrossIcon Here👇🏻 */}
                  {!date ? <TickCalender /> : <CloseIcon />}
                </div>
              </div>
            </div>

            {filters.tabName === "all" ? (
              <>
                <div className="user-sorting usertype">
                  <label htmlFor="type">User Type</label>
                  <Dropdown
                    onChange={(val) => {
                      setFilters({
                        ...filters,
                        skip: 0,
                        limit: APP_LIMIT,
                        userType:
                          val && val.length
                            ? val?.map((v) => v?.value).join(",")
                            : "",
                      });
                    }}
                  />
                </div>
                <div className="user-sorting usertype">
                  <label htmlFor="type">Status</label>
                  <div className="sort">
                    <Select
                      placeholder={statusVerify[0]?.label}
                      onChange={(val) => {
                        setFilters({
                          ...filters,
                          skip: 0,
                          limit: APP_LIMIT,
                          status: val && val.length ? val[0].value : "",
                        });
                      }}
                      options={statusVerify}
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
                      placeholder={
                        filters.tabName === "all"
                          ? "Search by name, email"
                          : "Search by name, email, zipcode"
                      }
                      style={
                        filters.tabName === "all"
                          ? { width: "190px" }
                          : { width: "250px" }
                      }
                      onChange={(val) => {
                        handleChange(val);
                      }}
                      value={search}
                      onKeyDown={(e) => {
                        if (e.code === SPACE_KEY) {
                          e?.preventDefault();
                        }
                      }}
                      onWheel={(e) => e?.target?.blur()}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="user-sorting usertype">
                  <label htmlFor="type">Status</label>
                  <div className="sort">
                    <Select
                      placeholder={adminStatus[0]?.label}
                      onChange={(val) => {
                        setFilters({
                          ...filters,
                          skip: 0,
                          limit: APP_LIMIT,
                          status: val && val.length ? val[0].value : null,
                        });
                      }}
                      options={adminStatus}
                      id="type"
                      values={selectedStatus}
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
                      placeholder={
                        filters.tabName === "facility"
                          ? "Search by name, email"
                          : "Search by name, email, zipcode"
                      }
                      style={
                        filters.tabName === "facility"
                          ? { width: "190px" }
                          : { width: "250px" }
                      }
                      onChange={(val) => {
                        handleChange(val);
                      }}
                      value={search}
                      onKeyDown={(e) => {
                        if (e.code === SPACE_KEY) {
                          e?.preventDefault();
                        }
                      }}
                      onWheel={(e) => e?.target?.blur()}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          {role === "admin" && filters?.tabName !== "all" ? (
            <div className="">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Export"}
                disabled={!isExport}
                onClick={handleExport}
              />
              <CSVLink
                headers={
                  filters.tabName === "facility"
                    ? customHeadersForFacility
                    : customHeadersForClinician
                }
                data={exportData}
                filename={
                  filters.tabName === "facility"
                    ? "Facility_Data"
                    : "Clinician_Data"
                }
                className="text-decoration-none "
                ref={csvLinkEl}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          <div className="header">
            <div className="user-sorting usertype">
              <label htmlFor="search">Search</label>
              <div className="search">
                <SearchIcon />
                <Input
                  id="search"
                  type="text"
                  placeholder={
                    filters.tabName === "facility"
                      ? "Search by name, email"
                      : "Search by name, email"
                  }
                  style={
                    filters.tabName === "subadmin"
                      ? { width: "190px" }
                      : { width: "250px" }
                  }
                  onChange={(val) => {
                    handleChange(val);
                  }}
                  value={search}
                  onKeyDown={(e) => {
                    if (e.code === SPACE_KEY) {
                      e?.preventDefault();
                    }
                  }}
                  onWheel={(e) => e?.target?.blur()}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <DataTable
        columns={columns}
        data={list}
        progressPending={loader}
        progressComponent={
          <div className="h100px">
            <Spinner color="primary" />
          </div>
        }
        sortIcon={<SortIcon />}
      />
      <CustomPagination
        count={count}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
