import React, { useState, useEffect, useContext } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import FormButton from "component/common/FormButton";
import { useForm } from "react-hook-form";
import { api } from "api/Api";
import { ADD_SUB_USER, EMAIL_CHECK_URL } from "constants/ApiUrls";
import { RESPONSE_CREATED, VALID_EMAIL_REGEX } from "constants/AppConstants";
import FormPassword from "component/common/FormPassword";
import {
  ConfirmEmailRules,
  ConformPasswordRules,
  EmailRules,
  NewPasswordRules,
} from "constants/Rules";
import { msg } from "constants/messages";
import FormInput from "component/common/FormInput";
import UserContext from "utils/context/UserContext";

export default function AddSubUserModal({ modal, toggle, callbackFn, data }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm();

  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const cPasswordValue = watch("confirmPassword");

  // validate confirm email field match with email
  ConfirmEmailRules.validate = (value) =>
    value === emailValue || msg.confirmEmailMatch;

  // call api for uniq email when email value is changed
  useEffect(() => {
    if (emailValue && VALID_EMAIL_REGEX.test(emailValue)) {
      checkEmail();
    }
  }, [emailValue]);

  useEffect(() => {
    if (modal) {
      setErrorMessage("");
      reset();
    }
  }, [modal]);

  // check if email already exists in server if yes set error email already exists
  const checkEmail = async () => {
    api(EMAIL_CHECK_URL, { email: emailValue?.toLowerCase() }).then((res) => {
      setErrorMessage(res.data.message);
    });
  };

  const onSubmit = (formData) => {
    if (errorMessage) return;
    setLoader(true);
    const payload = {
      userId: user.id,
      email: formData.email,
      password: formData.password,
    };

    api(ADD_SUB_USER, payload)
      .then((res) => {
        if (res?.data?.status === RESPONSE_CREATED) {
          toggle();
          callbackFn();
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
      toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Sub User</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="login-content-box">
          <div className="form-group mb-12 border-0 pb-0">
            <FormInput
              name="email"
              id={"email"}
              type={"email"}
              label={"Email:"}
              register={register}
              rules={EmailRules}
              errors={errors}
              errorMsg={errorMessage}
            />
            <FormInput
              name={"confirmEmail"}
              id={"confirmEmail"}
              type={"email"}
              label={"Confirm Email:"}
              register={register}
              rules={ConfirmEmailRules}
              errors={errors}
              isConfirmEmail={true}
              email={emailValue}
            />
          </div>

          <div className="form-group mb-12 border-0 pb-0">
            <FormPassword
              name="password"
              id="password"
              placeholder=""
              autoComplete="off"
              label="Password:"
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
              name="confirmPassword"
              id="confirmPassword"
              placeholder=""
              autoComplete="off"
              label="Confirm password:"
              register={register}
              rules={ConformPasswordRules}
              isConfirmPassword={true}
              errors={errors}
              confirmPasswordMessage={msg.passwordNotMatch}
              passwordValue={passwordValue}
              dirtyFields={dirtyFields}
              trigger={trigger}
            />
          </div>
          <div className="text-center">
            <FormButton
              loader={loader}
              className={"pt-btn-small pt-btn btn-primary editexp-btn"}
              type="submit"
              label={"Submit"}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
