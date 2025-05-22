import { Form } from "reactstrap";
import FormButton from "../common/FormButton";
import FormInput from "../common/FormInput";
import { useForm } from "react-hook-form";
import {
  EmailRules,
  ConfirmEmailRules,
  FirstNameRules,
  LastNameRules,
  RolesRules,
  ZipCodeRules,
} from "constants/Rules";
import { api } from "../../api/Api";
import { SIGNUP_URL } from "../../constants/ApiUrls";
import { useState } from "react";
import { RESPONSE_CREATED, RESPONSE_OK } from "../../constants/AppConstants";
import { EmailCaptureInitialValue } from "constants/FormInitialValues";
import { msg } from "constants/messages";
import FormSelect from "component/common/FormSelect";
import { UserTypes } from "views/authentication/signUpClinician/HourlyConstant";

export default function EmailCaptureForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: { ...EmailCaptureInitialValue },
  });

  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState({});

  const emailValue = watch("email");

  ConfirmEmailRules.validate = (value) =>
    value === emailValue || msg.confirmEmailMatch;

  const onSubmit = (data) => {
    setLoader(true);
    data.zipCode = data.zipCode.toString();
    delete data.confirmEmail;
    reset();
    api(SIGNUP_URL, { ...data }).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        setResponse({
          ...res.data,
          message: "Thank you! Please check your email.",
        });
      }
      setLoader(false);
    });
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="sign-me">
        <FormInput
          name={"firstName"}
          id={"firstName"}
          type={"text"}
          label={"First Name"}
          register={register}
          rules={FirstNameRules}
          errors={errors}
          autoFocus={true}
        />
        <FormInput
          name={"lastName"}
          id={"lastName"}
          type={"text"}
          label={"Last Name"}
          register={register}
          rules={LastNameRules}
          errors={errors}
        />
        <FormInput
          name={"zipCode"}
          id={"zipCode"}
          type={"number"}
          label={"Zip code"}
          register={register}
          rules={ZipCodeRules}
          errors={errors}
        />
        <FormInput
          name={"email"}
          id={"email"}
          type={"email"}
          label={"Email"}
          register={register}
          rules={EmailRules}
          errors={errors}
        />
        <FormInput
          name={"confirmEmail"}
          id={"confirmEmail"}
          type={"email"}
          label={"Confirm Email"}
          register={register}
          rules={ConfirmEmailRules}
          errors={errors}
        />
        <FormInput
          name={"message"}
          id={"message"}
          rows={5}
          type={"textarea"}
          label={"Message (optional)"}
          register={register}
          rules={{}}
          errors={errors}
          inputDivClassName="message"
        />
      </div>

      <FormSelect
        control={control}
        name={"roles"}
        label={"Role"}
        options={UserTypes}
        optionLabel={"label"}
        optionValue={"value"}
        register={register}
        rules={RolesRules}
        errors={errors}
      />

      <p
        className={
          response.error
            ? "text-center text-danger mb-32"
            : "text-center text-success mb-32"
        }
      >
        {response.message}
      </p>

      <FormButton type={"submit"} label={"Submit"} loader={loader} />
    </Form>
  );
}
