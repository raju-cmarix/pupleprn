import React, { useState } from "react";
import { Input } from "reactstrap";
import { debounce } from "utils/Utils";
import { MessageIcon, SearchIcon } from "../../assets/svg";
import "../../component/chatProfile/chatProfile.scss";
import ChatUserCard from "./ChatUserCard";

function ChatLeftSide({
  data,
  handleUserClick,
  roomId,
  setSearch,
  getUserRoom,
}) {
  const [chat, setChalToggle] = useState(false);

  const ChatToggle = () => {
    setChalToggle(!chat);
  };
  const searchQuery = debounce((ev) => setSearch(ev?.target?.value), 300);

  return (
    <>
      <div className="chat-bar-btn d-md-none" onClick={ChatToggle}>
        <MessageIcon />
      </div>
      <div className={chat ? "chat-left-side active" : "chat-left-side"}>
        <div className="chat-search">
          <Input placeholder="Search" onChange={searchQuery} />
          <button
            className="pt-btn-icon btn-primary searchicon"
            onClick={() => getUserRoom()}
          >
            <SearchIcon />
          </button>
        </div>
        <div className="chat-users">
          <ul>
            {data?.length ? (
              data.map((obj) => {
                return (
                  <ChatUserCard
                    selectedRoomId={roomId}
                    key={obj.id}
                    data={obj.receiverUserDetails}
                    roomId={obj.id}
                    handleUserClick={handleUserClick}
                    unreads={obj?.unReadMessageCount || 0}
                    obj={obj}
                  />
                );
              })
            ) : (
              <>No Users Found</>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ChatLeftSide;
