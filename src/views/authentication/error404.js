import React from "react";
import { Helmet } from "react-helmet";
import { Error404Icon } from "../../assets/svg";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Purple PRN - 404</title>
      </Helmet>
      <div className="error-content">
        <Error404Icon />

        <h2>Sorry, Page not found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable
        </p>
        <div
          onClick={() => navigate(-1)}
          className="pt-btn btn-primary pt-btn-small"
        >
          Go Back
        </div>
      </div>
    </>
  );
}

export default Error404;
