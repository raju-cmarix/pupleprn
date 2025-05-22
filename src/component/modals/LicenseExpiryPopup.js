import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import {
  ADMIN_CANCEL_SHIFT,
  CLINICIAN_NOTIFICATION_SETTING_UPDATE,
} from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function LicenseExpiryPopup({ modal, toggle, clinicianId }) {
  const navigate = useNavigate();

  // Function to update notification settings
  const updateNotificationSetting = (shouldNavigate) => {
    api(CLINICIAN_NOTIFICATION_SETTING_UPDATE, {
      clinicianId: clinicianId,
      isShowLicensePopup: false,
    })
      .then((res) => {
        if (res.status === RESPONSE_OK) {
         
          if (shouldNavigate) {
            navigate(`/clinician/settings`); // Navigate only for "Yes"
          } else {
            toggle();
          }
        }
      })
      .catch((err) => {
        console.error("Error updating notification settings:", err);
      });
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => toggle()}
      className="applicant-modal"
    >
      <ModalHeader className="p-10" toggle={false}>
         License Expiration
      </ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center p-10px">
          Your clinician license is about to expire, please go to account
          settings and update your expiration date.
        </p>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => updateNotificationSetting(false)} // No: API call but no navigation
          >
            Ignore
          </button>
          <FormButton
            label="Update"
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => updateNotificationSetting(true)} // Yes: API call + navigation
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
