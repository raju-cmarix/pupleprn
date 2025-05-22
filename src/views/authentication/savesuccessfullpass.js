import React, { useState } from "react";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../../assets/scss/App.scss";
import FormButton from "component/common/FormButton";

const SaveSuccessfullPassword = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const viewPassword = () => {
    setLoader(true);
    setVisiblePassword(!visiblePassword);
  };

  function handleClick() {
    navigate("/login");
  }
  return (
    <>
      <Helmet>
        <title>Purple PRN - Reset Password</title>
      </Helmet>
      <div className="login-layout save-successful-pass">
        <Container fluid>
          <div className="login">
            <div className="title">
              <h1 className="mb-60">
                You have successfully <br></br>
                <span className="ms-0">reset your password</span>!
              </h1>
            </div>

            <div className="pt-btn btn-primary close-btn">
              <FormButton
                onClick={handleClick}
                color="primary"
                loader={loader}
                type="submit"
                label="Return to login"
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SaveSuccessfullPassword;
