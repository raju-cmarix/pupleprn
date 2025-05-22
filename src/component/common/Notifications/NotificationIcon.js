import { ADMIN, CURSORPOINTER } from "constants/AppConstants";
import { useContext, useState } from "react";
import AuthContext from "utils/context/AuthContext";
import { UnreadContext } from "utils/context/NotificationsContext";
import UserContext from "utils/context/UserContext";
import { ReactComponent as Notification } from "../../../assets/images/icons/notification-bell.svg";
import NotificationsPopover from "./NotificationPopover";
import "./Notifications.scss";

const NotificationIcon = (props, userId) => {
  const { unreads } = useContext(UnreadContext);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useContext(UserContext);
  const { isUserAuthenticated } = useContext(AuthContext);

  const UNREADS_CLASSNAME = unreads > 99 ? "three-digits" : "";

  return (
    <>
      {isUserAuthenticated &&
      (user?.roles === ADMIN ? true : user?.isApprovedByAdmin) ? (
        <>
          <span
            id={props?.id || "PopoverLegacy"}
            className={props?.className || "wellicon"}
            onClick={(e) => {
              e.currentTarget.focus();
              setShowPopup(!showPopup);
            }}
            style={CURSORPOINTER}
            tabIndex={0}
          >
            <Notification id={props?.id || "PopoverLegacy"} />
            {unreads > 0 && <span>{unreads}</span>}
          </span>

        
          <NotificationsPopover
            target={props?.id || "PopoverLegacy"}
            open={showPopup}
            userId={userId}
            setShowPopup={setShowPopup}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default NotificationIcon;
