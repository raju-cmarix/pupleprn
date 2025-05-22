import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { APPROVE_REJECT_BY_ADMIN_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function DeactivateFacilityClinicianModal({
  modal,
  toggle,
  data,
  getData,
  status,
}) {
  const [approveLoader, setApproveLoader] = useState(false);
  const handleApprove = () => {
    setApproveLoader(true);
    let user = data?.clinicianId || data?.facilityId;
    let isApprovedByAdmin =
      data?.roles === "facility"
        ? data?.isApprovedByAdmin
        : data?.isApprovedByAdmin;
    let s = "",
      iAA = false;
    if (!user?.isSignupCompleted && status === "pending") {
      s = "deactivate";
      iAA = false;
    }

    if (user?.isSignupCompleted && !isApprovedByAdmin && status === "pending") {
      s = "deactivate";
      iAA = false;
    }

    if (user?.isSignupCompleted && isApprovedByAdmin && status === "approved") {
      s = "deactivate";
      iAA = true;
    }
    if (!user?.isSignupCompleted && data?.status === "deactivate") {
      s = "pending";
      iAA = false;
    }

    if (
      user?.isSignupCompleted &&
      !isApprovedByAdmin &&
      data?.status === "deactivate"
    ) {
      s = "pending";
      iAA = false;
    }

    if (
      user?.isSignupCompleted &&
      isApprovedByAdmin &&
      data?.status === "deactivate"
    ) {
      s = "approved";
      iAA = true;
    }

    api(APPROVE_REJECT_BY_ADMIN_URL, {
      userId: data.id,
      status: s,
      isApprovedByAdmin: iAA,
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
      <ModalHeader toggle={() => toggle()}>
        {status !== "deactivate" ? "Deactivate User" : " Activate User"}
      </ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Do you want to {status !== "deactivate" ? "deactivate" : " activate"}{" "}
          this {data?.facilityId ? "facility" : "clinician"}?
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
            label={status !== "deactivate" ? "Deactivate" : " Activate"}
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => handleApprove()}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
