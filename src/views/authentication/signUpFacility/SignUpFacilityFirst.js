import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "component/common/FormInput";
import {
  ClinicianTypeRules,
  ConfirmEmailRules,
  ConformPasswordRules,
  EmailRules,
  PasswordRules,
  TermsAndConditionRules,
  ZipCodeRules,
} from "constants/Rules";
import FormPassword from "component/common/FormPassword";
import FormCheckbox from "component/common/FormCheckbox";
import FooterButtons from "./FooterButtons";
import { msg } from "constants/messages";
import { api } from "api/Api";
import usePageEvent from "hooks/usePageEvent";
import {
  CLINICIAN_SIGNUP_URL,
  EMAIL_CHECK_URL,
  FACILITY_SIGNUP_URL,
  LOGIN_URL_SILENT,
} from "constants/ApiUrls";
import {
  DEFAULTDEVICEIDLENGTH,
  LOCALSTORAGEDEVICEID,
  LOCALSTORAGEDEVICETOKEN,
  RESPONSE_CREATED,
  RESPONSE_OK,
  VALID_EMAIL_REGEX,
} from "constants/AppConstants";
import FormSelect from "component/common/FormSelect";
import { requestForToken } from "firebase";
import { uid } from "uid";
import { browserName } from "react-device-detect";
import UserContext from "utils/context/UserContext";
import AuthContext from "utils/context/AuthContext";
import { clinician } from "../signUpClinician/HourlyConstant";

