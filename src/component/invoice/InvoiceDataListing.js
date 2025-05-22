import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import "../../views/admin/invoice/invoice.scss";
// import '../userListing/userListing.scss';
import DataTable from "react-data-table-component";
import { ReactComponent as SortIcon } from "../../assets/images/icons/arrows-up.svg";
import AddressLabel from "component/common/AddressLabel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import DatesLabel from "component/common/DatesLabel";
import AdminViewTimeSheet from "component/modals/timesheets/AdminViewTimeSheet";
import { api } from "api/Api";
import {
  ADMIN_UPDATE_INVOICE_PAYMENT_STATUS,
} from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";

function InvoiceDataListing({
  data,
  filters,
  loader,
  getInvoiceData,
  open,
  setOpen,
}) {
  const [viewSheetModal, setViewTimesheet] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const columns = [
    {
      name: "Job ID",
      width: "100px",
      selector: (row, index) => (
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
      id: "shiftTime",
      name: "Day & Time",
      width: "135px",
      sortable: true,
      selector: (row) => (
        <DatesLabel
          arr={[
            {
              startDate: row.startTime,
              endDate: row.endTime,
            },
          ]}
          timeZone={row.timeZone}
        />
      ),
    },
    {
      name: "Hourly Rate",
      width: "150px",
      selector: (row) => <div>${row?.hourlyRate}</div>,
    },
    {
      name: "Total Hours",
      width: "150px",
      selector: (row) => <div>{row?.totalHours}</div>,
    },
    {
      name: "Clinician Type",
      width: "130px",
      selector: (row) => <div>{row?.clinicianType}</div>,
    },
    {
      name: "Name Of Applicant",
      width: "120px",
      selector: (row) => <div>{row?.fullName}</div>,
    },
    {
      name: "Payment Amount",
      width: "120px",
      selector: (row) => <div>${row.totalAmount}</div>,
    },
    {
      name: "Clinician Payment Amount",
      width: "120px",
      selector: (row) => (
        <div>${parseFloat(row.clinicianPaymentAmount.toFixed(2))}</div>
      ),
    },
    {
      name: "Clinician Payment Status",
      width: "100px",
      cell: (row) => {
        // If jobApplicationId is a single value
        const jobApplicationIds = row.jobApplicationId ? [row.jobApplicationId] : [];
    
        return (
          <div
            className="text-center d-flex flex-column align-items-center justify-content-center"
            style={{ marginBottom: "5px", width:"30px", height:"23px" }}
          >
            <label
              className="invoice-content toggle-switch"
              htmlFor={`clinicianPayment-${row.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                id={`clinicianPayment-${row.id}`}
                name={`clinicianPayment-${row.id}`}
                type="checkbox"
                checked={row.clinicianPaymentStatus === "completed" || row.clinicianPaymentStatus === "Completed"}
                onChange={(e) => {
                  e.stopPropagation();
    
                  toggleUpdatePayment(e.target.checked, jobApplicationIds, false);
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>
        );
      }
    },
    
    
    {
      name: "",
      width: "97px",
      selector: (row) => (
        <div>
          <Link
            className="text-primary"
            onClick={() => {
              setSelectedRow(row);
              setViewTimesheet(true);
            }}>
            Time Card
          </Link>
        </div>
    ),
    },
  ];

  // accordian toggle
  const toggle = (id) => {
    if (open === id) {
      setOpen("-1");
    } else {
      setOpen(id);
    }
  };

  // toggle payment status
  const toggleUpdatePayment = (check, jobApplicationIds, isForFacility) => {
    const payload = {
      jobApplicationIds,
      paymentStatus: check ? "completed" : "pending",
    };
  
    const params = { isForFacility: isForFacility ? 1 : 0 };
    api(ADMIN_UPDATE_INVOICE_PAYMENT_STATUS, payload, null, params).then(
      (res) => {
        if (res.data.status === RESPONSE_OK) {
          getInvoiceData(false); // fetch latest data without showing loader
        }
      },
    );
  };

  // loading
  if (loader) {
    return (
      <div className="my-4 d-flex justify-content-center">
        <Spinner />
      </div>
    );
  }

  // no data
  if (!loader && (!data || !data.length)) {
    return (
      <div className="my-4 d-flex justify-content-center">
        <p>There are no records to display.</p>
      </div>
    );
  }

  return (
    <div>
      <Row className="invoice-title-header">
        <Col>
          <p className="text-center">Facility Name and Address</p>
        </Col>
        <Col>
          <p className="text-center">Week Date</p>
        </Col>
        <Col>
          <p className="text-center">No of Shifts </p>
        </Col>
        <Col>
          <p className="text-center">Facility Payment Status</p>
        </Col>
        {/* <Col>
          <p className="text-center">Clinician Payment Status</p>
        </Col> */}
      </Row>
      <div className="invoice-section">
        <div className="invoice-accordian">
          <Accordion
            flush
            open={open}
            toggle={toggle}>
            {data &&
              data.length > 0 &&
              data.map((invoice, index) => (
                <AccordionItem key={index}>
                  <AccordionHeader targetId={`${index}`}>
                    <div className="accordion-content d-grid">
                      <div className="d-flex flex-column align-items-start justify-content-center ">
                        <h6>{invoice?.officeName}</h6>
                        <p className="address-label">Address:</p>
                        <p>
                          <AddressLabel
                            arr={[
                              {
                                jobAddressNickname: invoice.jobAddressNickname,
                                jobAddress1: invoice.jobAddress1,
                                jobAddress2: invoice.jobAddress2,
                                city: invoice.city,
                                state: invoice.state,
                                zipCode: invoice.zipCode,
                              },
                            ]}
                          />
                        </p>
                      </div>
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <p className="my-0">
                          From{" "}
                          {dayjs(invoice?.weekStartDate).format("MM/DD/YYYY")}
                        </p>
                        <p className="ext-wrap my-0">
                          To {dayjs(invoice?.weekEndDate).format("MM/DD/YYYY")}
                        </p>
                      </div>
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <p className="text-center">
                          No of shifts: {invoice?.jobs?.length}
                        </p>
                      </div>
                      <div
                        className="text-center d-flex flex-column align-items-center justify-content-center"
                        style={{ marginBottom: "10px" }}>
                        <label
                          className="toggle-switch"
                          htmlFor={`facilityPayment-${index}`}
                          onClick={(e) => e.stopPropagation()}>
                          <input
                            id={`facilityPayment-${index}`}
                            name={`facilityPayment-${index}`}
                            type="checkbox"
                            checked={invoice?.jobs?.every(
                              (j) => j.facilityPaymentStatus === "completed",
                            )}
                            onChange={(e) => {
                              const appIds = invoice?.jobs.map(
                                (j) => j.jobApplicationId,
                              );
                              toggleUpdatePayment(
                                e.target.checked,
                                appIds,
                                true,
                              ); // 3rd arg for facilityPayment
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      {/* <div
                        className="text-center d-flex flex-column align-items-center justify-content-center"
                        style={{ marginBottom: "10px" }}>
                        <label
                          className="toggle-switch"
                          htmlFor={`clinicianPayment-${index}`}
                          onClick={(e) => e.stopPropagation()}>
                          <input
                            id={`clinicianPayment-${index}`}
                            name={`clinicianPayment-${index}`}
                            type="checkbox"
                            checked={invoice?.jobs?.every(
                              (j) => j.clinicianPaymentStatus === "completed",
                            )}
                            onChange={(e) => {
                              e.stopPropagation();
                              const appIds = invoice?.jobs.map(
                                (j) => j.jobApplicationId,
                              );
                              toggleUpdatePayment(
                                e.target.checked,
                                appIds,
                                false,
                              ); // 3rd arg for facilityPayment
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div> */}
                    </div>
                  </AccordionHeader>
                  <AccordionBody accordionId={`${index}`}>
                    <DataTable
                      columns={columns}
                      data={invoice?.jobs}
                      sortIcon={<SortIcon />}
                    />
                  </AccordionBody>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
      <AdminViewTimeSheet
        modal={viewSheetModal}
        toggle={() => {
          setViewTimesheet((prev) => !prev);
          setSelectedRow({});
        }}
        data={selectedRow}
      />
    </div>
  );
}

export default InvoiceDataListing;
