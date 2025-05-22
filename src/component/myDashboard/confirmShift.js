import { api } from "api/Api";
import AddressLabel from "component/common/AddressLabel";
import DatesLabel from "component/common/DatesLabel";
import ReceiptClinicianModal from "component/jobPosting/Modals/ReceiptClinician";
import DeleteTimeSheetModal from "component/modals/DeleteTimeSheetModal";
import EnterTimeSheetModal from "component/modals/timesheets/EnterTimeSheetModal";
import {
  CLINICIAN_REMOVE_APPLICATION,
  GET_CLINICIAN_JOB_LIST,
} from "constants/ApiUrls";
import {
  APP_LIMIT,
  DEFAULT_TIMEZONE,
  RESPONSE_OK,
} from "constants/AppConstants";
import { isEmpty } from "radash";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-dropdown-select";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import {
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  UncontrolledPopover,
  UncontrolledTooltip,
} from "reactstrap";
import { ReactComponent as SortIcon } from "../../assets/images/icons/arrows-up.svg";
import { ReactComponent as TableMsgIcon } from "../../assets/images/icons/chat.svg";
import { CrossIcon, Options } from "../../assets/svg";
import CustomPagination from "../../component/common/customPagination";
import "../../component/userListing/userListing.scss";
import {
  initShiftStatus,
  shiftStatus,
} from "../../views/authentication/signUpClinician/HourlyConstant";

