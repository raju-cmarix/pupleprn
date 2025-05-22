import React, { useState, useContext, useEffect } from "react";
import { Form } from "reactstrap";
import { useForm } from "react-hook-form";
import FormInput from "component/common/FormInput";
import FormPassword from "component/common/FormPassword";
import FormButton from "component/common/FormButton";
import { EmailRules, LoginPasswordRules } from "constants/Rules";
import { Link, useNavigate } from "react-router-dom";
import { api } from "api/Api";
import { LOGIN_URL } from "constants/ApiUrls";
import {
  DEFAULTDEVICEIDLENGTH,
  LOCALSTORAGEDEVICEID,
  LOCALSTORAGEDEVICETOKEN,
  RESPONSE_CREATED,
  RESPONSE_OK,
} from "constants/AppConstants";
import { Lock, Mail } from "../../assets/svg";
import "../../assets/scss/App.scss";
import AuthContext from "utils/context/AuthContext";
import UserContext from "utils/context/UserContext";
import { getRouteFromRole } from "utils/Utils";
import { uid } from "uid/secure";
import { browserName } from "react-device-detect";
import { requestForToken } from "firebase";

function LoginForm() {
  const PageTitle = document?.title;
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: {
        title: `${PageTitle}`,
        url: window.location.href,
        path: window.location.pathname,
      },
    });
  }, []);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const passwordValue = watch("password");

  const [loader, setLoader] = useState(false);
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const { user, setUser, refreshTokenInterval } = useContext(UserContext);

  const onSubmit = async (data) => {
    const category = "User Interaction";
    const action = "Click";
    const label = "Log in ";
    const value = 1;

    window.dataLayer.push({
      event: "event",
      eventProps: {
        category: category,
        action: action,
        label: label,
        value: value,
      },
    });
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

    if (localStorageDeviceToken && localStorageDeviceToken !== "null") {
      deviceTokenData.deviceToken = localStorageDeviceToken;
    } else {
      try {
        const token = await requestForToken();

        if (token) {
          deviceTokenData.deviceToken = token;
          localStorage?.setItem(LOCALSTORAGEDEVICETOKEN, token);
        }
      } catch (err) {
        console.log('devicetoken generation error: ', err);
        deviceTokenData.deviceToken = null;
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
        JSON?.stringify(localStorageSetData),
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
    api(LOGIN_URL, submitData).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        const { token, refreshToken } = res.data.data;
        const resData = { ...res.data.data };
        setUser({
          ...resData,
        });
        refreshTokenInterval();

        localStorage.setItem("userId", resData?.id);
        if (resData.roles === "subadmin") {
          localStorage.setItem("2FA", resData.is2FAEnable);
          if (resData?.is2FAEnable === true) {
            localStorage.setItem("adminAuthToken", token);
            localStorage.setItem("purplePTRefreshToken", refreshToken);
            localStorage.setItem("adminRole", resData.roles);
            navigate("/admin/verification");
          } else {
            localStorage.setItem("purplePTAuthToken", token);
            localStorage.setItem("purplePTRefreshToken", refreshToken);
            localStorage.setItem("userRole", resData.roles);
            setIsUserAuthenticated(true);
            navigate("/admin/users");
          }
        } else if (resData.roles === "admin") {
          localStorage.setItem("2FA", resData.is2FAEnable);
          if (resData?.is2FAEnable === true) {
            localStorage.setItem("adminAuthToken", token);
            localStorage.setItem("purplePTRefreshToken", refreshToken);
            localStorage.setItem("adminRole", resData.roles);
            navigate("/admin/verification");
          } else {
            localStorage.setItem("purplePTAuthToken", token);
            localStorage.setItem("purplePTRefreshToken", refreshToken);
            localStorage.setItem("userRole", resData.roles);
            setIsUserAuthenticated(true);
            navigate("/admin/users");
          }
        } else {
          setIsUserAuthenticated(true);
          localStorage.setItem("purplePTAuthToken", token);
          localStorage.setItem("purplePTRefreshToken", refreshToken);
          localStorage.setItem("userRole", resData.roles);
          let nav = getRouteFromRole(resData);
          navigate(nav);
        }
      }
      setLoader(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-12">
        <div className="input-icon icon mb-0">
          <Mail />
          <FormInput
            name="email"
            label="Email:"
            type="email"
            id="email"
            placeholder=""
            autoFocus={false}
            register={register}
            rules={EmailRules}
            errors={errors}
          />
        </div>
      </div>
      <div className="form-group mb-12">
        <div className="input-icon icon mb-0">
          <Lock />
          <FormPassword
            name="password"
            label="Password:"
            type="password"
            id="password"
            placeholder=""
            autoFocus={false}
            register={register}
            passwordValue={passwordValue}
            rules={LoginPasswordRules}
            errors={errors}
          />
        </div>
      </div>
      <div className="forgot">
        <Link to="/password/forgot">Forgot your password?</Link>
      </div>
      <div className="pt-btn btn-primary login-btn">
        <FormButton
          label="Log in "
          loader={loader}
          type={"submit"}
        />
      </div>
    </Form>
  );
}

export default LoginForm;
