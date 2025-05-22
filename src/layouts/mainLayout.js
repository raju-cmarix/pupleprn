import { useContext, useEffect } from "react";
import Header from "../component/common/header/header";
import Footer from "../component/common/footer/footer";
import NotificationsContext, {
  UnreadContext,
} from "utils/context/NotificationsContext";
import { api } from "api/Api";
import { GET_NOTIFICATIONS, LOGOUT_URL } from "constants/ApiUrls";
import {
  LANDING_PAGE_URLS,
  LOCALSTORAGEDEVICETOKEN,
  MINUTE_MS,
  NOTIFICATIONPAGELIMIT,
  RESPONSE_OK,
} from "constants/AppConstants";
import UserContext from "utils/context/UserContext";
import AuthContext from "utils/context/AuthContext";
import { localStorageDeviceToken, newDeviceToken } from "utils/Utils";
import { useLocation, useNavigate } from "react-router-dom";
import LandingPageHeader from "component/common/header/LandingPageHeader";
import ReactPixel from "react-facebook-pixel";

const AdminLayout = ({ children }) => {
  const { setNotifications } = useContext(NotificationsContext);
  const { setUnreads } = useContext(UnreadContext);
  const { user, setUser } = useContext(UserContext);
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // This Function Only in use for getting Unread Notification Counts
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
      const interval = setInterval(() => getNotificationUnreads(), MINUTE_MS);

      return () => clearInterval(interval);
    }
  }, [isUserAuthenticated]);

  const srcToken = localStorageDeviceToken();

  useEffect(() => {
    if (user?.id) {
      newDeviceToken(user);
    }
  }, [srcToken]);

  const location = useLocation();

  useEffect(() => {
    if (location && location?.pathname) {
      if (
        location?.pathname?.startsWith("/facility/") &&
        location?.pathname?.length > "/facility/"?.length &&
        !user?.facilityId
      ) {
        if (isUserAuthenticated) {
          navigate("/");
        } else {
          navigate("/login");
        }
      }
      if (
        location?.pathname?.startsWith("/clinician/") &&
        location?.pathname?.length > "/clinician/"?.length &&
        !user?.clinicianId
      ) {
        if (isUserAuthenticated) {
          navigate("/");
        } else {
          navigate("/login");
        }
      }

      if (
        location?.pathname?.startsWith("/chat-profile") &&
        !user?.clinicianId &&
        !user?.facilityId
      ) {
        if (isUserAuthenticated) {
          navigate("/");
        } else {
          navigate("/login");
        }
      }
    }
  }, [location, user]);

  const advancedMatching = { em: user && user?.email ? user?.email : "" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
  const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
  };
  ReactPixel.init(
    process?.env?.REACT_APP_FACEBOOK_PIXEL_ID,
    advancedMatching,
    options,
  );

  ReactPixel.pageView(); // For tracking page view

  return (
    <>
      <div className={`theme-section light`}>
        {LANDING_PAGE_URLS.includes(location?.pathname) ||
        !user?.isApprovedByAdmin ? (
          <LandingPageHeader />
        ) : (
          <Header />
        )}
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
