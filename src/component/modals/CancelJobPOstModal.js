import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { ADMIN_CANEL_JOB } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function CancelJobPOstModal({ modal, toggle, onDone, id }) {
  const [approveLoader, setApproveLoader] = useState(false);
  const handleApprove = () => {
    setApproveLoader(true);
    api(ADMIN_CANEL_JOB, {}, id)
      .then((res) => {
        if (res.status === RESPONSE_OK) onDone();
      })
      .finally(() => {
        setApproveLoader(false);
      });
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => toggle()}
      className="applicant-modal">
      <ModalHeader toggle={() => toggle()}>Delete Job Post</ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Do you want to Delete this shift post?
        </p>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => toggle()}>
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
