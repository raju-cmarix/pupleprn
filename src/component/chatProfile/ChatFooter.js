import { Telegram } from "assets/svg";
import React from "react";
import { Input } from "reactstrap";
import { ACCEPT_IMAGE } from "constants/AppConstants";
import UploadFileIcon from "component/common/Notifications/UploadFileIcon";

export default function ChatFooter({
  message,
  setMessage,
  handleSendMessage,
  handleEnter,
  files,
  fileCallbackFn,
  deleteCallbackFn,
}) {
  return (
    <div className="chat-footer">
      <Input
        onKeyPress={(ev) => {
          handleEnter(ev);
        }}
        placeholder="Please type your message here"
        value={message}
        onChange={(ev) => setMessage(ev.target.value)}
        maxLength={1000}
      />
      <UploadFileIcon
        multiple={true}
        max={5}
        serverFiles={files}
        id="profileUrl"
        name={"profileUrl"}
        accept={ACCEPT_IMAGE}
        folder="images"
        dontShowFiles={true}
        callbackFn={fileCallbackFn}
        deleteCallbackFn={deleteCallbackFn}
      />

      <button
        className="pt-btn-icon btn-primary sendicon"
        onClick={() => handleSendMessage()}
      >
        <Telegram />{" "}
      </button>
    </div>
  );
}
