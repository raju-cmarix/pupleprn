import React, { useState } from "react";
import Select from "react-dropdown-select";
import { Col, Input, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { JobPostSuccess } from "../../../assets/svg";
import { Link } from "react-router-dom";
import { OnShiftManagementPage } from "constants/AppConstants";

const Type = [
  { value: "Facility type", label: "Facility type" },
  { value: "Clinician type", label: "Clinician type" },
  { value: "Other", label: "Other" },
];
const rate = [
  { value: "$21/hr", label: "$21/hr" },
  { value: "$22/hr", label: "$22/hr" },
  { value: "$23/hr", label: "$23/hr" },
];
const time = [
  { value: "10:30", label: "10:30" },
  { value: "9:30", label: "9:30" },
  { value: "8:30", label: "8:30" },
];

export const NewJobForm = () => {
  return (
    <>
      <Row>
        <Col md={12}>
          <div className="form-group">
            <label>Facility type:</label>
            <Select
              options={Type}
              placeholder="Select"
            />
          </div>
        </Col>
        <Col md={12}>
          <div className="form-group">
            <label>Clinician type:</label>
            <Select
              options={Type}
              placeholder="Select"
            />
          </div>
        </Col>
        <Col md={12}>
          <div className="form-group">
            <label>Hourly rate:</label>
            <Select
              options={rate}
              placeholder="Select"
            />
          </div>
          <div className="dashed-border"></div>
        </Col>
        <Col md={12}>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <Input
              className="mb-12"
              id="location"
              type="text"
            />
            <Input type="text" />
          </div>
        </Col>
        <Col md={6}>
          <div className="form-group">
            <label>State:</label>
            <Select
              options={Type}
              placeholder="Select"
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code:</label>
            <Input
              id="zipcode"
              type="text"
            />
          </div>
        </Col>
        <Col md={12}>
          <div className="form-group">
            <label htmlFor="job">Shift Description:</label>
            <textarea
              id="job"
              className="form-control"
              rows={4}></textarea>
          </div>
        </Col>
      </Row>
    </>
  );
};

export const NewJobDate = () => {
  const [picker, setPicker] = useState(new Date());

  return (
    <>
      <div className="job-date-picker">
        <label className="font-12">Select Date:</label>
        <Flatpickr
          value={picker}
          id="range-picker"
          className="form-control"
          onChange={(date) => setPicker(date)}
          options={{
            mode: "range",
            defaultDate: ["2020-02-01", "2020-02-15"],
            inline: true,
          }}
        />
      </div>
    </>
  );
};

export const NewJobDays = () => {
  return (
    <>
      <label className="font-12 mb-24 d-block">
        Select a default time (you can edit them individually on the next
        screen):
      </label>
      <div className="days-available">
        <Row className="days">
          <Col className="weektiming mb-12 px-sm-3 px-1">
            <div className="weekfrom d-flex align-items-center">
              <label className="font-12 me-2">Arrival time:</label>
              <div className="signup-select max-80">
                <Select
                  options={time}
                  placeholder="Select"
                />
              </div>
            </div>
          </Col>
          <Col className="weektiming mb-12 px-sm-3 px-1">
            <div className="weekfrom d-flex align-items-center">
              <label className="font-12 me-2">End time:</label>
              <div className="signup-select max-80">
                <Select
                  options={time}
                  placeholder="Select"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export const NewJobTime = () => {
  return (
    <>
      <label className="font-12 mb-24 d-block">Edit time (optional):</label>
      <div className="days-available">
        <Row className="align-items-center">
          <Col
            sm={12}
            md={3}
            className="weektiming mb-12 pe-0">
            <label className="font-12">Mon 18 Jun, 2022</label>
          </Col>
          <Col
            sm={12}
            md={9}
            className="weektiming mb-12 pe-0">
            <div className="weekfrom d-inline-flex align-items-center me-2">
              <label className="font-12 me-2">Arrival time:</label>
              <div className="signup-select max-80">
                <Select
                  options={time}
                  placeholder="Select"
                />
              </div>
            </div>
            <div className="weekfrom d-inline-flex align-items-center">
              <label className="font-12 me-2">End time:</label>
              <div className="signup-select max-80">
                <Select
                  options={time}
                  placeholder="Select"
                />
              </div>
            </div>
          </Col>
          <Col
            sm={12}
            md={3}
            className="weektiming mb-12 pe-0">
            <label className="font-12">Mon 18 Jun, 2022</label>
          </Col>
          <Col
            sm={12}
            md={9}
            className="weektiming mb-12 pe-0">
            <div className="weekfrom d-inline-flex align-items-center me-2">
              <label className="font-12 me-2">Arrival time:</label>
              <div className="signup-select max-80">
                <Select
                  options={time}
                  placeholder="Select"
                />
              </div>
            </div>
            <div className="weekfrom d-inline-flex align-items-center">
              <label className="font-12 me-2">End time:</label>
              <div className="signup-select max-80">
                <Select
                  options={time}
                  placeholder="Select"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export const NewJobPost = () => {
  return (
    <>
      <div className="job-post">
        <p>Are you sure you’d like to post this shift?</p>
        <p>
          <span>Facility type</span>: Outpatient
        </p>
        <p>
          <span className="d-block">Date & Time:</span>
          Jul 18 - 24 , 2022 10:30 - 16:30; Jul 25 - 27 , 2022 10:30 - 15:30
        </p>
        <p>
          <span className="d-block">Location:</span>
          (806) 289-5948 Westway Canutillo McLaren, taxas (TX) 79835
        </p>
        <p>
          <span className="d-block">Shift description:</span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          <span>Pay: $660</span> ($60 per hour){" "}
        </p>
      </div>
    </>
  );
};

export const NewJobPostSuccess = () => {
  return (
    <>
      <div className="job-post-sucess">
        <JobPostSuccess />
        <p>
          <Link>Click here</Link> {OnShiftManagementPage}
        </p>
      </div>
    </>
  );
};
