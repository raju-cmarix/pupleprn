import React from "react";
import { Container } from "reactstrap";
import { Helmet } from "react-helmet";
import "../../assets/scss/App.scss";
import { Link } from "react-router-dom";
import LoginForm from "./loginForm";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Purple PRN - Login</title>
      </Helmet>
      <div className="login-layout">
        <Container fluid>
          <div className="login">
            <Link
              to="/"
              className="mainhome">
              Home
            </Link>
            <div className="title">
              <h1>
                Welcome<br></br>
                to Purple <span>PRN!</span>
              </h1>
            </div>
            <LoginForm />
            <p>
              Don’t have Purple PRN account? <Link to="/">Sign up</Link>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
