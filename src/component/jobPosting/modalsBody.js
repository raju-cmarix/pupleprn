import React, { useState } from "react";
import Select from "react-dropdown-select";
import { Col, Input, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { JobPostSuccess } from "../../assets/svg";
import { Link } from "react-router-dom";
import { state } from "../../views/authentication/signUpClinician/HourlyConstant";
import {
  OnShiftManagementPage,
  YearsOfPracticeString,
} from "constants/AppConstants";

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

const facilityType = [
  { value: "Outpatient", label: "Outpatient" },
  { value: "Inpatient", label: "Inpatient" },
  { value: "Sports Facility", label: "Sports Facility" },
  { value: "Acute Care", label: "Acute Care" },
  { value: "Rehab Facility", label: "Rehab Facility" },
  { value: "SNF", label: "SNF" },
  { value: "LTACH", label: "LTACH" },
  { value: "Other", label: "Other" },
];
const clinicianType = [
  { value: "PT", label: "PT" },
  { value: "PTA", label: "PTA" },
  { value: "OT", label: "OT" },
  { value: "OTA", label: "OTA" },
  { value: "COTA", label: "COTA" },
  { value: "SLP", label: "SLP" },
];

export const experience = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
  { value: "32", label: "32" },
  { value: "33", label: "33" },
  { value: "34", label: "34" },
  { value: "35", label: "35" },
  { value: "36", label: "36" },
  { value: "37", label: "37" },
  { value: "38", label: "38" },
  { value: "39", label: "39" },
  { value: "40", label: "40" },
  { value: "41", label: "41" },
  { value: "42", label: "42" },
  { value: "43", label: "43" },
  { value: "44", label: "44" },
  { value: "45", label: "45" },
  { value: "46", label: "46" },
  { value: "47", label: "47" },
  { value: "48", label: "48" },
  { value: "49", label: "49" },
  { value: "50", label: "50" },
];

export const NewJobForm = () => {
  return (
    <>
      <Row>
        <Col md={12}>
          <div className="form-group">
            <label>Facility type:</label>
            <Select
              options={facilityType}
              placeholder="Select"
            />
          </div>
        </Col>
        <Col md={12}>
          <div className="form-group">
            <label>Clinician type:</label>
            <Select
              options={clinicianType}
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
        </Col>
        <Col md={12}>
          <div className="form-group">
            <label>{YearsOfPracticeString}:</label>
            <Select
              options={experience}
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
              options={state}
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
                  placeholder="Select"
                  options={time}
                />
              </div>
            </div>
          </Col>
          <Col className="weektiming mb-12 px-sm-3 px-1">
            <div className="weekfrom d-flex align-items-center">
              <label className="font-12 me-2">End time:</label>
              <div className="signup-select max-80">
                <Select
                  placeholder="Select"
                  options={time}
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
      <label className="font-12 mb-24 d-block">
        Select a default time (you can edit them individually on the next
        screen):
      </label>
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
                  placeholder="Select"
                  options={time}
                />
              </div>
            </div>
            <div className="weekfrom d-inline-flex align-items-center">
              <label className="font-12 me-2">End time:</label>
              <div className="signup-select max-80">
                <Select
                  placeholder="Select"
                  options={time}
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
                  placeholder="Select"
                  options={time}
                />
              </div>
            </div>
            <div className="weekfrom d-inline-flex align-items-center">
              <label className="font-12 me-2">End time:</label>
              <div className="signup-select max-80">
                <Select
                  placeholder="Select"
                  options={time}
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
