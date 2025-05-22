import React, { useState, useContext, useEffect } from "react";
import { Input } from "reactstrap";
import ChangePassword from "component/common/changePassword";
import UserContext from "utils/context/UserContext";
import { useForm } from "react-hook-form";
import FormButton from "component/common/FormButton";
import DeleteAccountModal from "component/modals/DeleteAccountModal";

function LoginInformation() {
  const { user } = useContext(UserContext);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const { reset } = useForm();

  useEffect(() => {
    reset({
      email: user?.email,
    });
  }, [user]);

  return (
    <>
      <div className="general-content login-content">
        <div className="first-block">
          <div className="general-photo-main">
            <div className="picture-block">
              <h5 className="mb-32">Email</h5>
              <div className="login-content-box mb-24">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={user?.email}
                  disabled
                />
              </div>
            </div>
            <ChangePassword />
          </div>
          <div style={{ display: "flex", gap: "50px" }}>
            <h5 style={{ marginTop: "10px" }}>Deactivate My Account</h5>
            <FormButton
              color="primary"
              onClick={() => setDeleteAccountModal(!deleteAccountModal)}
              label="Deactivate"
            />
          </div>
        </div>
        <DeleteAccountModal
          modal={deleteAccountModal}
          toggle={() => setDeleteAccountModal(!deleteAccountModal)}
          data={user}
          callbackFn={() => {
            setDeleteAccountModal(!deleteAccountModal);
          }}
        />
      </div>
    </>
  );

}

export default LoginInformation;
