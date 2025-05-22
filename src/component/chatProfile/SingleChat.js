import { ACCEPT_IMAGE_EXT } from "constants/AppConstants";
import dayjs from "dayjs";
import React, { useContext, forwardRef } from "react";
import UserContext from "utils/context/UserContext";
import { convertCodeToBlankSpace } from "utils/Utils";
export default function SingleChat({ data }) {
  const { user } = useContext(UserContext);

  return (
    <div
      className={user.id === data.userId ? "message" : "message left-box"}
      data={data.createdAt}
    >
      <div className="response">
        {/* {data.message ? (
          <p className="text">{data?.message}</p>
        ) : (
          <>
            {data.files.map((file) => {
              let nameArr = file.split("/");
              let name = convertCodeToBlankSpace(nameArr[nameArr.length - 1]);
              return (
                <p className="text">
                  {name} {"  "}
                  <a href={file}>Download</a>
                </p>
              );
            })}
            {data.message && <p className="text">{data?.message}</p>}
          </>
        )} */}
        <>
          {data?.files && data?.files?.length > 0 ? (
            data?.files.map((file) => {
              let nameArr = file.split("/");
              let name = convertCodeToBlankSpace(nameArr[nameArr.length - 1]);
              const ext = name?.split(".")[name?.split(".")?.length - 1];

              return (
                <p className="text">
                  {ACCEPT_IMAGE_EXT?.includes(ext) ? (
                    <a href={file}>
                      <img
                        className="mb-2 chat-msg-image"
                        src={file}
                        alt={name}
                      />
                    </a>
                  ) : (
                    <a href={file}>{name}</a>
                  )}

                  <br />
                  {data.message || ""}
                </p>
              );
            })
          ) : (
            <p className="text">{data.message || ""}</p>
          )}
        </>
      </div>
      <p className="response-time time">
        {" "}
        {dayjs(data.createdAt).format("hh:mm a")}
      </p>
    </div>
  );
}
