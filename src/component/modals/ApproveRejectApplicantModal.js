import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function ApproveRejectApplicationModal({
  modal,
  toggle,
  isAccept,
  handleApplication,
}) {
  return (
    <Modal centered isOpen={modal} toggle={toggle} className="applicant-modal">
      <ModalHeader toggle={toggle}>
        {" "}
        {isAccept ? "Send job offer!" : "Reject Applicant"}
      </ModalHeader>
      <ModalBody>
        <label className="font-12 mb-24 d-block text-center">
          Are you sure you want to {isAccept ? "select" : "reject"} this
          clinician?
        </label>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => toggle()}
          >
            Cancel
          </button>
          <button
            className="pt-btn btn-primary pt-btn-small"
            onClick={() =>
              handleApplication(isAccept ? "accepted" : "rejected")
            }
          >
            {isAccept ? "Approve" : "Reject"}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
