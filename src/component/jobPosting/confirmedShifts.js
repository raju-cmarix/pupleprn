import { api } from "api/Api";
import { ReactComponent as SortIcon } from "assets/images/icons/arrows-up.svg";
import AddressLabel from "component/common/AddressLabel";
import DatesLabel from "component/common/DatesLabel";
import ReceiptModal from "component/jobPosting/Modals/Receipt";
import RateClinicianModal from "component/modals/RateClinicianModal";
import FacilityApproveTimesheetModal from "component/modals/timesheets/FacilityApproveTimesheetModal";
import UploadTimeCardModal from "component/modals/UplaodTimeCardModal";
import {
  ADD_UPDATE_TIMECARD_URL,
  GET_CONFIRMED_SHIFTS_URL,
} from "constants/ApiUrls";
import { APP_LIMIT, RESPONSE_OK } from "constants/AppConstants";
import dayjs from "dayjs";
import { isEmpty } from "radash";
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-dropdown-select";
import { Link } from "react-router-dom";
import { Col, Row, Spinner, UncontrolledTooltip } from "reactstrap";
import UserContext from "utils/context/UserContext";
import {
  confirmShiftsSortBy,
  shiftStatus,
} from "views/authentication/signUpClinician/HourlyConstant";
import { ReactComponent as TableMsgIcon } from "../../assets/images/icons/chat.svg";
import { DownArrow } from "../../assets/svg";
import CustomPagination from "../common/customPagination";