function MyConfirmShifts({ user, values, currentActiveTab }) {
  const initFilters = {
    skip: 0,
    limit: APP_LIMIT,
    forFacility: 0,
    shiftStatus: initShiftStatus,
    paymentStatus: "",
  };

  const [uploadModal, setUploadModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({ ...initFilters });
  const [sortFilters, setSortFilters] = useState({});
  const [selectedRow, setSelectedRow] = useState({});
  const [selected, setSelected] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [receiptModal, setReceiptModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteApplication, setDeleteApplication] = useState({});
  const [enterSheetModal, setEnterSheetModal] = useState(false);
  const [deleteSheetModal, setDeleteSheetModal] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /**
   * The function toggleDropdown toggles the value of isDropdownOpen.
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const role = localStorage.getItem("userRole");

  useEffect(() => {
    getData();
  }, [filters, trigger, currentActiveTab]);

  // Handle sorting on sort filters changes
  useEffect(() => {
    handleSorting();
  }, [sortFilters]);

  // Sort on client side, For faster exp
  const handleSorting = () => {
    if (sortFilters?.sortBy && data && data?.length) {
      setData((data) => {
        return data?.sort((a, b) => {
          if (sortFilters?.sortBy === "jobId") {
            if (sortFilters?.direction === "zToA") {
              return Number(b?.serialNumber) - Number(a?.serialNumber);
            } else {
              return Number(a?.serialNumber) - Number(b?.serialNumber);
            }
          } else if (sortFilters?.sortBy === "officeName") {
            if (sortFilters?.direction === "zToA") {
              return b?.facilityOfficeName.localeCompare(a?.facilityOfficeName);
            } else {
              return a?.facilityOfficeName.localeCompare(b?.facilityOfficeName);
            }
          } else if (sortFilters?.sortBy === "nickname") {
            if (sortFilters?.direction === "zToA") {
              return (b?.jobAddressNickname || "").localeCompare(
                a?.jobAddressNickname || "",
              );
            } else {
              return (a?.jobAddressNickname || "").localeCompare(
                b?.jobAddressNickname || "",
              );
            }
          } else if (sortFilters?.sortBy === "location") {
            if (sortFilters?.direction === "zToA") {
              return b?.jobAddress1.localeCompare(a?.jobAddress1);
            } else {
              return a?.jobAddress1.localeCompare(b?.jobAddress1);
            }
          } else if (sortFilters?.sortBy === "status") {
            if (sortFilters?.direction === "zToA") {
              return b?.shiftStatus.localeCompare(a?.shiftStatus);
            } else {
              return a?.shiftStatus.localeCompare(b?.shiftStatus);
            }
          } else if (sortFilters?.sortBy === "jobDate") {
            if (sortFilters?.direction === "zToA") {
              return b?.shiftSlots[0]?.startDate - a?.shiftSlots[0]?.startDate;
            } else {
              return a?.shiftSlots[0]?.startDate - b?.shiftSlots[0]?.startDate;
            }
          } else if (sortFilters?.sortBy === "totalTime") {
            if (sortFilters?.direction === "zToA") {
              return Number(b?.totalWorkedHours) - Number(a?.totalWorkedHours);
            } else {
              return Number(a?.totalWorkedHours) - Number(b?.totalWorkedHours);
            }
          }
        });
      });
    } else {
      setData((data) => {
        return data?.sort(
          (a, b) => b?.shiftSlots[0]?.startDate - a?.shiftSlots[0]?.startDate,
        );
      });
    }
  };

  const toggleReceiptModal = (row) => {
    setReceiptModal(!receiptModal);
    if (!row || isEmpty(row)) {
      setSelectedRow({});
    } else if (row || !isEmpty(row)) {
      setSelectedRow({ ...row });
    }
  };

  const toggleModal = (row) => {
    if (modal) {
      setModal(false);
    } else {
      setModal({
        jobApplicationId: row?.jobId,
        clinicianId: row?.clinicianId,
      });
    }
  };

  const css = new Map();
  css.set("upcoming", "primary");
  css.set("current", "primary");
  css.set("completed", "secondary");

  const getData = (withLoader = true) => {
    withLoader && setLoader(true);
    const isAllSelected = filters.shiftStatus.some(
      (val) => val.label === "All",
    );
    const payloadFilters = {
      ...filters,
      clinicianId: values?.id || user?.clinicianId?.id,
      shiftStatus: filters.shiftStatus.map((s) => s.value).join(","),
    };
    if (isAllSelected) delete payloadFilters.shiftStatus;

    api(GET_CLINICIAN_JOB_LIST, {}, null, payloadFilters).then((res) => {
      if (res.status === RESPONSE_OK) {
        setData(res?.data?.data);
        setCount(res.data.count);
      }
      withLoader && setLoader(false);
    });
  };

  const handleApplicationRemove = () => {
    if (Object.keys(deleteApplication).length > 0) {
      api(
        CLINICIAN_REMOVE_APPLICATION,
        {
          jobApplicationId: deleteApplication?.jobApplicationId,
          clinicianId: deleteApplication?.clinicianId,
        },
        null,
        {},
      )
        .then((res) => {
          getData();
          toggleModal();
        })
        .catch((err) => {
          toggleModal();
        });
    }
  };

  const handleShiftslots = (row) => {
    setSelectedRow(row);
    setEnterSheetModal(!enterSheetModal);
  };
  const deleteSheetToggle = (timesheetId) => {
    setDeleteSheetModal(!deleteSheetModal);
    setTimeSheetId(timesheetId);
  };

  const columns = [
    {
      name: "Shift ID",
      width: "80px",
      sortable: true,
      selector: (row) => row.serialNumber,
    },
    {
      name: "Facility",
      width: "150px",
      sortable: true,
      selector: (row) => row.facilityOfficeName,
      cell: (row) => (
        <>
          <Link
            to={
              role === "admin" || role === 'subadmin'
                ? `/admin/facilitydetails/${row.facilityId}`
                : `/clinician/jobprofile/${row?.jobId}`
            }
            target="_blank"
            id={"fullname" + row.id}>
            {row.facilityOfficeName}
          </Link>
          <UncontrolledTooltip
            placement="bottom"
            target={"fullname" + row.id}
            id="facility-name">
            {row.facilityOfficeName}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "Nickname",
      width: "110px",
      sortable: true,
      selector: (row) => row.jobAddressNickname || "-",
    },
    {
      name: "Location",
      width: "190px",
      sortable: true,
      selector: (row) =>
        [
          row.jobAddress1,
          row.jobAddress2,
          row.city,
          row.state,
          row.zipCode,
        ].join(""),
      cell: (row) => (
        <AddressLabel
          arr={[
            {
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
      name: "Original/Updated shift",
      width: "160px",
      sortable: true,
      selector: (row) => row?.jobSlots[0]?.startDate,
      cell: (row) => (
        <>{row.status === 'accepted' && row.isProposedNewTime ?
          <DatesLabel
          arr={row.shiftSlots}
          timeZone={row.timeZone ?? DEFAULT_TIMEZONE}
        />
        : <DatesLabel
          arr={row.jobSlots}
          timeZone={row.timeZone ?? DEFAULT_TIMEZONE}
        /> } </>
      ),
    },
    {
      name: "Proposed Shift",
      width: "150px",
      sortable: true,
      selector: (row) => row?.shiftSlots[0]?.startDate,
      cell: (row) => (
        <>{row.isProposedNewTime ?
        <DatesLabel
          arr={row.shiftSlots}
          timeZone={row.timeZone ?? DEFAULT_TIMEZONE}
        />  : "-"
    }</>
      ),
    },
    {
      name: "Shift Status",
      width: "120px",
      sortable: true,
      selector: (row) => row.shiftStatus,
      cell: (row) => (
        <div className={`text-${css.get(row.shiftStatus)} text-capitalize`}>
          {row.shiftStatus || "-"}
        </div>
      ),
    },
    ...(role === "admin" || role === 'subadmin'
      ? []
      : [
        {
          name: "Chat",
          width: "62px",
          selector: (row) => (
            <div>
            <Link
              to="/chat-profile"
              state={{ receiverId: row.facilityUserId }}>
              <TableMsgIcon />
            </Link>
            </div>
          ),
        },
      ]),
      ...(role !== 'subadmin'
        ? [{
      name: "Time card",
      width: "100px",
      selector: (row) => (
        <>
          {/* <DirectTimeSheetUpload
                  data={row}
                  handleUpdate={(file) => {
                    handleUpdate(file, row.id);
                  }}
                /> */}
          {row?.shiftStatus === "completed" ||
          row?.shiftStatus === "current" ? (
            <Fragment key={row.id}>
              {/* "#ea5455" */}
              {/* timeCardUrlForClinician */}
              <a
                id={`a${row.id}`}
                className="table-dot"
                role="button"
                tabIndex={0}
                onClick={toggleDropdown}
                onTouchStart={toggleDropdown}>
                <Options
                  fill={
                    (row?.isTimesheetSubmitted &&
                      row?.timesheetStatus === "accepted") ||
                    row?.timeCardUrlForClinician
                      ? null // green
                      : row?.timesheetStatus === "pending"
                      ? "#ffa500" // yellow
                      : "#ea5455" // red
                  }
                />
              </a>
              <UncontrolledPopover
                id="table-option"
                placement={role === "admin" ? "right" : "bottom"}
                target={`a${row.id}`}
                trigger="focus">
                {row?.timeCardUrlForClinician ? (
                  <Link
                    to={row?.timeCardUrlForClinician}
                    target="_blank"
                    rel="noreferrer">
                    View
                  </Link>
                ) : (
                  <>
                    {!row.timesheetId ? (
                      <Link onClick={() => handleShiftslots(row)}>Create</Link>
                    ) : (
                      <>
                        {!row.isTimesheetSubmitted ? (
                          <>
                            <Link onClick={() => handleShiftslots(row)}>
                              Edit
                            </Link>
                            <Link
                              onClick={() =>
                                deleteSheetToggle(row.timesheetId)
                              }>
                              Delete
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link onClick={() => handleShiftslots(row)}>
                              View
                            </Link>
                            <Link
                              onClick={() =>
                                deleteSheetToggle(row.timesheetId)
                              }>
                              Delete
                            </Link>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </UncontrolledPopover>
            </Fragment>
          ) : (
            "-"
          )}
        </>
      ),
    }] : []),
    {
      name: "Time Worked (hrs)",
      sortable: true,
      width: role === "admin" ? "130px" : role === "subadmin" ? "130px" : "120px",
      selector: (row) => Number(row.totalWorkedHours) || 0,
      cell: (row) =>
        row.shiftStatus === "completed" || row.shiftStatus === "upcoming"
          ? Number(row.totalWorkedHours) || 0
          : "-",
    },
    // {
    //   name: "Hourly Rate ($)",
    //   width: "85px",
    //   selector: (row) => Number(row.hourlyRate) || 0,
    // },
    // {
    //   name: "Payment Status",
    //   width: "100px",
    //   selector: (row) => (
    //     <div className="text-primary">
    //       {PAYMENT_STATUS_LABELS.get(row.paymentStatus)}
    //     </div>
    //   ),
    // },
    // {
    //   name: "Receipt",
    //   width: "79px",
    //   selector: (row) => {
    //     return (
    //       <>
    //         {row?.invoiceForClinician?.length ? (
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
    // {
    //   name: "Rating",
    //   width: "103px",
    //   selector: (row) => {
    //     const { shiftSlots } = row;

    //     const shifts = shiftSlots?.sort((a, b) => a?.sortOrder - b?.sortOrder);
    //     if (shifts?.length > 0) {
    //       const lastShiftEndDate = new Date(
    //         shifts[shifts?.length - 1]?.endDate,
    //       );
    //       const nextWeek = new Date(
    //         lastShiftEndDate.getFullYear(),
    //         lastShiftEndDate.getMonth(),
    //         lastShiftEndDate.getDate() + 7,
    //       );
    //       const today = new Date();

    //       return (
    //         <>
    //           {row.shiftStatus === "completed" &&
    //           nextWeek > today &&
    //           Number(row?.ratingForFacility) < 1 ? (
    //             <div className="text-primary">
    //               <Link
    //                 className="text-primary"
    //                 onClick={() => {
    //                   ratingToggle();
    //                   setSelected(row);
    //                 }}
    //                 style={CURSORPOINTER}>
    //                 Rate Now
    //               </Link>
    //             </div>
    //           ) : (
    //             <>
    //               {row.shiftStatus !== "completed"
    //                 ? "-"
    //                 : `${
    //                     row?.ratingForFacility
    //                       ? row?.ratingForFacility + "/ 5"
    //                       : NO_RATINGS
    //                   }`}
    //             </>
    //           )}
    //         </>
    //       );
    //     } else {
    //       return <>-</>;
    //     }
    //   },
    // },
    {
      name: "",
      width: role === "admin" ? "120px" : "101px",
      selector: (row) => (
        <div
          className="text-primary"
          style={{ display: "flex  align-items-center", width: "120px" }}>
          <Link
            style={{ marginRight: "15px" }}
            to={
              role === "admin" || role === "subadmin"
                ? `/admin/jobdetail/${row.jobId}`
                : `/clinician/jobprofile/${row.jobId}`
            }
            target="_blank">
            Shift details
          </Link>
          {row.jobStatus === "posted" && (
            <button
              id={"rej" + row.jobId}
              className="pt-btn-icon-small btn-danger-small"
              // style={{ width: "10px !important", height: "10px", lineHeight: "10px" }}
              onClick={() => {
                toggleModal();
                setDeleteApplication({
                  jobApplicationId: row.id,
                  clinicianId: row.clinicianId,
                });
              }}>
              <CrossIcon />
            </button>
          )}
        </div>
      ),
    },
  ];

  // Handle multitple shift status selection logic
  const handleShiftStatusFilters = (e, item, methods) => {
    const { isSelected, removeItem, addItem, selectAll, clearAll } = methods;
    e.stopPropagation();
    if (isSelected(item)) {
      removeItem(e, item);
    } else {
      addItem(item);
    }

    //If all is seleted, selete all, else
    if (item.label === "All") {
      // Handle select/unselect all logic for "All"
      if (!isSelected(item)) {
        selectAll();
      } else {
        clearAll();
      }
    } else if (
      filters.shiftStatus.length === shiftStatus.length - 2 &&
      !isSelected(item) &&
      !filters.shiftStatus.some((shift) => shift.label === "All")
    ) {
      // If everything is selected, check "all" also
      selectAll();
    } else if (
      filters.shiftStatus.length === shiftStatus.length &&
      item.label !== "All"
    ) {
      // If one of the item is unchecked, mark "all" also as unchecked
      setFilters((prev) => ({
        ...filters,
        skip: 0,
        limit: APP_LIMIT,
        shiftStatus: prev.shiftStatus.filter(
          (ss) => ss.label !== "All" && ss.label !== item.label,
        ),
      }));
    }
  };

  return (
    <>
      <div className="facility-payment-detail confirm-shift-table confirm-clinician">
        <div
          className="header"
          style={{ display: "flex" }}>
          <div
            className="user-sorting usertype"
            style={{ display: "flex" }}>
            <label htmlFor="type">Shift status</label>
            <div className="sort">
              <Select
                placeholder={"Select"}
                values={filters.shiftStatus}
                onChange={(val) => {
                  setFilters({
                    ...filters,
                    skip: 0,
                    limit: APP_LIMIT,
                    shiftStatus: val,
                  });
                }}
                options={shiftStatus}
                id="type"
                multi
                searchable={false}
                backspaceDelete={true}
                itemRenderer={({ item, methods }) => (
                  <div
                    className={`d-flex align-items-center p-1 cursor-pointer`}
                    onClick={(e) => {
                      handleShiftStatusFilters(e, item, methods);
                    }}>
                    <Input
                      className="mr-2"
                      type="checkbox"
                      checked={methods.isSelected(item)}
                      onChange={(e) => {
                        e.stopPropagation();
                      }}
                    />
                    <span className="ms-2 text-primary">{item.label}</span>
                  </div>
                )}
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
          {/* <div className="hourly me-0 ms-md-auto">
            <div className="hourly-select">
              <div
                className="user-sorting usertype"
                style={{ display: "flex" }}>
                <label htmlFor="type">Sort by</label>
                <div className="sort">
                  <Select
                    placeholder={confirmShiftsSortBy[0]?.label}
                    onChange={(val) => {
                      setSortFilters((prev) => ({
                        ...prev,
                        sortBy: val && val.length ? val[0].value : "",
                      }));
                    }}
                    options={confirmShiftsSortBy}
                    id="type"
                  />
                </div>
                {sortFilters?.sortBy && (
                  <div className="header">
                    <div className="user-sorting">
                      <div className="usertype">
                        <div className="hourly-btn mt-3">
                          <span
                            className={`uparrow ${
                              (sortFilters.direction === "aToZ" ||
                                !sortFilters?.direction) &&
                              "active"
                            }`}
                            onClick={() =>
                              setSortFilters((prev) => ({
                                ...prev,
                                direction:
                                  filters.direction !== "aToZ" ? "aToZ" : "",
                              }))
                            }>
                            <DownArrow />
                          </span>
                          <span
                            className={`down ${
                              sortFilters.direction === "zToA" && "active"
                            }`}
                            onClick={() =>
                              setSortFilters((prev) => ({
                                ...prev,
                                direction:
                                  filters.direction !== "zToA" ? "zToA" : "",
                              }))
                            }>
                            <DownArrow />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>
        <Modal
          centered
          isOpen={modal}
          toggle={toggleModal}
          // {...args}
          className="applicant-modal">
          <ModalHeader toggle={toggleModal}>
            Remove shift application
          </ModalHeader>
          <ModalBody>
            <label className="font-12 mb-24 d-block text-center">
              Are you sure you want to remove this shift application?
            </label>
            <div className="modal-footer">
              <button
                className="pt-btn btn-gray pt-btn-small"
                onClick={() => toggleModal()}>
                Cancel
              </button>
              <button
                className="pt-btn btn-primary pt-btn-small"
                onClick={() => handleApplicationRemove()}>
                Remove
              </button>
            </div>
          </ModalBody>
        </Modal>
        <DataTable
          columns={columns}
          data={data}
          progressPending={loader}
          progressComponent={<Spinner color="primary" />}
          sortIcon={<SortIcon />}
          noDataComponent={
            <p className="text-center no-records">No data found</p>
          }
        />
        <CustomPagination
          count={count}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      {/* <UploadTimeCardModal
        modal={uploadModal}
        toggle={uploadToggle}
        handleSave={(file) => handleUpdate(file)}
        serverTimeCard={selectedRow?.timeCardUrlForClinician}
      /> */}
      <EnterTimeSheetModal
        modal={enterSheetModal}
        toggle={() => {
          handleShiftslots({});
          setSelected({});
        }}
        getData={getData}
        selectedRow={selectedRow}
      />
      <DeleteTimeSheetModal
        modal={deleteSheetModal}
        toggle={() => deleteSheetToggle({})}
        data={timeSheetId}
        getData={getData}
      />
      <ReceiptClinicianModal
        data={selectedRow}
        isOpen={receiptModal}
        toggle={() => toggleReceiptModal({})}
        loading={loader}
        setLoading={setLoader}
        totalAmount={selectedRow?.totalAmount}
      />
    </>
  );
}

export default MyConfirmShifts;
