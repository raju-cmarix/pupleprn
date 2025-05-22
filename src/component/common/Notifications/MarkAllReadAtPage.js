import { api } from "api/Api";
import { READ_ALL_NOTIFICATION } from "constants/ApiUrls";
import { CURSORPOINTER } from "constants/AppConstants";
import React, { useContext } from "react";
import UserContext from "utils/context/UserContext";

const MarkAllReadAtPage = (props) => {
  const { user } = useContext(UserContext);
  const readAllNotification = {
    userId: user?.id,
  };
  const handleReadAllNotifications = () => {
    api(READ_ALL_NOTIFICATION, readAllNotification, null, {})
      .then((response) => {
        props.refresh();
      })
      .catch((error) => {
        props.refresh();
      });
  };
  return (
    <h5 style={CURSORPOINTER} onClick={handleReadAllNotifications}>
      <u>mark all as read</u>
    </h5>
  );
};

export default MarkAllReadAtPage;
