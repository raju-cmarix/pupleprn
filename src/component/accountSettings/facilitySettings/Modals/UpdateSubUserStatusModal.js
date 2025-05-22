import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { UPDATE_SUB_USER } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function UpdateSubUserStatusModal({
  modal,
  toggle,
  data,
  getData,
}) {
  const [loader, setLoader] = useState(false);

  const handleUpdateStatus = () => {
    setLoader(true);
    const payload = {
      id: data.id,
      status: data.status === "approved" ? "deactivate" : "approved",
    };
    api(UPDATE_SUB_USER, payload)
      .then((res) => {
        if (res?.data?.status === RESPONSE_OK) {
          toggle();
          getData();
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="applicant-modal">
      <ModalHeader toggle={() => toggle()}>
        {data?.status !== "deactivate" ? "Deactivate User" : " Activate User"}
      </ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Do you want to{" "}
          {data?.status !== "deactivate" ? "deactivate" : " activate"} this sub
          user?
        </p>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={toggle}>
            Cancel
          </button>
          <FormButton
            loader={loader}
            label={data?.status !== "deactivate" ? "Deactivate" : " Activate"}
            className="pt-btn btn-primary pt-btn-small"
            onClick={handleUpdateStatus}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
