import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { RESET_FACILITY_PASSWORD_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function ResetFacilityPasswordModal({
  modal,
  toggle,
  data,
}) {
  const [approveLoader, setApproveLoader] = useState(false);
  const handleReset = (userId) => {
    api(RESET_FACILITY_PASSWORD_URL, null, userId = data.userId.id)
    .then((res) => {
      if (res.status === RESPONSE_OK) {
        toggle();
      }
      setApproveLoader(false);
    });

  }

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => toggle()}
      className="applicant-modal"
    >
      <ModalHeader toggle={() => toggle()}>
        {`Reset Password`}
      </ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Do you want to reset the password?
        </p>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => toggle()}
          >
            Cancel
          </button>
          <FormButton
            loader={approveLoader}
            label={`Reset`}
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => handleReset()}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
