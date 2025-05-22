import React, { useRef, useEffect } from "react";
import "component/chatProfile/chatProfile.scss";
import ChatFooter from "./ChatFooter";
import SingleChat from "./SingleChat";
import dayjs from "dayjs";
import { Fragment } from "react/cjs/react.production.min";

function ChatRightSide({
  message,
  setMessage,
  handleSendMessage,
  list,
  handleEnter,
  files,
  fileCallbackFn,
  deleteCallbackFn,
}) {
  const ref = useRef(null);

  const footerRef = useRef(null);
  useEffect(() => {
    footerRef?.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [list]);

  return (
    <>
      <div className="chat-right-side" ref={ref}>
        <div className="messages-chat">
          <div className="message-box">
            {list.length > 0 &&
              list.map((obj, index) => {
                let curDate = dayjs(obj.createdAt).startOf("day");
                let prevDate =
                  index > 0
                    ? dayjs(list[index - 1].createdAt).startOf("day")
                    : null;
                const display = curDate.isSame(prevDate)
                  ? null
                  : dayjs(obj.createdAt).format("DD MMM YYYY");
                return (
                  <Fragment key={index}>
                    {display ? (
                      <div className="chat-header">
                        <span>{display}</span>
                      </div>
                    ) : (
                      <></>
                    )}

                    <SingleChat key={obj.id} type={"left"} data={obj} u />
                  </Fragment>
                );
              })}
          </div>
          <span ref={footerRef}></span>
        </div>
        <ChatFooter
          files={files}
          fileCallbackFn={fileCallbackFn}
          deleteCallbackFn={deleteCallbackFn}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          handleEnter={handleEnter}
        />
      </div>
    </>
  );
}

export default ChatRightSide;
