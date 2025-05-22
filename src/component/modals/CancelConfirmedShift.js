import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function UploadTimeCardModal({
  modal,
  toggle,
  serverTimeCard,
}) {
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
        Cancel Confirmed Shift
      </ModalHeader>
      <ModalBody>
        <div className="form-group mb-48">
          <label htmlFor="State">Do you really want to cancel this confirmed shift?</label>
          {/* <div className="signup-upload-file mb-48">
            <UploadFile
              gridView={true}
              multiple={false}
              id="timeCard"
              name={"timeCard"}
              accept={ACCEPT_IMAGE}
              folder="images"
              max={1}
              callbackFn={(res) => handleSave(res[0], toggle)}
              deleteCallbackFn={() => handleSave(null, toggle)}
              serverFiles={file ? [file] : []}
            />
          </div> */}
        </div>
        <div className="modal-footer text-center">
        <button
            className="btn-gray pt-btn pt-btn-small"
          >
            No
          </button>
          <button
            className="btn-primary pt-btn pt-btn-small"
          >
            Yes
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
