import { useContext, useState } from "react";
import scanner from "../../assets/images/icons/code-scanner.svg";
import FormButton from "component/common/FormButton";
import FormPassword from "component/common/FormPassword";
import { useForm } from "react-hook-form";
import { Form } from "reactstrap";
import { CurrentPasswordRules, otpRules } from "constants/Rules";

import FormInput from "component/common/FormInput";
import {
  ADMIN_2FA_DISABLE,
  ADMIN_2FA_ENABLE,
  ADMIN_2FA_VERIFY,
  LOGOUT_URL,
} from "constants/ApiUrls";
import {
  LOCALSTORAGEDEVICETOKEN,
  RESPONSE_CREATED,
  RESPONSE_OK,
} from "constants/AppConstants";
import { api } from "api/Api";
import UserContext from "utils/context/UserContext";
import AuthContext from "utils/context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoogleAuthenticator = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [enable, setEnable] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [QRCodeValue, setQRCodeValue] = useState("");

  const [data, setData] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm();
  const Admin2FA = localStorage.getItem("2FA");

  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("userRole");

  const handleEnable2FA = () => {
    const payload = {
      id: id,
    };
    api(ADMIN_2FA_ENABLE, payload).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        setData(res?.data?.data);
        setQRCodeValue(res?.data?.qrCodeUrl);
        setEnable(true);
      }
    });
  };

  const handleVerify2FA = (data) => {
    const payload = {
      code: data.code,
      password: data.password,
      id: id,
    };

    api(ADMIN_2FA_VERIFY, payload).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        localStorage.removeItem("2FA");
        const deviceToken = localStorage.getItem(LOCALSTORAGEDEVICETOKEN);
        api(LOGOUT_URL, {
          id: id,
          roles: role,
          deviceToken:
          deviceToken && deviceToken !== "null" ? deviceToken : null,
        }).then((res) => {
          setUser({});
          setIsUserAuthenticated(false);
          localStorage.removeItem(LOCALSTORAGEDEVICETOKEN);
          localStorage.removeItem("purplePTAuthToken");
          localStorage.removeItem("purplePTRefreshToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userId");
          let id = localStorage.getItem("PURPTID");
          if (id) {
            clearInterval(id);
          }
          navigate("/login");
        });
      }
    });
  };
  const handleDisable2FA = (data) => {
    const payload = {
      password: data.password,
      id: id,
    };
    api(ADMIN_2FA_DISABLE, payload).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        localStorage.removeItem("2FA");
        const deviceToken = localStorage.getItem(LOCALSTORAGEDEVICETOKEN);
        localStorage.removeItem(LOCALSTORAGEDEVICETOKEN);
        api(LOGOUT_URL, {
          id: id,
          roles: role,
          deviceToken:
            deviceToken && deviceToken !== "null" ? deviceToken : null,
        }).then((res) => {
          setUser({});
          setIsUserAuthenticated(false);
          localStorage.removeItem("purplePTAuthToken");
          localStorage.removeItem("purplePTRefreshToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userId");
          let id = localStorage.getItem("PURPTID");
          if (id) {
            clearInterval(id);
          }
          navigate("/login");
        });
      }
    });
  };
  return (
    <>
      {Admin2FA === "false" ? (
        <div className="general-photo-main">
          <div className="">
            <h5 className="mb-32">External 2FA TOTP</h5>
            <div className="general-code-scanner">
              {enable === false ? (
                <>
                  <img
                    src={scanner}
                    alt="QR-code"
                    className="code-img"
                  />
                  <div className="general-code-info">
                    <p>
                      Use external Time based one time password (TOTP) apps like
                      Google Authenticator on your phone or desktop to generate
                      random 6 digit TOTP for every login. Enabling it will
                      provide you additional security to your account.
                    </p>
                    <div className="general-code-btn border-0 pb-0">
                      <FormButton
                        color="primary"
                        type="submit"
                        label="Enable External OTP"
                        onClick={handleEnable2FA}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="general-qr-handle">
                    {showKey ? (
                      <p className="key-text">
                        <b>{data?.secretKey}</b>
                      </p>
                    ) : (
                      <img
                        src={QRCodeValue}
                        alt="QR-code"
                        className="qr-code"
                      />
                    )}

                    <div className="disable-auth-btn border-0 pb-0 text-center">
                      <FormButton
                        type="submit"
                        onClick={() => setShowKey(!showKey)}
                        label={
                          showKey
                            ? "Can’t Show? get the code"
                            : "Can’t Scan? get the Key"
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={
                      disable ? "disable-auth" : "disable-auth disable"
                    }>
                    <p className="">
                      Scan the QR code on your authenticator app
                    </p>
                    <p className="mb-0">
                      Once Scanned, the app should give you a 6 digit TOTP.
                      Enter it here.
                    </p>
                    <Form
                      className="password-handle-group"
                      onSubmit={handleSubmit(handleVerify2FA)}>
                      <div className="pass-input fix-required">
                        <FormInput
                          name="code"
                          id="code"
                          // type={"number"}
                          placeholder="6 digit TOTP"
                          autoComplete="off"
                          autoFocus={true}
                          register={register}
                          rules={otpRules}
                          errors={errors}
                        />
                        <FormPassword
                          name="password"
                          id="password"
                          placeholder="Current password"
                          autoComplete="off"
                          autoFocus={true}
                          register={register}
                          rules={CurrentPasswordRules}
                          errors={errors}
                        />
                      </div>

                      <div className="pass-btns">
                        <div className="text-center border-0 pb-0">
                          <FormButton
                            color="primary"
                            type="submit"
                            label="Enable"
                          />
                        </div>
                        <div className="text-center border-0 pb-0">
                          <FormButton
                            className="btn-secondary pt-btn email-capture"
                            type="button"
                            label="Cancel"
                            onClick={() => setEnable(false)}
                          />
                        </div>
                      </div>
                    </Form>
                    <p>
                      NOTE: Once external TOTP is setup, you have to use the
                      same mobile authenticator app to generate a new 6-digit
                      TOTP every time you login.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="general-photo-main">
          <div className="">
            <h5 className="mb-32">External 2FA TOTP</h5>
            <div className="general-code-scanner">
              <img
                src={scanner}
                alt="QR-code"
                className="code-img"
              />
              <div
                className={disable ? "disable-auth" : "disable-auth disable"}>
                <p className="disable-auth-head">
                  External TOTP is enabled on your account
                </p>
                <p>
                  Every time you login, you will be prompted to enter a 6 digit
                  Time based one time password (TOTP) that your external mobile
                  authenticator app generates.
                </p>
                <p>
                  Even if external TOTP is disabled, you can login to Purple PRN
                  by entering Email and Password.
                </p>
                <div className="disable-auth-btn border-0 pb-0">
                  <FormButton
                    type="submit"
                    label="Disable external TOTP"
                    onClick={() => setDisable(!disable)}
                  />
                </div>
                {disable ? (
                  <Form
                    className="password-handle"
                    onSubmit={handleSubmit(handleDisable2FA)}>
                    <div className="form-group mb-12 border-0 pb-0">
                      <div className="pass-input">
                        <FormPassword
                          name="password"
                          id="password"
                          placeholder="Current password"
                          autoComplete="off"
                          autoFocus={true}
                          register={register}
                          rules={CurrentPasswordRules}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="text-center border-0 pb-0">
                      <FormButton
                        color="primary"
                        type="submit"
                        label="Disable"
                      />
                    </div>
                  </Form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleAuthenticator;
