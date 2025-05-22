import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { ADMIN_CANCEL_SHIFT } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function CancelShiftPopup({ modal, toggle }) {
  const [approveLoader, setApproveLoader] = useState(false);
  const handleApprove = () => {
    setApproveLoader(true);
    api(ADMIN_CANCEL_SHIFT, { id: modal }).then((res) => {
      if (res.status === RESPONSE_OK) toggle();
      setApproveLoader(false);
    });
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => toggle()}
      className="applicant-modal"
    >
      <ModalHeader toggle={() => toggle()}>Cancel Confirmed Shift</ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Do you want to Cancel this confirmed shift?
        </p>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => toggle()}
          >
            No
          </button>
          <FormButton
            loader={approveLoader}
            label="Yes"
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => handleApprove()}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
