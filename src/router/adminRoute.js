import AdminLayout from "../layouts/adminLayout";
import { Navigate, useLocation } from "react-router-dom";
import FullLayout from "layouts/fullLayout";
import AuthContext from "utils/context/AuthContext";
import { useContext } from "react";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { isUserAuthenticated } = useContext(AuthContext);

  if (!isUserAuthenticated && location?.pathname !== "/admin/verification") {
    return <Navigate to="/login" />
  }

  return location?.pathname === "/admin/verification" ? (
    <FullLayout>{children}</FullLayout>
  ) : (
    <AdminLayout>{children}</AdminLayout>
  );
};

export default AdminRoute;
