import React, { useState } from "react";
import { Form } from "reactstrap";
import FormInput from "component/common/FormInput";
import { useForm } from "react-hook-form";
import { EmailRules } from "constants/Rules";
import FormButton from "component/common/FormButton";
import { api } from "api/Api";
import { FORGOT_PASSWORD_URL } from "constants/ApiUrls";
import { RESPONSE_CREATED, RESPONSE_OK } from "constants/AppConstants";
import { Mail } from "../../assets/svg";

function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loader, setLoader] = useState(false);

  const onSubmit = (data) => {
    const email = data.email.toLowerCase();
    data = {
      email,
    };

    setLoader(true);
    api(FORGOT_PASSWORD_URL, data).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED)
        reset();
      setLoader(false);
    });
  };
  return (
    <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
      <label className="mb-2">
        Enter your email address and we’ll send a link to reset your password
      </label>
      <div className="input-icon for-icon mb-0">
        <Mail />
        <FormInput
          name="email"
          type="email"
          id="email"
          placeholder=""
          autoFocus={false}
          register={register}
          rules={EmailRules}
          errors={errors}
        />
      </div>
      <div className="pt-btn btn-primary login-btn">
        <FormButton
          color="primary"
          type="submit"
          loader={loader}
          label="Reset Password"
        />
      </div>
    </Form>
  );
}

export default ForgetPasswordForm;
