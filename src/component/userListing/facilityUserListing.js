import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader, UncontrolledPopover } from "reactstrap";
import { Options, Uparrow, TickCalender, TableMsgIcon, Download } from "../../assets/svg";
import CustomPagination from "../common/customPagination";
import Flatpickr from "react-flatpickr";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";

function FacilityUserListing(direction, args) {

  const [picker, setPicker] = useState(new Date())
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const sort = [
    { value: 'Name', label: 'Name' },
    { value: 'Date', label: 'Date' },
    { value: 'Other', label: 'Other' },
  ]

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const columns = [
    {
      name: 'ID',
      selector: row => row.transition
    },
    {
      name: 'Name',
      selector: row => row.clinician
    },
    {
      name: 'Joined',
      selector: row => row.shift
    },
    {
      name: 'No of Shifts',
      selector: row => row.shiftstatus
    },
    {
      name: 'Rating',
      selector: row => row.timeworked
    },
    {
      name: 'Status',
      selector: row => row.amount
    },
    {
      name: '',
      selector: row => row.applicant,
    },
    {
      name: '',
      selector: row => row.jobdetail,
    },
    {
      name: '',
      selector: row => row.action,
    },
  ];

  const data = [
    {
      transition: '987654',
      clinician: "Edinburg Regional Medical Center",
      shift: 'Jul 18 , 2022',
      shiftstatus: <div >-</div>,
      timeworked: <div>-</div>,
      amount: <div className="text-secondary">Pending</div>,
      applicant: <div className="text-primary min-100"><Link onClick={toggleModal}>Review request</Link></div>,
      jobdetail: <div className="text-primary"><Link>View details</Link></div>,
      action: <>
        <Button
          id="UncontrolledPopover"
          className="table-dot"
          type="button"
        >  <Options />
        </Button>
        <UncontrolledPopover
          id="table-option"
          placement="bottom"
          target="UncontrolledPopover"
          trigger="legacy"
        >
          <Link>
            Edit                    </Link>
          <Link>
            Delete
          </Link>
        </UncontrolledPopover>
      </>,
    },
    {
      transition: '987654',
      clinician: "Edinburg Regional Medical Center",
      shift: 'Jul 18 , 2022',
      shiftstatus: <div >-</div>,
      timeworked: <div>-</div>,
      amount: <div className="text-secondary">Pending</div>,
      applicant: <div className="text-primary min-100"><Link onClick={toggleModal}>Review request</Link></div>,
      jobdetail: <div className="text-primary"><Link>View details</Link></div>,
      action: <>
        <Button
          id="UncontrolledPopover"
          className="table-dot"
          type="button"
        >  <Options />
        </Button>
        <UncontrolledPopover
          id="table-option"
          placement="bottom"
          target="UncontrolledPopover"
          trigger="legacy"
        >
          <Link>
            Edit                    </Link>
          <Link>
            Delete
          </Link>
        </UncontrolledPopover>
      </>,
    },
    {
      transition: '987654',
      clinician: "Edinburg Regional Medical Center",
      shift: 'Jul 1 , 2022',
      shiftstatus: <div >4</div>,
      timeworked: <div>4.4</div>,
      amount: <div className="text-primary">Approved</div>,
      applicant: <div className="text-primary min-100"><Link onClick={toggleModal}>Review request</Link></div>,
      jobdetail: <div className="text-primary"><Link>View details</Link></div>,
      action: <>
        <Button
          id="UncontrolledPopover"
          className="table-dot"
          type="button"
        >  <Options />
        </Button>
        <UncontrolledPopover
          id="table-option"
          placement="bottom"
          target="UncontrolledPopover"
          trigger="legacy"
        >
          <Link>
            Edit                    </Link>
          <Link>
            Delete
          </Link>
        </UncontrolledPopover>
      </>,
    },
    {
      transition: '987654',
      clinician: "Jonathan Davidson",
      shift: 'Jul 1 , 2022',
      shiftstatus: <div >4</div>,
      timeworked: <div>4.4</div>,
      amount: <div className="text-primary">Approved</div>,
      applicant: <div className="text-primary min-100"><Link onClick={toggleModal}>Review request</Link></div>,
      jobdetail: <div className="text-primary"><Link>View details</Link></div>,
      action: <>
        <Button
          id="UncontrolledPopover"
          className="table-dot"
          type="button"
        >  <Options />
        </Button>
        <UncontrolledPopover
          id="table-option"
          placement="bottom"
          target="UncontrolledPopover"
          trigger="legacy"
        >
          <Link>
            Edit                    </Link>
          <Link>
            Delete
          </Link>
        </UncontrolledPopover>
      </>,
    },
  ]

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
          <div className="user-sorting">
            <div className="sort">
              <Select options={sort} placeholder="Sort" />
            </div>
          </div>
          <div className="download-icon"><Download /></div>
        </div>
        <DataTable
          columns={columns}
          data={data}
        />
        <CustomPagination />

        <Modal centered isOpen={modal} toggle={toggleModal} {...args} className="applicant-modal">
          <ModalHeader toggle={toggleModal}>Review request</ModalHeader>
          <ModalBody>
          <label className="font-12 mb-24 d-block text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ?</label>
            <div className="modal-footer">
              <button className="pt-btn btn-gray pt-btn-small">
                Cancel
              </button>
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

export default FacilityUserListing;
