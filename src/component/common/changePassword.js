import React, { useContext, useEffect, useState } from "react";
import { Form } from "reactstrap";
import FormPassword from "component/common/FormPassword";
import { useForm } from "react-hook-form";
import {
  NewPasswordRules,
  CurrentPasswordRules,
  ConformPasswordRules,
} from "constants/Rules";
import { RESPONSE_OK } from "constants/AppConstants";
import FormButton from "./FormButton";
import { api } from "api/Api";
import { CHANGE_PASSWORD_URL } from "constants/ApiUrls";
import UserContext from "utils/context/UserContext";
import { msg } from "constants/messages";

function ChangePassword() {
  const [loader, setLoader] = useState();
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm();

  const passwordValue = watch("newPassword");
  const cPasswordValue = watch("confirmNewPassword");

  const onSubmit = (data) => {
    data = {
      id: user?.subUserId || user.id,
      roles: user.roles,
      ...data,
    };
    setLoader(true);

    api(CHANGE_PASSWORD_URL, { ...data }).then((res) => {
      if (res.status === RESPONSE_OK) {
        reset();
      }
      setLoader(false);
    });
  };

  return (
    <div className="picture-block">
      <h5 className="mb-24">Change Password</h5>
      <div className="login-content-box">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-12 border-0 pb-0">
            <div>
              <FormPassword
                name="oldPassword"
                id="oldPassword"
                placeholder=""
                autoComplete="off"
                label="Current password:"
                autoFocus={true}
                register={register}
                rules={CurrentPasswordRules}
                errors={errors}
              />
            </div>
          </div>

          <div className="form-group mb-12 border-0 pb-0">
            <FormPassword
              name="newPassword"
              id="newPassword"
              placeholder=""
              autoComplete="off"
              label="New password:"
              register={register}
              rules={NewPasswordRules}
              passwordValue={passwordValue}
              errors={errors}
              dirtyFields={dirtyFields}
              trigger={trigger}
            />
          </div>

          <div className="form-group mb-4 border-0 pb-0">
            <FormPassword
              cPasswordValue={cPasswordValue}
              name="confirmNewPassword"
              id="confirmNewPassword"
              placeholder=""
              autoComplete="off"
              label="Confirm new password:"
              register={register}
              rules={ConformPasswordRules}
              isConfirmPassword={true}
              errors={errors}
              confirmPasswordMessage={msg.newPasswordNotMatch}
              passwordValue={passwordValue}
              dirtyFields={dirtyFields}
              trigger={trigger}
            />
          </div>

          <div className="text-center border-0 pb-0">
            <FormButton
              color="primary"
              loader={loader}
              type="submit"
              label="Save"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
