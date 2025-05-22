import { api } from "api/Api";
import DatesLabel from "component/common/DatesLabelCard";
import { CLINICIAN_REMOVE_APPLICATION } from "constants/ApiUrls";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, UncontrolledTooltip } from "reactstrap";
import { CrossIcon, MsgIcon, StarRatingIcon } from "../../assets/svg";
import { CANCEL, CONFIRMED, SmallLogoURL } from "constants/AppConstants";

function JobCard(props, args) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal({
        jobApplicationId: props?.data?.jobApplicationId,
        clinicianId: props?.clinicianId,
      });
    }
  };

  const handleApplicationRemove = () => {
    api(
      CLINICIAN_REMOVE_APPLICATION,
      {
        jobApplicationId: props?.data?.jobApplicationId,
        clinicianId: props?.clinicianId,
      },
      null,
      {},
    )
      .then((res) => {
        props.refresh();
        toggleModal();
      })
      .catch((err) => {
        props.refresh();
        toggleModal();
      });
  };

  return (
    <>
      <div className="applicant-box">
        <div className="applicant-name-img">
          <img
            src={props.img || SmallLogoURL}
            alt="Company logo"
          />
          <span>{props?.data?.officeName || props.maintitle}</span>
          {props.maintitle === undefined ? (
            <span className="clinician-type">{props?.data?.clinicianType}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="applicant-time">
          {props?.jobBoard ? (
            <p>
              {props?.data?.status !== "accepted" ? (
                <span>Zipcode: </span>
              ) : (
                <span>Location: </span>
              )}
              {props?.data?.zipCode ||
                props.data?.officeAddressZipCode ||
                props.data?.facilityId?.officeAddressZipCode}
            </p>
          ) : (
            <p>
              {!CONFIRMED?.includes(props?.data?.status) ? (
                <span>Zipcode: </span>
              ) : (
                <span>Location: </span>
              )}
              {props.data?.zipCode}
            </p>
          )}
        </div>
        <div className="applicant-time">
          <p>
            <span>Date & Time: </span>
            <DatesLabel
              arr={props.datetime}
              jobId={props.jobId}
            />
          </p>
        </div>
        <div className="applicant-review">
          <div className="ratings">
            <StarRatingIcon /> <h4>{props.rating || ""}</h4>{" "}
            <p>{props.review}</p>
          </div>
          <div className="rate">
            <p>
              <b>Hourly Rate:</b> ${props.perhour}
            </p>
            {/* {LUNCH_BREAK(props?.datetime, true)} */}
          </div>
        </div>
        <div className="applicant-btn">
          <Link
            to={`/clinician/jobprofile/${props.jobId}`}
            className="pt-btn btn-primary pt-btn-small">
            View details
          </Link>
          {/* {props.data?.status !== "pending" && ( */}
          <h3
            className={`text-${
              props.data?.status === "rejected" || props.data?.status === CANCEL
                ? "danger"
                : props.data?.status === "pending"
                ? "primary"
                : "secondary"
            } mb-0`}>
            {props.data?.status === "accepted"
              ? "Confirmed"
              : props.data?.status === "pending"
              ? "Pending"
              : props.data?.status === CANCEL
              ? "Cancelled"
              : "Declined"}
          </h3>
          {/* )} */}
          <div className="icon-group">
            {" "}
            {props.data?.status === "accepted" && (
              <>
                <Link
                  to="/chat-profile"
                  state={{ receiverId: props.data.facilityId.userId }}
                  id={"view" + props.data?.id}
                  className="pt-btn-icon btn-info">
                  <MsgIcon />
                </Link>
                <UncontrolledTooltip
                  placement="bottom"
                  target={"view" + props.data?.id}>
                  Chat
                </UncontrolledTooltip>
              </>
            )}
            {props.data?.status === "pending" && (
              <>
                <button
                  id={"rej" + props.data?.id}
                  className="pt-btn-icon btn-danger"
                  onClick={toggleModal}>
                  <CrossIcon />
                </button>

                <UncontrolledTooltip
                  placement="bottom"
                  target={"rej" + props.data?.id}>
                  Remove
                </UncontrolledTooltip>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        centered
        isOpen={modal}
        toggle={toggleModal}
        {...args}
        className="applicant-modal">
        <ModalHeader toggle={toggleModal}>Remove shift application</ModalHeader>
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
    </>
  );
}

export default JobCard;
