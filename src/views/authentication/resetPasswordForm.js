import React, { useEffect, useState } from "react";
import { Form } from "reactstrap";
import FormPassword from "component/common/FormPassword";
import { useForm } from "react-hook-form";
import { NewPasswordRules, ConformNewPasswordRules } from "constants/Rules";
import FormButton from "component/common/FormButton";
import { RESET_PASSWORD_URL } from "constants/ApiUrls";
import { api } from "api/Api";
import { RESPONSE_CREATED, RESPONSE_OK } from "constants/AppConstants";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { msg } from "constants/messages";

function ResetPasswordForm() {
  const navigate = useNavigate();
  const queries = queryString.parse(window.location.search);

  // if no query params return to homepage
  useEffect(() => {
    if (!queries || !queries.id) navigate("/");
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [loader, setLoader] = useState(false);

  const passwordValue = watch("password");
  const cPasswordValue = watch("confirmPassword");

  const onSubmit = (data) => {
    data = {
      ...queries,
      ...data,
    };
    setLoader(true);
    api(RESET_PASSWORD_URL, { ...data }).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED)
        navigate("/password/changed");
      setLoader(false);
    });
  };
  return (
    <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-12">
        <div className="input-icon CP mb-0">
          <FormPassword
            name="password"
            id="password"
            placeholder=""
            autoComplete="off"
            label="New password:"
            autoFocus={true}
            register={register}
            rules={NewPasswordRules}
            errors={errors}
            passwordValue={passwordValue}
            dirtyFields={dirtyFields}
            trigger={trigger}
          />
        </div>
      </div>
      <div className="form-group mb-12">
        <div className="input-icon CP mb-0">
          <FormPassword
            name="confirmPassword"
            id="confirmPassword"
            placeholder=""
            autoComplete="off"
            label="Confirm new password:"
            register={register}
            rules={ConformNewPasswordRules}
            isConfirmPassword={true}
            passwordValue={passwordValue}
            cPasswordValue={cPasswordValue}
            confirmPasswordMessage={msg.newPasswordNotMatch}
            errors={errors}
            dirtyFields={dirtyFields}
            trigger={trigger}
          />
        </div>
      </div>
      <div className="pt-btn btn-primary login-btn">
        <FormButton
          color="primary"
          loader={loader}
          type="submit"
          label="Reset Password"
        />
      </div>
    </Form>
  );
}

export default ResetPasswordForm;
