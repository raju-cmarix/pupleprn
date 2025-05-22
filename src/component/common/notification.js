import { NOTIFICATIONPAGELIMIT } from "constants/AppConstants";
import { useGetNotifications, useUpdateUnreads } from "hooks/useNotifications";
import { useState } from "react";
import { Helmet } from "react-helmet";
import CustomPagination from "./customPagination";
import NotificationPopoverCard from "./Notifications/NotificationPopoverCard";
import { Spinner } from "reactstrap";

const Notification = () => {
  // states.
  const [filters, setFilters] = useState({
    skip: 0,
    limit: NOTIFICATIONPAGELIMIT,
  });

  const { notifications, setTrigger, loader } = useGetNotifications(
    filters,
    setFilters,
    true,
  );
  const [setUnreadTrigger] = useUpdateUnreads(filters);

  // trigger function which triggers custom hook to update notifications both at same time.
  const trigger = () => {
    setTrigger(true);
    setUnreadTrigger(true);
  };

  return (
    <>
      <Helmet>
        <title>Purple PRN - notifications</title>
      </Helmet>
      <div className="notifications-main">
        <div className="custom-container">
          <>
            <h1>Notifications</h1>
            {/* <MarkAllReadAtPage refresh={trigger} /> */}
          </>
          {loader && notifications?.data?.length === 0 && (
            <div className="d-flex justify-content-center align-items-center">
              {<Spinner />}
            </div>
          )}
          <div className="notifications-list">
            <ul>
              {notifications?.data?.length > 0 &&
                notifications?.data?.map((notification, key) => (
                  <NotificationPopoverCard
                    notification={notification}
                    refresh={trigger}
                    key={key}
                    popover={false}
                  />
                ))}
              {!loader && notifications?.data?.length === 0 && (
                <>
                  <p className="no-data">There are no notifications</p>
                </>
              )}
            </ul>
            <CustomPagination
              count={notifications?.count || 0}
              filters={filters}
              setFilters={setFilters}
              key={"notificationpage"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
