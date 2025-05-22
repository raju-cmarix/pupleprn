import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function ViewTimeCardModal({ modal, toggle, data }) {
  const [previewModal, setPreviewModal] = useState(false);
  const [src, setSrc] = useState("");

  const handleClose = () => {
    toggle();
    setPreviewModal(false);
  };
  // useEffect(() => {
  //   if (previewModal) {
  //     window.open(src, "_blank");
  //   }
  // }, [previewModal, src]);

  // // Add useEffect to reset previewModal when component unmounts or modal prop changes
  // useEffect(() => {
  //   return () => {
  //     setPreviewModal(false);
  //   };
  // }, [modal]);
  const openPreview = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Avoids the opened window having a reference to the current window
    }
  };
  return (
    <>
      <Modal
        centered
        isOpen={modal}
        toggle={toggle}
        className="edittimework-modal"
      >
        <ModalHeader toggle={handleClose}>View Time Card</ModalHeader>
        <ModalBody>
          <div
            className={data?.timeCardUrlForFacility ? "timecard" : "no-data"}
          >
            <p> Facility: </p>
            {data?.timeCardUrlForFacility ? (
              <Link
                className="text-primary"
                onClick={() => openPreview(data?.timeCardUrlForFacility)}
                // onClick={() => {
                //   setPreviewModal(true);
                //   setSrc(data?.timeCardUrlForFacility);
                // }}
              >
                View
              </Link>
            ) : (
              <>Not found</>
            )}
          </div>
          <div
            className={data?.timeCardUrlForClinician ? "timecard" : "no-data"}
          >
            <p>Clinician: </p>
            {data?.timeCardUrlForClinician ? (
              <Link
                className="text-primary"
                onClick={() => openPreview(data?.timeCardUrlForClinician)}
                // onClick={() => {
                //   setPreviewModal(true);
                //   setSrc(data?.timeCardUrlForClinician);
                // }}
              >
                View
              </Link>
            ) : (
              <>Not found</>
            )}
          </div>
          <div className="editworkmodal-btn text-center">
            <button className="btn-primary pt-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* <ImagePopupModal
        src={src}
        modal={previewModal}
        toggle={() => setPreviewModal(!previewModal)}
      /> */}
      {/* {previewModal && (
        <div>{window.open(src, "_blank")}</div>

        // <Lightbox
        //   small={src}
        //   large={src}
        //   alt="preview"
        //   onClose={() => setPreviewModal(!previewModal)}
        // />
      )} */}
      {/* {previewModal && null} */}
    </>
  );
}
