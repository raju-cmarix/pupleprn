import React from "react";
import { Container } from "reactstrap";
import { Helmet } from "react-helmet";
import "../../assets/scss/App.scss";
import { BackArrow } from "../../assets/svg";
import { Link, Outlet } from "react-router-dom";
import ForgetPasswordForm from "./forgetPasswordForm";

const ForgotPassword = () => {
  return (
    <>
      <Helmet>
        <title>Purple PRN - Forgot Password</title>
      </Helmet>
      <div className="login-layout forgot-layout">
        <Container fluid>
          <div className="login">
            <div className="title">
              <h1>
                Forgot your<br></br>
                <span className="ms-0">password?</span>
              </h1>
            </div>
            <ForgetPasswordForm />
            <Link to="/login" className="backto">
              {" "}
              <span>
                <BackArrow />{" "}
              </span>
              Back to Log in
            </Link>
          </div>
        </Container>
      </div>
      <Outlet />
    </>
  );
};

export default ForgotPassword;
