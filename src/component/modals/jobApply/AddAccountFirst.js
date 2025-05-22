import { AddAccountFirstTexts } from "constants/AppConstants";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";

export default function AddAccountFirstModal({ modal, toggle, apply }) {
  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{AddAccountFirstTexts?.header}</ModalHeader>
      <Form>
        <ModalBody><p>{AddAccountFirstTexts?.body}</p></ModalBody>
        <div className="modal-footer">
          <button
            type="button"
            className="pt-btn btn-primary pt-btn-small"
            onClick={toggle}
          >
            Close
          </button>
          <button
            type="button"
            className="pt-btn btn-primary pt-btn-small"
            onClick={apply}
          >
            Apply anyway
          </button>
        </div>
      </Form>
    </Modal>
  );
}
