import { api } from "api/Api";
import { RESEND_CODE_URL, VERIFICATION_CODE_URL } from "constants/ApiUrls";
import { RESPONSE_CREATED, RESPONSE_OK } from "constants/AppConstants";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Form, FormGroup, Button } from "reactstrap";
import AuthContext from "utils/context/AuthContext";

function VerificationForm() {
  const navigate = useNavigate();
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [timer, setTimer] = useState(30);
  const id = localStorage.getItem("userId");
  const { setIsUserAuthenticated } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const token = localStorage.getItem("adminAuthToken");
  const role = localStorage.getItem("adminRole");
  const handleVerificationCode = () => {
    const payload = {
      otpCode: otp,
      id: id,
    };
    api(VERIFICATION_CODE_URL, null, null, payload).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        setIsUserAuthenticated(true);
        localStorage.setItem("purplePTAuthToken", token);
        localStorage.setItem("userRole", role);
        localStorage.removeItem("adminAuthToken");
        localStorage.removeItem("adminRole");
        navigate("/admin/users");
      }
    });
  };

  // const startTimer = () => {
  //   setTimer(30); // Reset the displayed timer to 30 seconds

  //   const countdownInterval = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       if (prevTimer > 0) {
  //         return prevTimer - 1;
  //       } else {
  //         clearInterval(countdownInterval);
  //         setIsCodeExpired(true);
  //         return 0;
  //       }
  //     });
  //   }, 1000);
  // };

  const handleResendCode = () => {
    const userId = localStorage.getItem("userId");
    api(RESEND_CODE_URL, { id: userId }).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        setOtp("");
        setTimer(60);
        // startTimer();
      }
    });
  };

  // useEffect(() => {
  //   let countdown;
  //   if (timer > 0) {
  //     countdown = setTimeout(() => setTimer(timer - 1), 1000);
  //   } else {
  //     setIsCodeExpired(true);
  //   }
  //   return () => clearTimeout(countdown);
  // }, [timer]);

  return (
    <>
      <Helmet>
        <title>Purple PRN - Verification Page </title>
      </Helmet>
      <div className="login-layout">
        <Container fluid>
          <div className="login">
            <Link to="/" className="mainhome">
              Home
            </Link>
            <div className="title">
              <h1>
                Welcome{" "}
                <span className="ml-2 mt-3">
                  {role === "subadmin" ? "Sub Admin!" : "Admin!"}
                </span>
              </h1>
            </div>
          <p className="text-start mb-4">
              Get a 6 digit Time based one time password (TOTP) from your{" "}
              <b>Google Authenticator</b> app{" "}
            </p>
            <Container className="verification-form ">
              <Row className="">
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  handleVerificationCode();
                }}>
                  <FormGroup className="">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      containerStyle={"otp-input-data"}
                      inputType="number"
                      renderInput={(props) => <input {...props} />}
                      shouldAutoFocus
                    />
                  </FormGroup>
                  {/* <FormGroup className="mt-4">
                    <p>
                      Time Remaining: <span className="">{timer} seconds</span>
                    </p>
                  </FormGroup> */}
                  {/* {isCodeExpired && (
                    <p className="resend-code-error mt-4">
                      Code expired. Please enter a new code.
                    </p>
                  )} */}
                  <FormGroup className=" btngroup">
                    <Button
                      type="submit"
                      className="btn-continue"
                      disabled={otp?.length < 6}
                    >
                      Continue
                    </Button>
                  </FormGroup>
                </Form>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
    </>
  );
}

export default VerificationForm;
