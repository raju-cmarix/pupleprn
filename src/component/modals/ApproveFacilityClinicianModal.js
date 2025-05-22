import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { APPROVE_REJECT_BY_ADMIN_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function ApproveFacilityClinicianModal({
  modal,
  toggle,
  data,
  getData,
}) {
  const [approveLoader, setApproveLoader] = useState(false);
  const handleApprove = () => {
    setApproveLoader(true);
    api(APPROVE_REJECT_BY_ADMIN_URL, {
      userId: data.id,
      status: "approved",
      isApprovedByAdmin: true,
    }).then((res) => {
      if (res.status === RESPONSE_OK) getData();

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
      <ModalHeader toggle={() => toggle()}>Approve Request</ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Do you want to approve this{" "}
          {data?.facilityId ? "facility" : "clinician"}?
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
            label={"Approve"}
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => handleApprove()}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
