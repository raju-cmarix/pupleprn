import { api } from "api/Api";
import { DELETE_FILE_URL, FILE_UPLOAD_URL } from "constants/ApiUrls";
import {
  ACCEPT_IMAGE,
  InvalidImages,
  InNewTab,
  POINTER,
  RESPONSE_CREATED,
  RESPONSE_OK,
  TOAST_AUTO_CLOSE,
  ACCEPT_IMAGE_EXT,
} from "constants/AppConstants";
import { FILE_MAX_LIMIT } from "constants/messages";
import React, { useEffect, useRef, useState } from "react";
import { Slide, toast } from "react-toastify";
import { Spinner } from "reactstrap";
import { convertCodeToBlankSpace, getFileExtension } from "utils/Utils";
import { Close, Plus, Upload } from "../../assets/svg";
import FormError from "./FormError";
import PDFIcon from "../../assets/images/pdf.png";

const UploadFile = ({
  multiple,
  id,
  accept,
  max,
  callbackFn,
  folder,
  gridView,
  label,
  icon,
  serverFiles,
  deleteCallbackFn,
  errors,
  disabled,
  hideRemoveBtn,
  otherFormData,
  uploadType,
  removeCsvFlag,
  dontShowFiles,
  showErrors,
  divClassName = "",
  errorMessage,
  onFileRemove,
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
    if (onFileRemove) {
      onFileRemove(item);
      let resData = files.filter((file) => file !== item);
      setFiles(resData);
      deleteCallbackFn(multiple ? resData : "", id);
    } else {
    api(DELETE_FILE_URL, reqObj).then((res) => {
      if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
        let resData = files.filter((file) => file !== item);
        setFiles(resData);

        deleteCallbackFn(multiple ? resData : "", id);
      }
    });
    }
  };
  useEffect(() => {
    if (removeCsvFlag && removeCsvFlag === true) {
      deleteFile(otherFormData.csvFile);
    }
  }, [removeCsvFlag]);
  const handleUpload = async (e, dropData = null) => {
    e.preventDefault();
    if (!dropData) dropData = e.target.files;
    if (!dropData.length) return;

    const file = dropData[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        folder = "images";
      } else if (fileType === "application/pdf") {
        folder = "docs";
      } else {
        folder = folder;
      }
    }
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
        let extArr = dropData[i]?.name?.split('.') || [];
        let e = extArr[extArr.length - 1]?.toLowerCase() || '';
        let file = dropData[i];
        if (["heic", "heif"].includes(e)) {
          file = dropData[i].slice(0, dropData[i].size, "image/heic")
        }
        if (ACCEPT_IMAGE?.includes(ext) || ACCEPT_IMAGE_EXT.includes(e)) {
          formData.append(`file`, file);
          temp?.push(file);
        } else {
          showToast(InvalidImages);
        }
      } else {
        let extArr = dropData[i]?.name?.split('.') || [];
        let e = extArr[extArr.length - 1]?.toLowerCase() || '';
        let file = dropData[i];
        if (["heic", "heif"].includes(e)) {
          file = dropData[i].slice(0, dropData[i].size, "image/heic")
        }
        formData.append(`file`, file);
        temp?.push(file);
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
    <>
      {!gridView &&
        files.length > 0 &&
        files.map((item) => {
          const ext = getFileExtension(item);
          return (
            <div key={item} className="upload-image">
              <a href={item} {...InNewTab} className="text-decoration-none">
                {item &&
                  (item.includes("png") ||
                    item.includes("PNG") ||
                    item.includes("jpg") ||
                    item.includes("JPG") ||
                    item.includes("jpeg") || 
                    item.includes("JPEG") ||
                    item.includes("heic") ||
                    item.includes("HEIC") ||
                    item.includes("heif") ||
                    item.includes("HEIF")) && <img src={item} alt="" />}
                {item && item.includes("pdf") && (
                  <img
                    src={PDFIcon}
                    alt=""
                    style={{ height: "80px", width: "100px" }}
                  />
                )}
              </a>
              {!hideRemoveBtn && (
                <span style={{ zIndex: 100 }} onClick={() => deleteFile(item)}>
                  <Close />
                </span>
              )}
            </div>
          );
        })}
      {gridView ? (
        <div id="upload-box">
          <div className={files ? "single-file uploaded " + divClassName : "single-file " + divClassName}>
            {loader && <Spinner color="secondary" />}
            <input
              type="file"
              id={id}
              accept={accept}
              disabled={
                disabled ? disabled : max ? files.length === max : false
              }
              onChange={handleUpload}
              multiple={multiple}
            />

            {files.length > 0 ? (
              <>
                {" "}
                {files.map((file) => {
                  let nameArr = file.split("/");
                  let name = convertCodeToBlankSpace(
                    nameArr[nameArr.length - 1]
                  );
                  return (
                    <div className="d-flex justify-content-between w-100">
                      <a href={file} style={{ zIndex: 100 }} {...InNewTab}>
                        <div className="filename">{name}</div>
                      </a>
                      {!hideRemoveBtn && (
                        <span
                          className={POINTER}
                          onClick={() => deleteFile(file)}
                          style={{ zIndex: 1000 }}
                        >
                          <Close />
                        </span>
                      )}
                    </div>
                  );
                })}
              </>
            ) : !loader ? (
              <>
                {<Upload />}
                Click here to upload file{" "}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <>
          {!gridView && files.length < max && (
            <div className="upload-button" ref={drop}>
              {loader ? (
                <Spinner color="secondary" />
              ) : (
                <div className="upload-plus">
                  {loader ? (
                    <Spinner color="secondary" />
                  ) : icon ? (
                    <>{icon}</>
                  ) : (
                    <Plus />
                  )}
                  {label}
                </div>
              )}
              <input
                id={id}
                accept={accept}
                type="file"
                disabled={
                  disabled ? disabled : max ? files.length === max : false
                }
                className="form-control"
                onChange={handleUpload}
                multiple={multiple}
              />
            </div>
          )}
        </>
      )}
      { }
      {showErrors && files.length <= 0 ? (
        <FormError msg={errorMessage || "Please upload PDF/image"} />
      ) : (
        <FormError msg={errors?.[id]} />
      )}
      {/* <FormError msg={errors?.[id]} /> */}
    </>
  );
};
export default UploadFile;