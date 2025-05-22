import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "utils/context/UserContext";
import Header from "../component/common/adminHeader/adminHeader";
import Footer from "../component/common/footer/footer";
import AuthContext from "utils/context/AuthContext";
import NotificationsContext, {
  UnreadContext,
} from "utils/context/NotificationsContext";
import { GET_NOTIFICATIONS, LOGOUT_URL } from "constants/ApiUrls";
import { api } from "api/Api";
import {
  LOCALSTORAGEDEVICETOKEN,
  MINUTE_MS,
  NOTIFICATIONPAGELIMIT,
  RESPONSE_OK,
} from "constants/AppConstants";

const AdminLayout = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const { setNotifications } = useContext(NotificationsContext);
  const { setUnreads } = useContext(UnreadContext);
  const role = localStorage.getItem("userRole");

  const getNotificationUnreads = () => {
    api(GET_NOTIFICATIONS, {}, null, {
      skip: 0,
      limit: NOTIFICATIONPAGELIMIT,
      userId: user?.id,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        if (res.data.userStatus === "deactivate") {
          const deviceToken = localStorage.getItem(LOCALSTORAGEDEVICETOKEN);
          api(LOGOUT_URL, {
            id: user.subUserId || user.id,
            roles: user.roles,
            deviceToken:
              deviceToken && deviceToken !== "null" ? deviceToken : null,
          }).then((res) => {
            setUser({});
            setIsUserAuthenticated(false);
            localStorage.removeItem("purplePTAuthToken");
            localStorage.removeItem("purplePTRefreshToken");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userId");
            localStorage.removeItem("2FA");
            localStorage.removeItem(LOCALSTORAGEDEVICETOKEN);
            let id = localStorage.getItem("PURPTID");
            if (id) {
              clearInterval(id);
            }
            navigate("/login");
          });
        } else {
          setUnreads(res?.data?.unReadNotifications);
          setNotifications(res?.data);
        }
      }
    });
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      if (role === "subadmin") {
        const interval = setInterval(() => getNotificationUnreads(), MINUTE_MS);

        return () => clearInterval(interval);
      }
    }
  }, [isUserAuthenticated]);

  useEffect(() => {
    if (location && location?.pathname) {
      if (
        location?.pathname?.startsWith("/admin") &&
        (user?.facilityId || user?.clinicianId)
      ) {
        navigate("/");
      }
    }
  }, [location, user]);

  return (
    <>
      <div className={`theme-section light`}>
        <Header direction={"down"} />
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
