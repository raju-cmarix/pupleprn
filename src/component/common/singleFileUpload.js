import React from "react";
import { Close, Upload } from "../../assets/svg";


function SingleFileUpload() {
  const [file, setFile] = React.useState("");

  function handleUpload(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div id="upload-box">
        <div  className={file ? "single-file uploaded" : "single-file"}>
            <input type="file" onChange={handleUpload} />
           { file ? <div className="d-flex justify-content-between w-100">{file.name} <Close /></div>  : <><Upload />Click here to upload file </>}
      </div>
    </div>
  );
}



export default SingleFileUpload;
