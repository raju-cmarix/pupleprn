import React, { useContext } from "react";
import FullLayout from "../layouts/fullLayout";
import AuthContext from "utils/context/AuthContext";
import { Navigate } from "react-router-dom";
import UserContext from "utils/context/UserContext";
import { getRouteFromRole } from "utils/Utils";

const PublicRoute = ({ children }) => {
  const { isUserAuthenticated } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  let route = getRouteFromRole(user || {});

  return (
    <>
      {!isUserAuthenticated ? (
        <FullLayout>{children}</FullLayout>
      ) : (
        <Navigate to={route} />
      )}
    </>
  );
};

export default PublicRoute;
