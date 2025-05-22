import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledPopover,
} from "reactstrap";
import { Options, TickCalender } from "../../assets/svg";
import CustomPagination from "../common/customPagination";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";

function ClinicianUserListing({ list, args }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [modal, setModal] = useState(false);
  const sort = [
    { value: "Name", label: "Name" },
    { value: "Date", label: "Date" },
    { value: "Other", label: "Other" },
  ];

  const toggleModal = () => setModal(!modal);
  const columns = [
    {
      name: "User ID",
      selector: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.firstName + row.lastName,
    },
    {
      name: "Joined",
      selector: (row) => row.createdAt,
    },
    {
      name: "No of Shifts",
      selector: (row) => row.shiftstatus,
    },
    {
      name: "Rating",
      selector: (row) => row.timeworked,
    },
    {
      name: "Status",
      selector: (row) => {
        return row.amount;
      },
    },
    {
      name: "",
      selector: (row) => row.applicant,
    },
    {
      name: "",
      selector: (row) => row.jobdetail,
    },
    {
      name: "",
      selector: (row) => (
        <Fragment key={row.id}>
          <Button id="UncontrolledPopover" className="table-dot" type="button">
            {" "}
            <Options />
          </Button>
          <UncontrolledPopover
            id="table-option"
            placement="bottom"
            target="UncontrolledPopover"
            trigger="legacy"
          >
            <Link>Edit </Link>
            <Link>Delete</Link>
          </UncontrolledPopover>
        </Fragment>
      ),
    },
  ];

  return (
    <>
      <div className="facility-payment-detail">
        <div className="header">
          <div className="userfilter">
            <label htmlFor="filter">Filter</label>
            <div className="daterange-input">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="10/12/2022 - 11/03/2022"
              />
              <TickCalender />
            </div>
          </div>
          <div className={"user-sorting"}>
            <div className="sort">
              <Select options={sort} placeholder="Sort" />
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={list} />
        <CustomPagination />

        <Modal
          centered
          isOpen={modal}
          toggle={toggleModal}
          {...args}
          className="applicant-modal"
        >
          <ModalHeader toggle={toggleModal}>Review applicants</ModalHeader>
          <ModalBody>
            <label className="font-12 mb-24 d-block text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua ?
            </label>
            <div className="modal-footer">
              <button className="pt-btn btn-gray pt-btn-small">Cancel</button>
              <button className="pt-btn btn-primary pt-btn-small">
                Accept
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default ClinicianUserListing;
