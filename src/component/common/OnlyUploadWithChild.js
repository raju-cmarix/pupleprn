import { api } from "api/Api";
import { FILE_UPLOAD_URL } from "constants/ApiUrls";
import {
    ACCEPT_IMAGE,
    InvalidImages, RESPONSE_CREATED,
    RESPONSE_OK,
    TOAST_AUTO_CLOSE
} from "constants/AppConstants";
import { FILE_MAX_LIMIT } from "constants/messages";
import { useEffect, useRef, useState } from "react";
import { Slide, toast } from "react-toastify";

const OnlyUploadWithChild = ({
    multiple,
    id,
    accept,
    max,
    callbackFn,
    folder,
    serverFiles,
    disabled,
    children
}) => {

    const inputRef = useRef(null);
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

    //   const deleteFile = (item) => {
    //     let reqObj = { url: [item] };
    //     api(DELETE_FILE_URL, reqObj).then((res) => {
    //       if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
    //         let resData = files.filter((file) => file !== item);
    //         setFiles(resData);

    //         deleteCallbackFn(multiple ? resData : "", id);
    //       }
    //     });
    //   };

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
            // setLoader(true);
            let toastid  = toast.loading("File Uploading...", {
                type: "success",
            })
            api(FILE_UPLOAD_URL, formData).then((res) => {
                if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
                    let resData = [...res.data.data];

                    setFiles([...files, ...resData]);
                    callbackFn && callbackFn(resData, id, multiple);
                    e.target.value = "";
                    toast.dismiss();
                    return;
                } else {
                }
                e.target.value = "";
                toast.dismiss(toastid);
            }).catch(() => {
                toast.dismiss(toastid);
            });
        }
    };

    return (
        <>
            <div onClick={() => {
                inputRef?.current?.click();
            }}>
                <input
                ref={inputRef}
                    type="file"
                    id={id}
                    accept={accept}
                    disabled={
                        disabled ? disabled : max ? files.length === max : false
                    }
                    onChange={handleUpload}
                    multiple={multiple}
                    style={{display:'none'}}
                />
                {children}

            </div>

        </>
    );
};

export default OnlyUploadWithChild;
