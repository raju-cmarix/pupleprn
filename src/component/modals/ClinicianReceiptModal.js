import UploadFile from "component/common/uploadFile";
import { ACCEPT_IMAGE } from "constants/AppConstants";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Lightbox } from "react-modal-image";
export default function FacilityReceiptModal({
  modal,
  toggle,
  callbackFn,
  data,
}) {
  const [imagePopupModal, setImagePopupModal] = useState(false);
  const [src, setSrc] = useState(null);
  return (
    <>
      <Modal
        centered
        isOpen={modal}
        toggle={toggle}
        backdrop={false}
        keyboard={false}
      >
        <ModalHeader toggle={toggle}>
          {data?.isFacility ? "Facility" : "Clinician"} Receipts
        </ModalHeader>
        <ModalBody>
          <p className="timecard">
            Initial {data?.isFacility ? "Payment" : "Payout"}:{" "}
            {data.invoiceForClinician && data.invoiceForClinician[0] ? (
              <Link
                className="text-primary"
                onClick={() => {
                  setImagePopupModal(true);
                  setSrc(data.invoiceForClinician[0].url);
                }}
              >
                View
              </Link>
            ) : (
              <>
                <UploadFile
                  serverFiles={[]}
                  multiple={false}
                  id="profileUrl"
                  name={"profileUrl"}
                  accept={ACCEPT_IMAGE}
                  folder="images"
                  max={1}
                  gridView={true}
                  callbackFn={(data, id, multiple) =>
                    callbackFn(data, id, multiple)
                  }
                  deleteCallbackFn={(data, id, multiple) => {}}
                />
              </>
            )}
          </p>
          <p className="timecard">
            2nd {data?.isFacility ? "payout" : "payment"}:{" "}
            {data.invoiceForClinician && data.invoiceForClinician[1] ? (
              <Link
                className="text-primary"
                onClick={() => {
                  setImagePopupModal(true);
                  setSrc(data.invoiceForClinician[1].url);
                }}
              >
                View
              </Link>
            ) : (
              <>
                <UploadFile
                  serverFiles={[]}
                  multiple={false}
                  id="profileUrl"
                  name={"profileUrl"}
                  accept={ACCEPT_IMAGE}
                  folder="images"
                  max={1}
                  gridView={true}
                  callbackFn={(data, id, multiple) =>
                    callbackFn(data, id, multiple)
                  }
                  deleteCallbackFn={(data, id, multiple) => {}}
                />
              </>
            )}
          </p>

          <div className="editworkmodal-btn text-center">
            <button
              className="btn-primary pt-btn-small pt-btn"
              onClick={toggle}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* <ImagePopupModal
        src={src}
        modal={imagePopupModal}
        toggle={() => setImagePopupModal(!imagePopupModal)}
      /> */}
      {imagePopupModal && (
        <Lightbox
          small={src}
          large={src}
          alt="preview"
          onClose={() => setImagePopupModal(!imagePopupModal)}
        />
      )}
    </>
  );
}
