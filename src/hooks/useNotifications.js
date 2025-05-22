import { useNavigate } from "react-router-dom";

import { api } from "api/Api";
import { GET_NOTIFICATIONS, LOGOUT_URL } from "constants/ApiUrls";
import {
  LOCALSTORAGEDEVICETOKEN,
  NOTIFICATIONPAGELIMIT,
  RESPONSE_OK,
} from "constants/AppConstants";
import { useContext, useEffect, useState } from "react";
import AuthContext from "utils/context/AuthContext";
import NotificationsContext, {
  UnreadContext,
} from "utils/context/NotificationsContext";
import UserContext from "utils/context/UserContext";

export const useUpdateUnreads = () => {
  const navigate = useNavigate();
  const { setUnreads } = useContext(UnreadContext);
  const { setNotifications } = useContext(NotificationsContext);
  const { user, setUser } = useContext(UserContext);
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);

  // This Function only in use for getting Unread Notification Counts
  const getNotificationUnreads = () => {
    if (isUserAuthenticated) {
      api(GET_NOTIFICATIONS, {}, null, {
        skip: 0,
        limit: NOTIFICATIONPAGELIMIT,
        // userId: "8c631cb9-bd43-4fd2-8446-9b465c2b6a85",
        userId: user?.id,
      }).then((res) => {
        if (res.status === RESPONSE_OK) {
          if (res.data.userStatus === "deactivate") {
            const deviceToken = localStorage.getItem(LOCALSTORAGEDEVICETOKEN);
            api(LOGOUT_URL, {
              id: user.id,
              roles: user.roles,
              deviceToken:
                deviceToken && deviceToken !== "null" ? deviceToken : null,
            }).then((res) => {
              setUser({});
              setIsUserAuthenticated(false);
              localStorage.removeItem(LOCALSTORAGEDEVICETOKEN);
              localStorage.removeItem("purplePTAuthToken");
              localStorage.removeItem("purplePTRefreshToken");
              localStorage.removeItem("userRole");
              localStorage.removeItem("userId");
              localStorage.removeItem("2FA");
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
    }
    if (trigger) setTrigger(false);
  };
  // every given time interval this useEffect calls the getNotifications function
  useEffect(() => trigger && getNotificationUnreads(), [trigger]);

  const returnArray = [setTrigger];

  return returnArray;
};

export const useGetNotifications = (filters, setFilters, fromPage = false) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({});
  const [trigger, setTrigger] = useState(false);
  const [loader, setLoader] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const { setUnreads } = useContext(UnreadContext);
  // Get Notifications Function does api call and then stores notifications in state and also counts unread notifications
  const getNotifications = () => {
    if (isUserAuthenticated) {
      setLoader(true);
      api(GET_NOTIFICATIONS, {}, null, {
        ...filters,
        // userId: "8c631cb9-bd43-4fd2-8446-9b465c2b6a85",
        userId: user?.id,
      })
        .then((res) => {
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
                localStorage.removeItem(LOCALSTORAGEDEVICETOKEN);
                localStorage.removeItem("purplePTAuthToken");
                localStorage.removeItem("purplePTRefreshToken");
                localStorage.removeItem("userRole");
                localStorage.removeItem("userId");
                localStorage.removeItem("2FA");
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
        })
        .finally(() => {
          setLoader(false);
        });
    }
    if (trigger) {
      setTrigger(false);
    }
  };

  useEffect(() => {
    if (trigger) {
      getNotifications();
    }
  }, [trigger]);

  useEffect(() => {
    getNotifications();
  }, [filters]);
  // useEffect(() => {
  //   const interval = setInterval(() => getNotifications(), MINUTE_MS);

  //   if (fromPage) {
  //     setFilters({
  //       skip: 0,
  //       limit: NOTIFICATIONPAGELIMIT,
  //     });
  //   }

  //   return () => clearInterval(interval);
  // }, []);

  return { notifications, setTrigger, getNotifications, loader };
};
