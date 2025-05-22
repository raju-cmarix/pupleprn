import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { ADMIN_EDIT_JOB_POST_DETAILS_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function MakeJobPostedModal({ modal, toggle, data, getList }) {
  const [loader, setLoader] = useState(false);

  const handleUpdateJobPosted = () => {
    setLoader(true);
    api(ADMIN_EDIT_JOB_POST_DETAILS_URL, {
      ...data,
      status: "posted",
    })
      .then((res) => {
        if (res.status === RESPONSE_OK) {
          getList();
        }
      })
      .catch((error) => {
        console.error("Job status updation Error: ", error);
      })
      .finally(() => {
        setLoader(false);
        toggle();
      });
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => toggle()}
      className="applicant-modal">
      <ModalHeader toggle={() => toggle()}>Update Job to Posted</ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Do you want to update the job status to Posted?
        </p>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => toggle()}>
            Cancel
          </button>
          <FormButton
            loader={loader}
            label={"Submit"}
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => handleUpdateJobPosted()}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
