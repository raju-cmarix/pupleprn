import { api } from "api/Api";
import { DELETE_FILE_URL, FILE_UPLOAD_URL } from "constants/ApiUrls";
import {
  ACCEPT_IMAGE,
  ACCEPT_IMAGE_EXT,
  InvalidImages,
  InNewTab,
  POINTER,
  RESPONSE_CREATED,
  RESPONSE_OK,
  TOAST_AUTO_CLOSE,
} from "constants/AppConstants";
import { FILE_MAX_LIMIT } from "constants/messages";
import React, { useEffect, useRef, useState } from "react";
import { Slide, toast } from "react-toastify";
import { Spinner } from "reactstrap";
import Attach from "assets/images/icons/attach.png";
import { Close } from "assets/svg";

const UploadFileIcon = ({
  multiple,
  id,
  accept,
  max,
  callbackFn,
  folder,
  serverFiles,
  deleteCallbackFn,
  disabled,
  hideRemoveBtn,
}) => {
  const drop = useRef(null);
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (files && files.length) {
      handleUpload(e, files);
    }
  };
  const showToast = (msg) => {
    toast.error(msg, {
      transition: Slide,
      autoClose: TOAST_AUTO_CLOSE,
    });
  };
  useEffect(() => {
    drop?.current?.addEventListener("dragover", handleDragOver);
    drop?.current?.addEventListener("drop", handleDrop);

    return () => {
      drop?.current?.removeEventListener("dragover", handleDragOver);
      drop?.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  useEffect(() => {
    setFiles(serverFiles || []);
  }, [serverFiles]);

  const deleteFile = (item) => {
    let reqObj = { url: [item] };
    api(DELETE_FILE_URL, reqObj).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        let resData = files.filter((file) => file !== item);
        setFiles(resData);

        deleteCallbackFn(multiple ? resData : "", id);
      }
    });
  };

  const handleUpload = async (e, dropData = null) => {
    e.preventDefault();
    if (!dropData) dropData = e.target.files;
    if (!dropData.length) return;

    if (files.length + e.target.files.length > max) {
      toast.error(FILE_MAX_LIMIT(max), {
        autoClose: TOAST_AUTO_CLOSE,
      });
      return;
    }
    const formData = new FormData();

    formData.append("folder", folder);
    const temp = [];
    for (let i = 0; i < dropData.length; i++) {
      if (JSON.stringify(ACCEPT_IMAGE) === JSON.stringify(accept)) {
        const ext = dropData[i]?.type;
        if (ACCEPT_IMAGE?.includes(ext)) {
          formData.append(`file`, dropData[i]);
          temp?.push(dropData[i]);
        } else {
          showToast(InvalidImages);
        }
      } else {
        formData.append(`file`, dropData[i]);
        temp?.push(dropData[i]);
      }
    }
    if (temp?.length) {
      setLoader(true);
      api(FILE_UPLOAD_URL, formData)
        .then((res) => {
          if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
            let resData = [...res.data.data];

            setFiles([...files, ...resData]);
            callbackFn && callbackFn(resData, id, multiple);
            e.target.value = "";
            setLoader(false);
            return;
          } else {
          }
          e.target.value = "";
          setLoader(false);
        })
        .catch((err) => {
          toast.error(FILE_MAX_LIMIT(5), {
            autoClose: TOAST_AUTO_CLOSE,
          });
          console.log(err);
          setLoader(false);
        });
    }
  };

  return (
    <div id="upload-box">
      <div
        className={`${
          files ? "single-file uploaded " : "single-file"
        } border-0`}
      >
        {files.length > 0 &&
          files.map((item) => {
            return (
              <div key={item} className="upload-image">
                <a href={item} {...InNewTab}>
                  <img src={item} alt="" />
                </a>
                {!hideRemoveBtn && (
                  <span className={POINTER} onClick={() => deleteFile(item)}>
                    <Close />
                  </span>
                )}
              </div>
            );
          })}
        {loader && <Spinner color="secondary" />}{" "}
        <input
          hidden
          type="file"
          id={id}
          accept={accept}
          disabled={disabled ? disabled : max ? files.length === max : false}
          onChange={handleUpload}
          multiple={multiple}
        />
        <>
          <label
            htmlFor={id}
            className="pt-btn-icon btn-primary d-flex align-items-center justify-content-center cursor-pointer"
          >
            <img src={Attach} alt="" />
          </label>
        </>
      </div>
    </div>
  );
};

export default UploadFileIcon;
