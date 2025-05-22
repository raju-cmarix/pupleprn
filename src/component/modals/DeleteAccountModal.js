import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { APPROVE_REJECT_BY_ADMIN_URL } from "constants/ApiUrls";
import { LOCALSTORAGEDEVICETOKEN, RESPONSE_OK } from "constants/AppConstants";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import AuthContext from "utils/context/AuthContext";
import UserContext from "utils/context/UserContext";

export default function DeleteAccountModal({ modal, toggle, data }) {
  const { setUser } = useContext(UserContext);
  const [approveLoader, setApproveLoader] = useState(false);
  const { setIsUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeactivate = () => {
    setApproveLoader(true);

    api(APPROVE_REJECT_BY_ADMIN_URL, {
      userId: data.id,
      status: "deactivate",
      isApprovedByAdmin: data.isApprovedByAdmin,
    })
      .then((res) => {
        if (res?.data?.status === RESPONSE_OK) {
          toast.success("Account deactivated successfully!");
          setUser({});
          setIsUserAuthenticated(false);
          localStorage.removeItem(LOCALSTORAGEDEVICETOKEN);
          localStorage.removeItem("purplePTAuthToken");
          localStorage.removeItem("purplePTRefreshToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userId");
          localStorage.removeItem("2FA");
          let id = localStorage.getItem("PURPTID");
          if (id) {
            clearInterval(id);
          }
          navigate("/login");
        }
      })
      .finally(() => {
        setApproveLoader(false);
        toggle();
      });
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => toggle()}
      className="applicant-modal">
      <ModalHeader toggle={() => toggle()}>{`Deactivate Account`}</ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Are you sure you want to deactivate your account ?
        </p>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => toggle()}>
            Cancel
          </button>
          <div className="text-center">
            <FormButton
              loader={approveLoader}
              label={`Deactivate`}
              className="pt-btn btn-primary pt-btn-small"
              onClick={() => handleDeactivate()}
            />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
