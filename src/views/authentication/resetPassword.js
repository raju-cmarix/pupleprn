import React from "react";
import { Container } from "reactstrap";
import { Helmet } from "react-helmet";
import "../../assets/scss/App.scss";
import { BackArrow} from "../../assets/svg";
import { Link } from "react-router-dom";
import ResetPasswordForm from "./resetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <Helmet>
        <title>Purple PRN - Create New Password</title>
      </Helmet>
      <div className="login-layout create-password-layout">
        <Container fluid>
          <div className="login">
            <div className="title">
              <h1>
                Create new
                <span>&nbsp;password</span>
              </h1>
            </div>
            <ResetPasswordForm />
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
    </>
  );
};

export default ResetPassword;
  