function ConfirmedShifts() {
  const [date, setDate] = useState([]);
  const [viewTimeCardModal, setViewTimeCardModal] = useState(false);
  const [selectedTimeCardRow, setSelectedTimeCardRow] = useState({});
  const [viewSheetModal, setViewSheetModal] = useState(false);

  const handleDateChange = (val) => {
    setDate(val);
    if (val[0] && val[1]) {
      setFilters({
        ...filters,
        skip: 0,
        startDate: dayjs(val[0]).startOf("day").unix() * 1000,
        endDate: dayjs(val[1]).endOf("day").unix() * 1000,
        shiftStatus: "",
      });
    }
  };

  const initFilters = {
    skip: 0,
    limit: APP_LIMIT,
    forFacility: 1,
    clinicianId: 0,
    shiftStatus: "",
  };

  const css = new Map();
  css.set("upcoming", "primary");
  css.set("current", "primary");
  css.set("completed", "secondary");

  const timesheetCSS = new Map();
  timesheetCSS.set("accepted", "secondary");
  timesheetCSS.set("pending", "danger");

  const [rateModal, setRateModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({ ...initFilters });
  const [selectedRow, setSelectedRow] = useState({});
  const { user } = useContext(UserContext);

  const [selected, setSelected] = useState(null);
  const [receiptModal, setReceiptModal] = useState(false);
  const ratingToggle = () => setRateModal(!rateModal);
  const toggleUploadModal = () => setUploadModal(!uploadModal);
  const toggleReceiptModal = (row) => {
    setReceiptModal(!receiptModal);
    if (!row || isEmpty(row)) {
      setSelectedRow({});
    } else if (row || !isEmpty(row)) {
      setSelectedRow({ ...row });
    }
  };
  const handleUpdate = (file, jobApplicationId = "", facilityId = "") => {
    let reqData = {
      jobApplicationId: selectedRow.id || jobApplicationId, //same
      timeCardUrl: file || "", // on delete we send empty string
      clinicianId: "",
      facilityId: selectedRow.facilityId || facilityId,
    };

    api(ADD_UPDATE_TIMECARD_URL, { ...reqData }).then((res) => {
      if (res.status === RESPONSE_OK) {
        toggleUploadModal();
        getList();
      }
    });
  };

  const handleViewSheet = (row) => {
    setSelectedRow(row);
    setViewSheetModal(!viewSheetModal);
  };

  const columns = [
    {
      name: "Shift ID",
      width: "85px",
      selector: (row) => row.serialNumber || "-",
    },
    {
      name: "Location",
      width: "180px",
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
      name: "Clinician",
      width: "100px",
      selector: (row) => (
        <>
          <Link
            to={`/facility/clinicianprofile/${row.clinicianId}?facilityId=${row.facilityId}&${row.jobId}&confirmed=true`}
            id={"fullname" + row.id}>
            {row.clinicianName}
          </Link>
          <UncontrolledTooltip
            placement="bottom"
            target={"fullname" + row.id}>
            {row.clinicianName}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "Clinician Type",
      width: "100px",
      selector: (row) => row.clinicianType?.toUpperCase() || "-",
    },
    {
      name: "Shift",
      width: "150px",
      selector: (row) => (
        <>
          {row?.shiftSlots ? (
            <DatesLabel
              arr={row?.shiftSlots}
              timeZone={row.timeZone}
            />
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      name: "Shift Status",
      width: "105px",
      selector: (row) => (
        <div className={`text-${css.get(row.shiftStatus)} text-capitalize`}>
          {row.shiftStatus || "-"}
        </div>
      ),
    },
    {
      name: "Time Worked (hrs)",
      width: "121px",
      selector: (row) => (
        <div className="text-primary">{Number(row.billedHours) || 0}</div>
      ),
    },
    {
      name: "Timesheet",
      width: "150px",
      selector: (row) =>
        row.timesheetId ? (
          <Link
            className="text-primary text-decoration-none"
            onClick={() => handleViewSheet(row)}>
            <div
              className={`text-${timesheetCSS.get(
                row.timesheetStatus,
              )} d-flex flex-column align-items-center`}>
              <span
                className={`text-capitalize ${
                  row.timesheetStatus === "accepted" ? "ps-4" : ""
                }`}>
                Timesheet
              </span>
              {row.timesheetStatus === "pending" && (
                <span className="w-100 text-center">(awaiting approval)</span>
              )}
            </div>
          </Link>
        ) : row?.timeCardUrlForClinician ? (
          <Link
            to={row?.timeCardUrlForClinician}
            target="_blank"
            rel="noreferrer"
            className="ps-4">
            Timesheet
          </Link>
        ) : (
          "-"
        ),
    },
    // {
    //   name: "Payment Status",
    //   width: "118px",
    //   selector: (row) => (
    //     <div className="text-primary text-capitalize">
    //       {PAYMENT_STATUS_LABELS.get(row.paymentStatus)}
    //     </div>
    //   ),
    // },
    // {
    //   name: "Receipt",
    //   width: "80px",
    //   selector: (row) => {
    //     return (
    //       <>
    //         {row?.invoiceForFacility?.length ? (
    //           <Link
    //             className="text-primary"
    //             onClick={() => toggleReceiptModal(row)}
    //             style={CURSORPOINTER}
    //           >
    //             View
    //           </Link>
    //         ) : (
    //           <>-</>
    //         )}
    //       </>
    //     );
    //   },
    // },
    // completed
    // {
    //   name: "Rating",
    //   width: "103px",
    //   selector: (row) => {
    //     const shiftSlots = row?.shiftSlots || [];

    //     const shifts = shiftSlots?.sort((a, b) => a?.sortOrder - b?.sortOrder);
    //     const lastShiftEndDate = new Date(shifts[shifts.length - 1]?.endDate);
    //     const nextWeek = new Date(
    //       lastShiftEndDate.getFullYear(),
    //       lastShiftEndDate.getMonth(),
    //       lastShiftEndDate.getDate() + 7,
    //     );
    //     const today = new Date();

    //     return (
    //       <>
    //         {row.shiftStatus === "completed" &&
    //         nextWeek > today &&
    //         Number(row?.ratingForClinician) < 1 ? (
    //           <div className="text-primary">
    //             <Link
    //               className="text-primary"
    //               onClick={() => {
    //                 ratingToggle();
    //                 setSelected(row);
    //               }}
    //               style={CURSORPOINTER}>
    //               Rate Now
    //             </Link>
    //           </div>
    //         ) : (
    //           <>
    //             {row.shiftStatus !== "completed"
    //               ? "-"
    //               : `${
    //                   row?.ratingForClinician
    //                     ? row?.ratingForClinician + "/ 5"
    //                     : NO_RATINGS
    //                 }`}
    //           </>
    //         )}
    //       </>
    //     );
    //   },
    // },
    {
      name: "Shift Details",
      width: "120px",
      selector: (row) => (
        <div className="text-primary">
          <Link to={`/facility/jobprofile/${row.jobId}`}>Shift Details</Link>
        </div>
      ),
    },
    {
      name: "Chat",
      width: "61px",
      selector: (row) => (
        <>
          <Link
            to={`/chat-profile?open=${row.clinicianUserId}`}
            target="_blank"
            className="chaticon"
            state={{ receiverId: row.clinicianUserId }}>
            <TableMsgIcon />
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (user?.facilityId?.id) getList();
  }, [filters, rateModal]);

  const getList = (withLoader = true) => {
    withLoader && setLoader(true);
    api(GET_CONFIRMED_SHIFTS_URL, {}, null, {
      facilityId: user?.facilityId?.id,
      clinicianId: user?.clinicianId?.id,
      ...filters,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
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
            } else if (filters?.sortBy === "location") {
              const fullAddress1 = `${a.jobAddress1} ${a.jobAddress2}`;
              const fullAddress2 = `${b.jobAddress1} ${b.jobAddress2}`;
              if (filters?.direction === "zToA") {
                return fullAddress2.localeCompare(fullAddress1);
              } else {
                return fullAddress1.localeCompare(fullAddress2);
              }
            }
          });
        }
        setList([...data]);
        setCount(res.data.count);
      }

      withLoader && setLoader(false);
    });
  };

  return (
    <Row>
      <Col sm="12">
        <div className="facility-payment-detail">
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
                      shiftStatus: val && val.length ? val[0].value : null,
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
                      paymentStatus: val && val?.length ? val[0]?.value : null,
                    });
                  }}
                  options={paymentStatusFac}
                  id="type"
                />
              </div>
            </div> */}
            <div className="ms-md-auto hourly">
              <div className="hourly-select">
                <div className="user-sorting usertype">
                  <label htmlFor="type">Sort by</label>
                  <div className="sort">
                    <Select
                      placeholder={confirmShiftsSortBy[0]?.label}
                      onChange={(val) => {
                        setFilters({
                          ...filters,
                          skip: 0,
                          limit: APP_LIMIT,
                          sortBy: val && val.length ? val[0].value : "",
                        });
                      }}
                      options={confirmShiftsSortBy}
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
            </div>
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
            sortIcon={<SortIcon />}
          />
          <CustomPagination
            count={count}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        {rateModal && (
          <RateClinicianModal
            modal={rateModal}
            toggle={() => {
              setRateModal(!rateModal);
              getList();
            }}
            data={selected}
            reviewFor={selected?.clinicianUserId}
            reviewBy={selected?.facilityUserId}
          />
        )}
        <FacilityApproveTimesheetModal
          modal={viewSheetModal}
          toggle={() => {
            handleViewSheet({});
          }}
          data={selectedRow}
          setList={setList}
        />
        <UploadTimeCardModal
          data={selectedRow}
          modal={uploadModal}
          toggle={() => {
            setUploadModal(!uploadModal);
            getList();
          }}
          handleSave={(file) => handleUpdate(file)}
          serverTimeCard={selectedRow?.timeCardUrlForFacility}
        />
        <ReceiptModal
          data={selectedRow}
          isOpen={receiptModal}
          toggle={() => toggleReceiptModal({})}
          loading={loader}
          setLoading={setLoader}
          totalAmount={selectedRow?.originalTotalPay}
          hourlyRate={selectedRow?.hourlyRate}
        />
      </Col>
    </Row>
  );
}

export default ConfirmedShifts;
