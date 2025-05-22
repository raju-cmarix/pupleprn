import { cardLastDigits } from "constants/AppConstants";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function DeleteCard({ modal, toggle, deleteCallback, bank }) {
  return (
    <Modal centered isOpen={modal} toggle={toggle} className="applicant-modal">
      <ModalHeader toggle={toggle}>
        Delete Selected {bank ? "bank account" : "Card"}
      </ModalHeader>
      <ModalBody>
        <label className="font-12 mb-24 d-block text-center">
          Are you sure you want to delete this {bank ? "bank account" : "card"}?
          (
          {`••••
      ${cardLastDigits(bank ? modal?.last4 : modal?.lastDigits)}`}
          )
        </label>
        <div className="modal-footer">
          <button className="pt-btn btn-gray pt-btn-small" onClick={toggle}>
            Cancel
          </button>
          <button
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => deleteCallback()}
          >
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
