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

export default function AllClinicianBroadcastPopup({ modal, toggle, clinicianId, notifyPreferences }) {
//   const navigate = useNavigate();
 let notificationText = notifyPreferences.notifyText
 let notificationTitle = notifyPreferences.notifyTitle
  // Function to update notification settings
  const updateNotificationSetting = (shouldNavigate) => {
    api(CLINICIAN_NOTIFICATION_SETTING_UPDATE, {
      clinicianId: clinicianId,
      isNotify: false,
    })
      .then((res) => {
        if (res.status === RESPONSE_OK) {
            toggle();
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
        {notificationTitle}
      </ModalHeader>
      <ModalBody>
        <p  dangerouslySetInnerHTML={{ __html: notificationText }}
       className="font-12 mb-24 d-block text-center p-10px">
         {/* {notificationText} */}
        </p>
         <div className="text-center">
                    <FormButton
                      className={'pt-btn-small pt-btn btn-primary editexp-btn'}
                      type="submit"
                      label={'Ok'}
                      onClick={() => updateNotificationSetting(true)}
                    />
                  </div>
        {/* <div className="modal-footer">
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
        </div> */}
      </ModalBody>
    </Modal>
  );
}
