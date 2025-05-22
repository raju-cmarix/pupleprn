import React, { useContext } from "react";
import MainLayout from "../layouts/mainLayout";
import AuthContext from "utils/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const { isUserAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isUserAuthenticated ? (
        <MainLayout>{children}</MainLayout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateRoute;
