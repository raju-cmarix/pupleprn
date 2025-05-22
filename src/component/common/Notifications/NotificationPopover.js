import { api } from "api/Api";
import { MARK_AS_READ_ALL_NOTIFICATIONS } from "constants/ApiUrls";
import { NOTIFICATIONPOPOVERLIMIT, RESPONSE_OK } from "constants/AppConstants";
import { useGetNotifications, useUpdateUnreads } from "hooks/useNotifications";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverBody } from "reactstrap";
import UserContext from "utils/context/UserContext";
import NotificationPopoverCard from "./NotificationPopoverCard";

const NotificationsPopover = ({ open, target, setShowPopup, userId }) => {
  const [filters, setFilters] = useState({
    isUnRead: 1,
    skip: 0,
    limit: NOTIFICATIONPOPOVERLIMIT,
  });

  const { notifications, setTrigger, getNotifications } = useGetNotifications(
    filters,
    setFilters,
  );
  const [setUnreadTrigger] = useUpdateUnreads(filters);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (open) {
      setTrigger(true);
    }
  }, [open]);

  const handleClearNotifications = async () => {
    const res = await api(MARK_AS_READ_ALL_NOTIFICATIONS, {
      userId: user.id,
    });

    if (res.status === RESPONSE_OK) {
      getNotifications();
    } else {
      console.log("Error marking notifications as read:");
    }
  };

  const handleTrigger = () => {
    setTrigger(true);
    setUnreadTrigger(true);
  };

  const handleToggle = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <>
      <Popover
        isOpen={open}
        placement="bottom"
        target={target}
        toggle={handleToggle}
        trigger={"legacy"}
        id="notification">
        <PopoverBody>
          <div className="notificatin-list">
            {notifications.unReadNotifications > 0 ? (
              <ul>
                {notifications?.data?.map((notification, key) => (
                  <NotificationPopoverCard
                    getNotifications={handleTrigger}
                    notification={notification}
                    refresh={handleTrigger}
                    key={key}
                    popover={true}
                    handleToggle={handleToggle}
                  />
                ))}
              </ul>
            ) : (
              <ul>
                <NotificationPopoverCard
                  getNotifications={handleTrigger}
                  notification={{}}
                  refresh={handleTrigger}
                  popover={true}
                  text={"No notifications found"}
                />
              </ul>
            )}

            {/* {notifications?.data?.length < 1 && (
              <div className="no-notification">No notification found</div>
            )} */}
            <div className="text-center">
              <Link
                to="/notifications"
                className="pt-btn btn-secondary pt-btn-small px-3 my-3"
                style={
                  notifications.unReadNotifications > 0
                    ? { marginLeft: "5px", marginRight: "5px" }
                    : {}
                }>
                View all notifications
              </Link>
            </div>

            {notifications.unReadNotifications > 0 && (
              <div className="text-center">
                <Link
                  onClick={handleClearNotifications}
                  className="pt-btn text-decoration-underline pt-btn-small px-3 my-3 mt-0"
                  style={{ color: "#382768" }}>
                  Clear all notifications
                </Link>
              </div>
            )}
          </div>
        </PopoverBody>
      </Popover>
    </>
  );
};

export default NotificationsPopover;
