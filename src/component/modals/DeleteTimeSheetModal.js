import { api } from "api/Api";
import { DELETE_TIMESHEET } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function DeleteTimeSheetModal({ modal, toggle, data, getData }) {
    const handleDeleteSheet = () => {
    api(DELETE_TIMESHEET, {}, data, null).then((res) => {
      if (res.status === RESPONSE_OK) {
        toggle();
        getData(false);
      } else {
        toggle();
      }
    });
    }

  return (
    <Modal centered isOpen={modal} toggle={toggle} className="applicant-modal">
      <ModalHeader toggle={toggle}>Delete Time Sheet</ModalHeader>
      <ModalBody>
        <label className="font-12 mb-24 d-block text-center">
          Are you sure you want to delete this Time Sheet?
        </label>
        <div className="modal-footer">
          <button className="pt-btn btn-gray pt-btn-small" onClick={toggle}>Cancel</button>
          <button
            className="pt-btn btn-primary pt-btn-small"
            onClick={handleDeleteSheet}
          >
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
