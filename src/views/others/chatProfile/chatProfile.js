import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ChatLeftSide from "component/chatProfile/chatLeftSide";
import "component/chatProfile/chatProfile.scss";
import ChatRightSide from "component/chatProfile/chatRightSide";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "radash";
import fuzzysort from "fuzzysort";
import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

import {
  CREATE_CHAT_ROOM_URL,
  GET_MESSAGES_URL,
  GET_USER_ROOM_URL,
  SEND_MESSAGE_URL,
} from "constants/ApiUrls";
import UserContext from "utils/context/UserContext";
import { RESPONSE_OK, USERROLE } from "constants/AppConstants";
import { api } from "api/Api";
import queryString from "query-string";

function ChatProfile() {
  let io;
  const { state } = useLocation();
  const location = useLocation();
  const [qs, setQs] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    let qsObj = queryString.parse(location.search);
    if (qsObj?.open) {
      setQs({ ...qsObj });
      navigate(location?.pathname);
    }
  }, [location]);

  const soc = {
    url: process?.env?.REACT_APP_API_URL_SOCKET,
    path: "/socket.io",
    transports: ["websocket"],
  };

  useEffect(() => {
    if (socketIOClient.sails) {
      io = socketIOClient;
      io.sails.url = soc.url;
      io.sails.transports = soc.transports;
      io.sails.path = soc.path;
      io.sails.useCORSRouteToGetCookie = false;
      io.sails.reconnection = true;
      io.sails.reconnectionAttempts = 8;
      io.sails.reconnectionDelay = 100;
      io.socket.removeAllListeners();
    } else {
      io = sailsIOClient(socketIOClient);
      io.sails.url = soc.url;
      io.sails.transports = soc.transports;
      io.sails.path = soc.path;
      io.sails.useCORSRouteToGetCookie = false;
      io.sails.reconnection = true;
      io.sails.reconnectionAttempts = 8;
      io.sails.reconnectionDelay = 100;
      io.socket.removeAllListeners();
    }
  }, []);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]); // left side list of people
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [onlyOnce, setOnlyOnce] = useState(false);
  const fileCallbackFn = (res) => {
    setFiles([...files, ...res]);
  };

  const deleteCallbackFn = (res) => {
    setFiles([...res]);
  };

  useEffect(() => {
    const receiverId = localStorage.getItem("receiverId");
    if (receiverId) {
      // Now you have the receiverId, proceed with your logic here
      createChatRoom(receiverId);
      localStorage.removeItem("receiverId"); // Remove after usage
    }
  }, []);

  useEffect(() => {
    if (!user || !user.id) return;
    connectSocket();
    getUserRoom();

    return () => {
      io?.socket.on("disconnect", async (message) => {
        setIsConnected(false);
        io?.socket?.request(
          {
            method: "get",
            url: `/leave-socket/${user.id}`,
          },
          (body, jwres) => {
            if (!io?.socket?.isConnected() && !io?.socket?.isConnecting()) {
              io?.socket?.reconnect();
            }
          }
        );
      });
    };
  }, []);

  const getUserRoom = (newUserRoomId) => {
    setLoading(true);
    api(GET_USER_ROOM_URL, {}, null, {
      userId: user.id,
      search: search,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        const newUsers = [
          ...res.data.data?.map((e) => {
            return {
              ...e,
              firstName: e?.receiverUserDetails?.firstName,
              lastName: e?.receiverUserDetails?.lastName,
              fullName: `${e?.receiverUserDetails?.firstName} ${e?.receiverUserDetails?.lastName}`,
            };
          }),
        ];

        setUsers([...newUsers]);
        setFilteredUsers([...newUsers]);
        if (res.data.data && res.data.data.length) {
          let receiverId = null;

          receiverId = newUserRoomId || res.data.data[0].id;

          setRoomId(receiverId);
          getMessages(receiverId);
        }
      }
      setLoading(false);
    });
  };

  const updateUnreadCount = () => {
    api(GET_USER_ROOM_URL, {}, null, {
      userId: user.id,
      search: search,
      roomId,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        const newUsers = [
          ...res.data.data?.map((e) => {
            return {
              ...e,
              firstName: e?.receiverUserDetails?.firstName,
              lastName: e?.receiverUserDetails?.lastName,
              fullName: `${e?.receiverUserDetails?.firstName} ${e?.receiverUserDetails?.lastName}`,
            };
          }),
        ];
        setUsers([...newUsers]);
        setFilteredUsers([...newUsers]);
      }
    });
  };

  const getMessages = (id) => {
    api(GET_MESSAGES_URL, {}, null, {
      roomId: id,
      userId: user?.id,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        setRoomId(id);
        setChats([...res.data.data.messages]);
        updateUnreadCount();
      }
    });
  };

  const connectSocket = () => {
    io?.socket.on("connect", async () => {
      io?.socket?.request(
        {
          method: "get",
          url: `/join-socket/${user.id}`,
        },
        (body, jwres) => {}
      );
    });
  };

  useEffect(() => {
    io?.socket.on("NEW_MESSAGE", (data) => {
      setChats((prev) => [...prev, { ...data.createMessageDB }]);
      setOnlyOnce(true);
    });
  }, [io]);

  useEffect(() => {
    if (onlyOnce) {
      const newChats = chats?.filter((e) => e?.roomId === roomId);
      setChats([...newChats]);

      updateUnreadCount();

      setOnlyOnce(false);
    }
  }, [chats, onlyOnce]);

  const createChatRoom = (receiverId = null) => {
    if (receiverId) {
      api(CREATE_CHAT_ROOM_URL, {
        senderId: user.id,
        receiverId,
      }).then((res) => {
        if (res.status === RESPONSE_OK) {
          getUserRoom(res?.data?.data?.id);
        }
      });
    }
  };

  const sendMessage = () => {
    if ((message && message?.length > 0) || files.length > 0) {
      const mes = message?.trim();
      setMessage("");
      api(SEND_MESSAGE_URL, {
        userId: user.id,
        userRole: USERROLE(user),
        roomId,
        message: mes,
        messageTypes: files.length ? "files" : "texts",
        files: [...files],
      }).then((res) => {
        if (res.status === RESPONSE_OK) {
          setChats([...chats, { ...res.data.data }]);
          setFiles([]);
        }
      });
    }
  };

  useEffect(() => {
    if (isEmpty(state) && !qs?.open) return;
    createChatRoom(state?.receiverId || qs?.open || null);
  }, [state, qs]);

  useEffect(() => {
    if (search) {
      const newFilteredUsers = fuzzysort
        .go(search, users, { keys: ["fullName", "officeName"] })
        ?.map((result) => result?.obj);
      setFilteredUsers([...newFilteredUsers]);
    } else {
      setFilteredUsers([...users]);
    }
  }, [search, users]);

  const handleEnter = (ev) => {
    if (ev.key === "Enter") sendMessage();
  };

  return (
    <>
      <Helmet>
        <title>Purple PRN - Chat Profile</title>
      </Helmet>
      <div className="chat-main-content">
        <div className="custom-container">
          <div className="chat-box">
            {users.length > 0 && (
              <>
                <ChatLeftSide
                  search={search}
                  setSearch={setSearch}
                  data={filteredUsers}
                  handleUserClick={getMessages}
                  getUserRoom={getUserRoom}
                  roomId={roomId}
                />

                <ChatRightSide
                  files={files}
                  fileCallbackFn={fileCallbackFn}
                  deleteCallbackFn={deleteCallbackFn}
                  list={chats}
                  message={message}
                  setMessage={setMessage}
                  handleSendMessage={sendMessage}
                  handleEnter={handleEnter}
                />
              </>
            )}

            {/* FIXME ui design proper */}
            {!loading && !users.length && (
              <>
                <div className="chats-not-found">Chats not found</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatProfile;
