import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import {CLINICIAN_NOTIFICATION_SETTING_UPDATE } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function NotificationSettingPopup({ modal, toggle, clinicianId }) {
 
  const navigate = useNavigate();

  // Function to update notification settings
  const updateNotificationSetting = (shouldNavigate) => {
    api(CLINICIAN_NOTIFICATION_SETTING_UPDATE, {clinicianId:clinicianId, isShowNotificationPopup: false })
      .then((res) => {
        if (res.status === RESPONSE_OK) {
          toggle(); // Close modal
          if (shouldNavigate) {
            navigate(`/clinician/settings`); // Navigate only for "Yes"
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
      <ModalHeader toggle={false}>Update Notification Settings</ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center p-10px">
          It's been 6 weeks since you last updated your notification preferences. Please review your settings to ensure you receive important updates on your preferred days.
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









