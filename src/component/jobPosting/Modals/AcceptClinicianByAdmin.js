import { PaymentMethods } from "constants/AppConstants";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const AcceptClinicianByAdmin = (props) => {
  return (
    <Modal
      centered
      isOpen={props?.isOpen}
      toggle={props?.toggle}
      className="applicant-modal"
    >
      <ModalHeader toggle={props?.toggle}>Approve Clinician</ModalHeader>
      <ModalBody>
        <label className="font-12 mb-24 d-block text-center">
          Are you sure you want to approve this clinician?
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
            onClick={() =>
              props?.handleApplication({
                paymentMethod: PaymentMethods?.Invoice,
              })
            }
          >
            Approve
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AcceptClinicianByAdmin;
