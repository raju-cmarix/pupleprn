import { api } from "api/Api";
import { READ_NOTIFICATION } from "constants/ApiUrls";
import {
  DEFAULT_NOTIFICATION_TYPE,
  NotificationType,
  NOTIFICATION_DATE_TIME_FORMAT,
  POINTER,
  VIEW_DETAILS,
} from "constants/AppConstants";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "utils/context/UserContext";
import { getDateFormat } from "utils/Utils";

const NotificationPopoverCard = ({handleToggle, notification, refresh, text}) => {
  const readNotificationData = {
    notificationId: notification?.id,
  };
  const date =
    "- " +
    getDateFormat(notification.createdAt, NOTIFICATION_DATE_TIME_FORMAT) +
    " ";
  const handleReadUpdate = () => {
    api(READ_NOTIFICATION, readNotificationData, null, {})
      .then((response) => {
        refresh();
      })
      .catch((error) => {
        refresh();
      });
  };
  const { user } = useContext(UserContext);
  if (!notification || Object.keys(notification).length === 0) {
    return (
      <li>
        <p className="text-center" style={{ marginLeft: "auto", marginRight: "auto" }}> {text }</p>
      </li>
    );
  }
  return (
    <li
      className={notification?.isRead ? "" : "active"}
      onClick={() => {
        if (!notification?.isRead) {
          handleReadUpdate();
          handleToggle();
        }
      }}
      style={{ cursor: notification?.isRead ? "default" : POINTER }}
    >
      <p>
        {notification?.title}
        <br />
        {notification?.body || ""}
        <span className="d-block">{date}</span>
      </p>
      <Link
        to={NotificationType(
          notification?.type || DEFAULT_NOTIFICATION_TYPE,
          notification?.details?.jobId,
          notification?.details?.facilityId,
          user,
          notification?.details?.roles,
          notification?.type || DEFAULT_NOTIFICATION_TYPE
        )}
        state={{
          receiverId: notification?.fromUser || "",
        }}
        className="btn-link text-primary"
      >
        {VIEW_DETAILS}
      </Link>
    </li>
  );
};

export default NotificationPopoverCard;
