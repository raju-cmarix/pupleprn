import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function DeleteAJobModal({ modal, toggle, deleteCallback }) {
  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="applicant-modal">
      <ModalHeader toggle={toggle}>Delete shift post</ModalHeader>
      <ModalBody>
        <label className="font-12 mb-24 d-block text-center">
          Are you sure you want to delete this Shift post?
        </label>
        <div className="modal-footer">
          <button className="pt-btn btn-gray pt-btn-small">Cancel</button>
          <button
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => deleteCallback()}>
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