const SignUpFacilityFirst = ({
  register,
  errors,
  watch,
  trigger,
  curStep,
  setCurStep,
  dirtyFields,
  control,
  isClinician,
}) => {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setIsUserAuthenticated } = useContext(AuthContext);
  const passwordValue = watch("password");
  const cPasswordValue = watch("confirmPassword");
  const rolesValue = watch("roles");
  const emailValue = watch("email");
  const cEmailValue = watch("confirmEmail");
  const zipCodeValue = watch("homeAddressZipCode");
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);

  // call api for uniq email when email value is changed
  useEffect(() => {
    emailValue && checkEmail();
  }, [emailValue]);

  // check if email already exists in server if yes set error email already exists
  const checkEmail = async () => {
    VALID_EMAIL_REGEX.test(emailValue) &&
      api(EMAIL_CHECK_URL, { email: emailValue?.toLowerCase() }).then((res) => {
        setErrorMessage(res.data.message);
      });
  };

  // validate confirm email field match with email
  ConfirmEmailRules.validate = (value) =>
    value === emailValue || msg.confirmEmailMatch;

  // handle next button
  const handleNext = async () => {
    if (errorMessage && errorMessage.length) return;

    const submitData = {
      password: passwordValue,
      email: emailValue?.toLowerCase(),
    };

    let url = FACILITY_SIGNUP_URL;
    if (isClinician) {
      submitData.roles = rolesValue;
      submitData.homeAddressZipCode = zipCodeValue;
      url = CLINICIAN_SIGNUP_URL;
    }

    if (await trigger()) {
      try {
        setLoader(true);
        api(url, submitData)?.then((res) => {
          if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
            setTimeout(() => {
              setLoader(false);
              login(submitData);
            }, 3000);
          } else {
            setLoader(false);
          }
        });
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };

  const login = async (data) => {
    const localStorageData = localStorage?.getItem(
      `${LOCALSTORAGEDEVICEID}_${data?.email}`,
    );
    const localStorageDeviceToken = localStorage?.getItem(
      LOCALSTORAGEDEVICETOKEN,
    );

    let deviceTokenData = {};
    if (localStorageData) {
      deviceTokenData = { ...JSON?.parse(localStorageData) };
    }

    if (localStorageDeviceToken) {
      deviceTokenData.deviceToken = localStorageDeviceToken;
    } else {
      try {
        const token = await requestForToken();
        if (token) {
          deviceTokenData.deviceToken = token;
          localStorage?.setItem(LOCALSTORAGEDEVICETOKEN, token);
        }
      } catch (err) {
        deviceTokenData.deviceToken = null;
        console.log("Error : ", err);
      }
    }

    let deviceId = null;
    const apiSendDeviceData = {};

    // checking if localStorage has data
    if (deviceTokenData?.deviceId && data?.email === deviceTokenData?.email) {
      // gettting localStorage data
      deviceId = deviceTokenData?.deviceId;
    } else {
      // creating new localStorage data and saving it to localStorage
      const newDeviceId = uid(DEFAULTDEVICEIDLENGTH);

      const localStorageSetData = {
        email: data?.email,
        deviceId: newDeviceId,
      };

      localStorage?.setItem(
        `${LOCALSTORAGEDEVICEID}_${data?.email}`,
        JSON?.stringify(localStorageSetData)
      );

      deviceId = newDeviceId;
    }

    // asssign respective data to object
    apiSendDeviceData.deviceId = deviceId;
    apiSendDeviceData.deviceToken = deviceTokenData.deviceToken;
    apiSendDeviceData.osType = browserName;

    const submitData = {
      ...data,
      ...apiSendDeviceData,
      email: data?.email?.toLowerCase(),
    };
    setLoader(true);
    api(LOGIN_URL_SILENT, submitData).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        const { token, refreshToken } = res.data.data;
        const resData = { ...res.data.data };
        setUser({
          ...resData,
        });
        setIsUserAuthenticated(true);
        localStorage.setItem("purplePTAuthToken", token);
        localStorage.setItem("purplePTRefreshToken", refreshToken);
        setCurStep(curStep + 1);
        // setCurStep(1);
        navigate(
          isClinician ? "/clinician/signup?step=1" : "/facility/signup?step=1",
        );
      }
      setLoader(false);
    });
  };

  // Meta Conversion API Event
  usePageEvent();
  useEffect(() => {
    if (emailValue && cEmailValue) {
      trigger("confirmEmail");
    }
  }, [emailValue, cEmailValue]);

  return (
    <>
      <FormInput
        name="email"
        id={"email"}
        type={"email"}
        label={"Email:"}
        register={register}
        rules={EmailRules}
        errorMsg={errorMessage}
        errors={errors}
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

      <FormPassword
        name="password"
        label="Password:"
        type="password"
        id="password"
        placeholder=""
        autoFocus={false}
        register={register}
        rules={PasswordRules}
        errors={errors}
        dirtyFields={dirtyFields}
        passwordValue={passwordValue}
      />
      <FormPassword
        cPasswordValue={cPasswordValue}
        confirmPasswordMessage={msg.passwordNotMatch}
        name="confirmPassword"
        label="Confirm Password:"
        type="password"
        id="confirmPassword"
        placeholder=""
        autoFocus={false}
        register={register}
        rules={ConformPasswordRules}
        errors={errors}
        isConfirmPassword={true}
        passwordValue={passwordValue}
        dirtyFields={dirtyFields}
        trigger={trigger}
      />
      {isClinician ? (
        <>
          <FormSelect
            options={clinician}
            placeholder="Select"
            control={control}
            name={"roles"}
            errors={errors}
            optionValue="value"
            optionLabel="label"
            rules={ClinicianTypeRules}
            label="Clinician type:"
            trigger={trigger}
          />
          <FormInput
            name={"homeAddressZipCode"}
            id={"homeAddressZipCode"}
            type={"number"}
            label={"Zip code"}
            register={register}
            rules={ZipCodeRules}
            errors={errors}
          />
        </>
      ) : (
        <></>
      )}
      <FormCheckbox
        control={control}
        divClassName="i-agree"
        className="form-check-input"
        name="iAgree"
        options={[{ label: "", value: "iAgree" }]}
        register={register}
        rules={TermsAndConditionRules}
        errors={errors}>
        <p>
          {" "}
          I agree with
          <a
            target={"_blank"}
            rel="noreferrer"
            href={process.env.REACT_APP_BASENAME + "terms"}>
            {" "}
            Terms and conditions
          </a>{" "}
          and{" "}
          <a
            target={"_blank"}
            rel="noreferrer"
            href={process.env.REACT_APP_BASENAME + "privacy"}>
            Privacy policy
          </a>
        </p>
      </FormCheckbox>
      {/* {errors && (
        <p style={{ color: "#ff3333" }}>Clear errors before continuing</p>
      )} */}
      <FooterButtons
        firstSignUp={true}
        rightLabel={"Sign Up"}
        onRightClick={() => handleNext()}
        curStep={curStep}
        setCurStep={setCurStep}
        loader={loader}
      />
    </>
  );
};

export default SignUpFacilityFirst;
