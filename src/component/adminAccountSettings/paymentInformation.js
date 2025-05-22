import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { ReactComponent as User } from "../../assets/images/icons/user-icon.svg";
import { AmericanExpressIcon, DotIcon, VisaIcon } from "../../assets/svg";
import BankBuilding from "../../assets/images/icons/bank.png";
import CustomPagination from "../../component/common/customPagination";
import Flatpickr from "react-flatpickr";
import { APP_LIMIT, STRIPE } from "../../constants/AppConstants";

function PaymentInformation(direction, args) {
  const initFilters = {
    skip: 0,
    limit: APP_LIMIT,
    forAdmin: 1,
    forFacility: 0,
    clinicianId: 0,
  };
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({ ...initFilters });
  const [add, setAdd] = useState(false);
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
  const Add = () => {
    setAdd(!add);
  };
  const toggleModal = () => setModal(!modal);
  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Shift ID",
      selector: (row) => row.transition,
      sortable: true,
    },
    {
      name: "Facility Name",
      selector: (row) => row.clinicianname,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount ? `$${row.amount}` : "-",
      // selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Deposit Bank ",
      selector: (row) => row.payment,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const data = [
    {
      date: "July 18, 2022",
      transition: "#1234567890",
      clinicianname: "Zydus Thempy Care",
      amount: "$250",
      payment: "XXXXXXXX123",
      status: <div className="text-secondary">Completed</div>,
    },
    {
      date: "July 18, 2022",
      transition: "#1234567890",
      clinicianname: "Zydus Thempy Care",
      amount: "$250",
      payment: "XXXXXXXX123",
      status: <div className="text-secondary">Completed</div>,
    },
  ];

  return (
    <>
      <div className="general-content login-content">
        <h5 className="mb-12">Direct Deposit Information</h5>
        <p>Add and manage your direct deposit info .</p>
        <div className="payment-cards">
          <div className="card-box">
            <div className="card-icon">
              <img
                src={BankBuilding}
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="card-detail">
              <p>Bank name</p>
              <p>XXXXXXXX123</p>
            </div>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              direction={direction}>
              <DropdownToggle className="p-0">
                <DotIcon />
              </DropdownToggle>
              <DropdownMenu id="card-menu">
                <DropdownItem onClick={function noRefCheck() {}}>
                  Set Default
                </DropdownItem>
                <DropdownItem onClick={function noRefCheck() {}}>
                  Remove
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className={add ? "card-box" : "card-box"}>
            <div className="card-icon">
              <img
                src={BankBuilding}
                alt="bank"
                className="img-fluid"
              />
            </div>
            <div className="card-detail">
              <p>Bank name</p>
              <p>XXXXXXXX123</p>
            </div>
            <Dropdown
              isOpen={dropdownOpen1}
              toggle={toggle1}
              direction={direction}>
              <DropdownToggle className="p-0">
                <DotIcon />
              </DropdownToggle>
              <DropdownMenu id="card-menu">
                <DropdownItem onClick={function noRefCheck() {}}>
                  Set Default
                </DropdownItem>
                <DropdownItem onClick={function noRefCheck() {}}>
                  Remove
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="payment-block mt-2">
          <button
            className="btn-link"
            onClick={toggleModal}>
            + add Bank Account Info
          </button>
        </div>
        <div className="text-center mt-4">
          <button className="pt-btn btn-primary pt-btn-small">Save</button>
        </div>
        <div className="dashed-border"></div>
        <h5 className="mb-12">Transactions</h5>
        <p>Add and manage your payment methods .</p>
        <div className="facility-payment-detail">
          <DataTable
            columns={columns}
            data={data}
          />
          <CustomPagination
            count={count}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
      <Modal
        centered
        isOpen={modal}
        toggle={toggleModal}
        {...args}>
        <ModalHeader toggle={toggleModal}>
          Change bank account through {STRIPE}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <div className="form-group w-100">
                <label htmlFor="cardnumber">Card Number:</label>
                <Input
                  id="cardnumber"
                  type="number"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="Expiration">Expiration:</label>
                <Flatpickr className="form-control" />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="CVV">CVC/CVV:</label>
                <Input id="CVV" />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="firstname">First Name:</label>
                <Input id="firstname" />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="Last Name">Last Name:</label>
                <Input id="Last Name" />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="Zipcde">Zipcde:</label>
                <Input id="Zipcde" />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group mb-4">
                <label htmlFor="Region">Country/Region:</label>
                <Input id="Region" />
              </div>
            </Col>
          </Row>
          <div className="text-center mt-2">
            <button
              className="pt-btn-small pt-btn btn-primary"
              onClick={toggle}>
              Save
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default PaymentInformation;
