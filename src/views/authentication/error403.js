import React from "react";
import { Container } from "reactstrap";
import { Helmet } from "react-helmet";
// import { useTranslation } from "react-i18next";
import { Error403Icon } from "../../assets/svg";
import { Link } from "react-router-dom";

function Error403() {
  // const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Purple PRN - 403</title>
      </Helmet>
      <div className="error-content">
        <Error403Icon />
        <h2>Method not allowed</h2>
        <p>You do not have access to view this page</p>
        <Link to="/" className="pt-btn btn-primary pt-btn-small">
          Go Back
        </Link>
      </div>
    </>
  );
}

export default Error403;
