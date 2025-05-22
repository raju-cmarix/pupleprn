import React, { useContext } from "react";
import { SmallLogoURL } from "constants/AppConstants";
import { getFullName } from "utils/Utils";
import UserContext from "utils/context/UserContext";

export default function ChatUserCard({
  data,
  roomId,
  handleUserClick,
  selectedRoomId,
  unreads,
  obj,
}) {
  const { user } = useContext(UserContext);
  return (
    <>
      <li
        onClick={() => handleUserClick(roomId)}
        className={selectedRoomId === roomId ? "active" : ""}
      >
        <a>
          <img src={data.profileImageUrl || SmallLogoURL} alt={"Profile"} />
          <span>{!user?.facilityId ? obj?.officeName : getFullName(data)}</span>
          {selectedRoomId !== roomId && unreads > 0 && (
            <div className={"wellicon"}>
              <span>{unreads}</span>
            </div>
          )}
        </a>
      </li>
    </>
  );
}
