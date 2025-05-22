import { useEffect, useState } from "react";
import UploadFile from "component/common/uploadFile";
import { ACCEPT_IMAGE, ACCEPT_IMAGE_PDF } from "constants/AppConstants";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function UploadTimeCardModal({
  modal,
  toggle,
  handleSave,
  serverTimeCard,
}) {
  const role = localStorage.getItem("userRole");
  const [file, setFile] = useState(null);

  const fileCallbackFn = (res) => setFile(res[0]);

  const deleteCallbackFn = () => setFile(null);

  useEffect(() => setFile(serverTimeCard || null), [serverTimeCard]);

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="edittimework-modal"
    >
      <ModalHeader toggle={toggle}>
        {serverTimeCard ? "View" : "Upload"} Time Card
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label htmlFor="State">Time card</label>
          <div className="signup-upload-file mb-48">
            <UploadFile
              gridView={true}
              multiple={false}
              id="timeCard"
              name={"timeCard"}
              // accept={ACCEPT_IMAGE}
              accept={role === "facility" ? ACCEPT_IMAGE : ACCEPT_IMAGE_PDF}
              folder="images"
              max={1}
              callbackFn={(res) => handleSave(res[0], toggle)}
              deleteCallbackFn={() => handleSave(null, toggle)}
              serverFiles={file ? [file] : []}
            />
          </div>
        </div>
        {/* <div className="editworkmodal-btn text-center">
          <button
            className="btn-primary pt-btn pt-btn-small"
            onClick={() => {
              handleSave(file, toggle);
              setFile(null);
            }}
          >
            Save
          </button>
        </div> */}
      </ModalBody>
    </Modal>
  );
}
