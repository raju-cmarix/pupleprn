import { RejectClinicianApplicationTexts } from "constants/AppConstants";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const RejectClinicianApplication = (props) => {
  return (
    <Modal
      centered
      isOpen={props?.isOpen}
      toggle={props?.toggle}
      className="applicant-modal"
    >
      <ModalHeader toggle={props?.toggle}>
        {RejectClinicianApplicationTexts?.header}
      </ModalHeader>
      <ModalBody>
        <label className="font-12 mb-24 d-block text-center">
          {RejectClinicianApplicationTexts?.label}
        </label>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={props?.toggle}
          >
            Cancel
          </button>
          <button
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => props?.handleApplication()}
          >
            Reject
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RejectClinicianApplication;
