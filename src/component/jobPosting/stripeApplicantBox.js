import React, { useState } from "react";
import { StarRatingIcon } from "../../assets/svg";
import User from "../../assets/images/Jonathan.jpg";
import { Modal, ModalBody, ModalHeader, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";

const ApplicantCard = (args) => {
  const [modal, setModal] = useState(false);
  const [modalapprove, setModalapprove] = useState(false);
  const [modaldelete, setModaldelete] = useState(false);

  const toggleModal = () => setModal(!modal);
  const toggleModalapprove = () => setModalapprove(!modalapprove);
  const toggleModaldelete = () => setModaldelete(!modaldelete);

  return (
    <>
      <div className="applicant-box">
        <div className="applicant-name-img">
          <img
            src={User}
            alt={User}
          />
          <span>Jonathan D.</span>
        </div>
        <div className="applicant-time">
          <span>Date & Time :</span>
          <p id="Time">
            Jul 18, 2022{" "}
            <span>
              10:30 - 16:30
              <UncontrolledTooltip
                placement="bottom"
                target="Time">
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
              </UncontrolledTooltip>
            </span>
          </p>
          <p id="Time1">
            Jul 18, 2022{" "}
            <span>
              10:30 - 16:30
              <UncontrolledTooltip
                placement="bottom"
                target="Time1">
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
              </UncontrolledTooltip>
            </span>
          </p>
          <p id="Time2">
            Jul 18, 2022{" "}
            <span>
              10:30 - 16:30{" "}
              <UncontrolledTooltip
                placement="bottom"
                target="Time2">
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
                <p className="mb-0">Jul 18, 2022 10:30 - 16:30</p>
              </UncontrolledTooltip>
            </span>
          </p>
        </div>
        <div className="applicant-status">Applicant has proposed new times</div>
        <div className="applicant-review">
          <div className="ratings">
            <StarRatingIcon /> <h4>4/5</h4> <p>(12 reviews)</p>
          </div>
          <b>$55 per hour</b>
        </div>
        <div className="applicant-btn">
          <Link className="pt-btn btn-primary pt-btn-small">View details</Link>
        </div>
      </div>
      <Modal
        centered
        isOpen={modal}
        toggle={toggleModal}
        {...args}
        className="applicant-modal">
        <ModalHeader toggle={toggleModal}>Reject Applicant</ModalHeader>
        <ModalBody>
          <label className="font-12 mb-24 d-block text-center">
            Are you sure you want to reject this clinician?
          </label>
          <div className="modal-footer">
            <button className="pt-btn btn-gray pt-btn-small">Cancel</button>
            <button className="pt-btn btn-primary pt-btn-small">Reject</button>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        centered
        isOpen={modalapprove}
        toggle={toggleModalapprove}
        {...args}
        className="applicant-modal">
        <ModalHeader toggle={toggleModalapprove}>Send job offer!</ModalHeader>
        <ModalBody>
          <label className="font-12 mb-24 d-block text-center">
            Are you sure you want to select this clinician?
          </label>
          <div className="modal-footer">
            <button className="pt-btn btn-gray pt-btn-small">Cancel</button>
            <button className="pt-btn btn-primary pt-btn-small">Approve</button>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        centered
        isOpen={modaldelete}
        toggle={toggleModaldelete}
        {...args}
        className="applicant-modal">
        <ModalHeader toggle={toggleModaldelete}>Delete shift post</ModalHeader>
        <ModalBody>
          <label className="font-12 mb-24 d-block text-center">
            Are you sure you want to delete this shift post?
          </label>
          <div className="modal-footer">
            <button className="pt-btn btn-gray pt-btn-small">Cancel</button>
            <button className="pt-btn btn-primary pt-btn-small">Delete</button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ApplicantCard;
