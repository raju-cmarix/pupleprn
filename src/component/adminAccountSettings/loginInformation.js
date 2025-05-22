import React, { useContext, useEffect } from "react";
import { Input } from "reactstrap";
import ChangePassword from "component/common/changePassword";
import UserContext from "utils/context/UserContext";
import { useForm } from "react-hook-form";

import GoogleAuthenticator from "./GoogleAuthenticator";

function LoginInformation() {
  const { user } = useContext(UserContext);

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
              <div className="login-content-box">
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
          <GoogleAuthenticator />
        </div>
      </div>
    </>
  );
}

export default LoginInformation;
