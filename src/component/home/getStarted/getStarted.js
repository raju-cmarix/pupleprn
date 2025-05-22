import React from "react";
import {
  BookClinicIcon,
  BookTherapistIcon,
  FindJobShiftIcon,
  GetStartedFlag,
  PostShiftIcon,
} from "../../../assets/svg";
import "./getStarted.scss";

function GetStarted() {
  return (
    <>
      <div className="get-started-main">
        <div className="custom-container">
          <div className="title">
            <h2>
              <GetStartedFlag />
              Two Easy Ways to Get <span>Started</span>!
            </h2>
          </div>
          <h4>For Clinicians</h4>
          <div className="get-started-content">
            <div className="whats-box">
              <FindJobShiftIcon />
              <h5>Find Shifts on the Shift Board</h5>
              <ul>
                <li>
                  <span>1</span>
                  <p>Create your free account</p>
                </li>
                <li>
                  <span>2</span>
                  <p>Search and apply to open shifts in your area</p>
                </li>
                <li>
                  <span>3</span>
                  <p>Carry out your shift</p>
                </li>
                <li>
                  <span>4</span>
                  <p>Rate your experience</p>
                </li>
                <li>
                  <span>5</span>
                  <p>Get paid!</p>
                </li>
              </ul>
            </div>
            <div className="whats-box">
              <BookClinicIcon />
              <h5>Get Booked by Clinics</h5>
              <ul>
                <li>
                  <span>1</span>
                  <p>Create your free account</p>
                </li>
                <li>
                  <span>2</span>
                  <p>Set your available times</p>
                </li>
                <li>
                  <span>3</span>
                  <p>Get a notification when a clinic books you</p>
                </li>
                <li>
                  <span>4</span>
                  <p>Carry out your shift </p>
                </li>
                <li>
                  <span>5</span>
                  <p>Rate your experience</p>
                </li>
                <li>
                  <span>6</span>
                  <p>Get paid!</p>
                </li>
              </ul>
            </div>
          </div>
          <h4 className="mt-5">For Facilities</h4>
          <div className="get-started-content">
            <div className="whats-box">
              <BookTherapistIcon />
              <h5>“Instantly” book therapists</h5>
              <ul>
                <li>
                  <span>1</span>
                  <p>Create your free account</p>
                </li>
                <li>
                  <span>2</span>
                  <p>
                    Search available clinicians on the day(s) you need coverage
                  </p>
                </li>
                <li>
                  <span>3</span>
                  <p>Click "book" on a clinician that matches your needs</p>
                </li>
                <li>
                  <span>4</span>
                  <p>Clinician reviews and accepts shift</p>
                </li>
                <li>
                  <span>5</span>
                  <p>The clinician works their shift at your facility</p>
                </li>
                <li>
                  <span>5</span>
                  <p>Purple PT handles payment directly on your behalf</p>
                </li>
              </ul>
            </div>
            <div className="whats-box">
              <PostShiftIcon />
              <h5>Post a shift to the Job Board </h5>
              <ul>
                <li>
                  <span>1</span>
                  <p>Create your free account</p>
                </li>
                <li>
                  <span>2</span>
                  <p>Add a shift, fill out the details</p>
                </li>
                <li>
                  <span>3</span>
                  <p>Therapists get a notification on their smartphone</p>
                </li>
                <li>
                  <span>4</span>
                  <p>Review qualified clinicians and select the best fit</p>
                </li>
                <li>
                  <span>5</span>
                  <p>The clinician works their shift at your facility</p>
                </li>
                <li>
                  <span>6</span>
                  <p>Purple PT handles payments directly on your behalf</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
