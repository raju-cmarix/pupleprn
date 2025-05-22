import { useState, useEffect, useContext, useRef } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Spinner,
  UncontrolledPopover,
  UncontrolledTooltip,
} from "reactstrap";
import { Pencil, Options } from "../../assets/svg";
import CustomPagination from "../common/customPagination";
import "./userListing.scss";
import UserContext from "utils/context/UserContext";
import {
  AdminSortOptions,
  APP_LIMIT,
  CURSORPOINTER,
  DEFAULT_TIMEZONE,
  RESPONSE_OK,
  SPACE_KEY,
} from "constants/AppConstants";
import { api } from "api/Api";
import {
  GET_CONFIRMED_SHIFTS_URL,
  ADD_RECEIPT_URL,
  UPDATE_APPLICANTS_URL,
} from "constants/ApiUrls";
import EditTotalAmountModal from "component/modals/EditTotalAmountModal";
import EditTimeModal from "component/modals/EditTimeModal";
import ViewTimeCardModal from "component/modals/ViewTimeCardModal";
import DatesLabel from "component/common/DatesLabel";
import Select from "react-dropdown-select";
import {
  shiftStatus,
  paymentStatus,
  paymentStatusFac,
  CANCELLED_PAYMENT_STATUS,
} from "../../views/authentication/signUpClinician/HourlyConstant";
import { ReactComponent as SortIcon } from "../../assets/images/icons/arrows-up.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/icons/search-icon.svg";
import dayjs from "dayjs";
import { DownArrow } from "assets/svg";
import AdminReceiptModal from "component/jobPosting/Modals/AdminFacilityReceipt";
import { Lightbox } from "react-modal-image";
import CancelShiftPopup from "component/modals/CancelShiftPopup";
import "component/userListing/userListing.scss";
import { debounce } from "lodash";
import { Helmet } from "react-helmet";
import EditAdminHourlyRateModal from "component/modals/EditAdminHourlyRateModal";
import AddressLabel from "component/common/AddressLabel";
import AdminViewTimeSheet from "component/modals/timesheets/AdminViewTimeSheet";
import FacilityApproveTimesheetModal from "component/modals/timesheets/FacilityApproveTimesheetModal";
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
function ConfirmedShifts(args) {
  const [date, setDate] = useState([]);
  const { user } = useContext(UserContext);
  const initFilters = {
    skip: 0,
    limit: APP_LIMIT,
    forAdmin: 1,
    forFacility: 0,
    clinicianId: user.id,
    sort: "DESC",
  };
  const [filters, setFilters] = useState({ ...initFilters });
  const [selectedRow, setSelectedRow] = useState({});
  const [rateModal, setRateModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState();
  const [editTotalAmountModal, setEditTotalAmountModal] = useState(false);
  const [editTimeModal, setEditTimeModal] = useState(false);
  const [viewTimeCardModal, setViewTimeCardModal] = useState(false);
  const [facilityReceiptModal, setFacilityReceiptModal] = useState(false);
  const [imagePopupModal, setImagePopupModal] = useState(false);
  const [cancelShiftConfirmPopup, setCancelShiftConfirmPopup] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 1000);
  const [initialLoad, setInitialLoad] = useState(true);
  const [editAdminHourlyRateModal, setEditAdminHourlyRateModal] =
    useState(false);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [viewSheetModal, setViewSheetModal] = useState(false);

  const handleDateChange = (val) => {
    setDate(val);
    if (val[0] && val[1]) {
      setFilters({
        ...filters,
        skip: 0,
        startDate: dayjs(val[0]).startOf("day").unix() * 1000,
        endDate: dayjs(val[1]).endOf("day").unix() * 1000,
      });
    }
  };

  const toggleCancelShiftConfirmPopup = (id) =>
    setCancelShiftConfirmPopup(id || false);

  const css = new Map();
  css.set("upcoming", "primary");
  css.set("current", "primary");
  css.set("completed", "secondary");

  const handleSort = (field) => {
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
    const newSortOrder =
      filters.sort === "DESC" ? "ASC" : filters.sort === "ASC" ? "DESC" : "ASC";
    setFilters({ ...filters, sort: newSortOrder });
  };

  const handleChange = (val) => {
    setSearch(val.target.value);
  };

  const openPreview = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Avoids the opened window having a reference to the current window
    }
  };

  const handleViewSheet = (row) => {
    setSelectedRow(row);
    setViewSheetModal(!viewSheetModal);
  };

  const columns = [
    {
      name: "Shift ID",
      width: "60px",
      selector: (row) => (
        <div className="min-100 text-primary">
          <Link
            to={`/admin/jobdetails/${row.jobId}`}
            target="_blank">
            {row.serialNumber || "-"}
          </Link>
        </div>
      ),
    },
    {
      name: "Metro Area",
      width: "80px",
      selector: (row) => (
        <div className="min-100 ">{row?.jobMetroAreaName || " - "}</div>
      ),
    },
    {
      id: "location",
      name: "Location",
      width: "120px",
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
      width: "65px",
      selector: (row) => <>{row.zipCode || "-"}</>,
    },
    {
      name: "Facility",
      width: "100px",
      selector: (row) => (
        <>
          <Link
            to={`/admin/facilitydetails/${row?.facilityId}`}
            className="emailcapture-msg text-decoration-none"
            id={"facility-" + row.id}
            target="_blank">
            {row.facilityOfficeName}
          </Link>
          <UncontrolledTooltip
            placement="right"
            target={"facility-" + row.id}>
            {row.facilityEmail || row.facilityOfficeName}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "Clinician",
      width: "100px",
      selector: (row) => (
        <>
          <Link
            to={`/admin/cliniciandetails/${row?.clinicianId}`}
            className="emailcapture-msg text-decoration-none"
            id={"clinician-" + row.id}
            target="_blank">
            {row.clinicianName}
          </Link>
          <UncontrolledTooltip
            placement="right"
            target={"clinician-" + row.id}>
            {row.clinicianEmail || row.clinicianName}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "Shift",
      width: "130px",
      sortable: true,
      selector: (row) => (
        <>
          {row.isProposedNewTime ? (
            <DatesLabel
              arr={row.shiftSlots}
              timeZone={row.timeZone ?? DEFAULT_TIMEZONE}
            />
          ) : (
            <DatesLabel
              arr={row?.shiftSlots}
              timeZone={row.timeZone ?? DEFAULT_TIMEZONE}
            />
          )}
        </>
      ),
    },
    // {
    //   name: "Proposed Time",
    //   width: "130px",
    //   sortable: true,
    //   selector: (row) => (
    //     <>
    //       {row.isProposedNewTime ? (
    //         <DatesLabel
    //           arr={row.shiftSlots}
    //           timeZone={row.timeZone ?? DEFAULT_TIMEZONE}
    //         />
    //       ) : (
    //         <div
    //           style={{
    //             color: "#01a796",
    //             marginTop: "15px",
    //           }}>
    //           {" "}
    //           -
    //         </div>
    //       )}{" "}
    //     </>
    //   ),
    // },
    {
      name: "Shift status",
      width: "100px",
      selector: (row) => (
        <div className={`text-${css.get(row.shiftStatus)} text-capitalize`}>
          {row.shiftStatus || "-"}
        </div>
      ),
    },
    {
      name: "Billed Hrs",
      width: "85px",
      selector: (row) => {
        const hasTimeCard =
          row.timesheetStatus === "pending" && row.timesheetId !== null;

        return (
          <div className="text-primary">
            <span style={hasTimeCard ? { color: "#ffa500" } : {}}>
              {row.billedHours}h
            </span>
            {user.roles !== "subadmin" && row.isHoursEditable ? (
              <Link
                className="pencil-icon"
                style={hasTimeCard ? { color: "#ffa500" } : {}}
                onClick={() => {
                  setSelectedRow({ ...row });
                  setEditTimeModal(!editTimeModal);
                }}>
                <Pencil />
              </Link>
            ) : null}
            <br />
            {row.timesheetId && row.timesheetId !== null ? (
              <Link
                className="text-primary"
                style={
                  hasTimeCard
                    ? { color: "#ffa500", textDecorationColor: "#ffa500" }
                    : {}
                }
                onClick={() => handleViewSheet(row)}>
                <span
                  style={
                    hasTimeCard
                      ? { color: "#ffa500", textDecorationColor: "#ffa500" }
                      : {}
                  }>
                  Time card
                </span>
              </Link>
            ) : row?.timeCardUrlForClinician ? (
              <Link
                to={row?.timeCardUrlForClinician}
                style={
                  hasTimeCard
                    ? { color: "#ffa500", textDecorationColor: "#ffa500" }
                    : {}
                }
                target="_blank"
                rel="noreferrer">
                <span
                  style={
                    hasTimeCard
                      ? { color: "#ffa500", textDecorationColor: "#ffa500" }
                      : {}
                  }>
                  Time card
                </span>
              </Link>
            ) : null}
          </div>
        );
      },
    },
    {
      name: "Estimated amount",
      width: "100px",
      selector: (row) => (
        <div className="text-primary">
          ${row.totalAmount}
          {user.roles !== "subadmin" && (
            <Link
              className="pencil-icon"
              onClick={() => {
                setSelectedRow({ ...row });
                setEditTotalAmountModal(!editTotalAmountModal);
              }}>
              <Pencil />
            </Link>
          )}
        </div>
      ),
    },
    {
      name: "Hourly Rate",
      width: "73px",
      selector: (row) => (
        <div className="text-primary text-decoration-none ">
          ${row.hourlyRate}
        </div>
      ),
    },
    {
      name: "Admin Hourly Rate",
      width: "75px",
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
          {user.roles !== "subadmin" && (
            <Link
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
            </Link>
          )}
        </div>
      ),
    },
    ...(user.roles !== "subadmin"
      ? [
          {
            name: "",
            width: "5px",
            selector: (row) => (
              <>
                <Button
                  id={"id-" + row?.serialNumber}
                  className="table-dot"
                  type="button">
                  <Options />
                </Button>
                <UncontrolledPopover
                  id="table-option"
                  placement="bottom"
                  target={"id-" + row?.serialNumber}
                  trigger="legacy"
                  className="adminconfirmshiftoptions">
                  <p
                    onClick={() => toggleCancelShiftConfirmPopup(row?.id)}
                    style={CURSORPOINTER}>
                    Cancel Shift
                  </p>
                </UncontrolledPopover>
              </>
            ),
          },
        ]
      : []),
  ];

  const handlePaymentChange = (val, row) => {
    const reqData = {
      id: row.id,
      paymentStatus: val[0].value,
      userId: user?.id,
    };
    setLoader(true);
    api(UPDATE_APPLICANTS_URL, reqData).then((res) => {
      if (res.status === RESPONSE_OK) {
        getList();
      }
    });
  };

  useEffect(() => {
    if (user?.id)
      if (initialLoad) {
        setInitialLoad(false);
        return;
      }
    getList();
  }, [filters, rateModal]);

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

  useEffect(() => {
    if (user?.id && !cancelShiftConfirmPopup) {
      setFilters({ ...initFilters });
    }
  }, [cancelShiftConfirmPopup]);

  const getList = (isLoader = true) => {
    setEditTotalAmountModal(false);
    setEditTimeModal(false);
    isLoader && setLoader(true);
    api(GET_CONFIRMED_SHIFTS_URL, {}, null, {
      ...filters,
      clinicianId: user?.clinicianId?.id,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setCount(res.data.count);
        let data = [...res.data.data];

        if (filters?.sortBy) {
          data = data?.sort((a, b) => {
            if (filters?.sortBy === "totalTime") {
              if (filters?.direction === "zToA") {
                return (
                  Number(b?.totalWorkedHours) - Number(a?.totalWorkedHours)
                );
              } else {
                return (
                  Number(a?.totalWorkedHours) - Number(b?.totalWorkedHours)
                );
              }
            } else if (filters?.sortBy === "totalAmount") {
              if (filters?.direction === "zToA") {
                return Number(b?.totalAmount) - Number(a?.totalAmount);
              } else {
                return Number(a?.totalAmount) - Number(b?.totalAmount);
              }
            } else if (filters?.sortBy === "serialNumber") {
              if (filters?.direction === "zToA") {
                return Number(b?.serialNumber) - Number(a?.serialNumber);
              } else {
                return Number(a?.serialNumber) - Number(b?.serialNumber);
              }
            }
          });
        }
        setList([...data]);
      }
      isLoader && setLoader(false);
    });
  };

  const addInvoice = () => {
    setLoader(true);
    api(GET_CONFIRMED_SHIFTS_URL, {}, null, {
      ...filters,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setCount(res.data.count);
        setList(res.data.data);
      }

      setLoader(false);
    });
  };

  const handleAddReceipt = (data) => {
    let temp = {
      jobApplicationId: selectedRow.id,
    };
    if (selectedRow.isFacility)
      temp.invoiceForFacility = [
        ...selectedRow.invoiceForFacility,
        { data: selectedRow.invoiceForFacility.length + 1, url: data[0] },
      ];
    if (!selectedRow.isFacility)
      temp.invoiceForClinician = [
        ...selectedRow.invoiceForClinician,
        { data: selectedRow.invoiceForClinician.length + 1, url: data[0] },
      ];

    api(ADD_RECEIPT_URL, { ...temp, isDeleteInvoice: false }).then((res) => {
      if (res.status === RESPONSE_OK) {
        let tempList = [...list];
        let index = list.findIndex((obj) => obj.id === selectedRow.id);
        tempList[index] = { ...selectedRow, ...temp };
        setList([...tempList]);
        setSelectedRow({ ...selectedRow, ...temp });
        setEditTimeModal(false);
      }

      setLoader(false);
    });
  };

  const handleDeleteReceipt = (index, type) => {
    let tempRow = { jobApplicationId: selectedRow.id, ...selectedRow };
    if (type === "facility") {
      tempRow.invoiceForFacility.splice(index, 1);
    } else {
      tempRow.invoiceForClinician.splice(index, 1);
    }

    api(ADD_RECEIPT_URL, { ...tempRow, isDeleteInvoice: true }).then((res) => {
      if (res.status === RESPONSE_OK) {
        let tempList = [...list];
        let index = list.findIndex((obj) => obj.id === selectedRow.id);
        tempList[index] = { ...selectedRow, ...tempRow };
        setList([...tempList]);
        setSelectedRow({ ...selectedRow, ...tempRow });
        setEditTimeModal(false);
      }
      setLoader(false);
    });
  };

  return (
    <>
      <Helmet>
        <title>Purple PRN - Confirmed Shifts</title>
      </Helmet>
      <div className="facility-payment-detail user-listing confirm-shift-table">
        <div className="custom-container">
          <h1>Confirmed shifts</h1>
          <div className="header">
            <div className="user-sorting usertype">
              <label htmlFor="type">Shift status</label>
              <div className="sort">
                <Select
                  placeholder={shiftStatus[0]?.label}
                  onChange={(val) => {
                    setFilters({
                      ...filters,
                      skip: 0,
                      limit: APP_LIMIT,
                      shiftStatus: val && val.length ? val[0].value : "",
                    });
                  }}
                  options={shiftStatus}
                  id="type"
                />
              </div>
            </div>
            {/* <div className="user-sorting usertype">
              <label htmlFor="type">Payment status</label>
              <div className="sort">
                <Select
                  placeholder={paymentStatusFac[0]?.label}
                  onChange={(val) => {
                    setFilters({
                      ...filters,
                      skip: 0,
                      limit: APP_LIMIT,
                      paymentStatus: val && val.length ? val[0].value : "",
                    });
                  }}
                  options={paymentStatusFac}
                  id="type"
                />
              </div>
            </div> */}
            <div className="user-sorting usertype">
              <label htmlFor="search">Search</label>
              <div className="search">
                <SearchIcon />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by clinician, facility"
                  style={{ width: "210px" }}
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
            <div className="user-sorting usertype ms-md-auto me-0">
              <label htmlFor="hourlySelect">Sort by</label>
              <div className="sort">
                <Select
                  onChange={(data) =>
                    setFilters({
                      ...filters,
                      sortBy: data?.[0]?.value,
                      direction: filters?.direction || "aToZ",
                    })
                  }
                  options={AdminSortOptions}
                  placeholder={[AdminSortOptions[0]?.label]}
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
            </div>
          </div>
          <DataTable
            columns={columns}
            data={list}
            className=" admin-confirmshift rounded-5"
            progressPending={loader}
            progressComponent={
              <div className="h100px">
                <Spinner color="primary" />
              </div>
            }
            sortServer={false}
            onSort={(column, sortDirection) => handleSort(column.selector)}
            sortIcon={<SortIcon />}
          />
          <CustomPagination
            count={count}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>

      <EditTotalAmountModal
        modal={editTotalAmountModal}
        data={selectedRow}
        toggle={() => setEditTotalAmountModal(!editTotalAmountModal)}
        getList={getList}
      />
      <EditTimeModal
        modal={editTimeModal}
        data={selectedRow}
        toggle={() => setEditTimeModal(!editTimeModal)}
        getList={getList}
      />
      <ViewTimeCardModal
        modal={viewTimeCardModal}
        data={selectedRow}
        toggle={() => setViewTimeCardModal(!viewTimeCardModal)}
      />
      {/* <FacilityReceiptModal
        callbackFn={handleAddReceipt}
        deleteCallbackFn={handleDeleteReceipt}
        modal={facilityReceiptModal}
        data={selectedRow}
        toggle={() => setFacilityReceiptModal(!facilityReceiptModal)}
      /> */}
      <AdminReceiptModal
        data={selectedRow}
        toggle={() => setFacilityReceiptModal(!facilityReceiptModal)}
        isOpen={facilityReceiptModal}
        loading={loader}
        setLoading={setLoader}
        totalAmount={selectedRow?.originalTotalPay}
        callbackFn={handleAddReceipt}
        deleteCallbackFn={handleDeleteReceipt}
        modal={facilityReceiptModal}
        hourlyRate={selectedRow?.hourlyRate}
      />
      <EditAdminHourlyRateModal
        modal={editAdminHourlyRateModal}
        data={selectedRow}
        jobId={selectedRow.jobId}
        toggle={() => setEditAdminHourlyRateModal(!editAdminHourlyRateModal)}
        getList={getList}
      />
      <FacilityApproveTimesheetModal
        modal={viewSheetModal}
        toggle={() => handleViewSheet({})}
        data={selectedRow}
        openPreview={openPreview}
      />
      <CancelShiftPopup
        modal={cancelShiftConfirmPopup}
        toggle={() => toggleCancelShiftConfirmPopup()}
      />

      {/* <ImagePopupModal
        src={null}
        modal={imagePopupModal}
        toggle={() => setImagePopupModal(!imagePopupModal)}
      /> */}
      {/* {imagePopupModal && (
        <Lightbox
          small={null}
          large={null}
          alt="preview"
          onClose={() => setImagePopupModal(!imagePopupModal)}
        />
      )} */}
    </>
  );
}

export default ConfirmedShifts;
