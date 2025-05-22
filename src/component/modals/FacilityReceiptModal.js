import UploadFile from "component/common/uploadFile";
import { ACCEPT_IMAGE, InNewTab } from "constants/AppConstants";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Delete from "../../assets/images/icons/delete.png";
import { Lightbox } from "react-modal-image";
export default function FacilityReceiptModal({
  modal,
  toggle,
  callbackFn,
  deleteCallbackFn,
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
          {data?.isFacility ? (
            <>
              <div className="facility-receipt">
                <div className="facility-receipt-des">
                  <p> Initial {data?.isFacility ? "Payment" : "Payout"}: </p>
                  {data.invoiceForFacility && data.invoiceForFacility[0] ? (
                    <a
                      className="text-primary"
                      onClick={() => setSrc(data.invoiceForFacility[0].url)}
                      href={data.invoiceForFacility[0].url}
                      {...InNewTab}
                    >
                      View
                    </a>
                  ) : (
                    <>Not found</>
                  )}
                </div>
              </div>
              {data.invoiceForFacility && data.invoiceForFacility[1] ? (
                <div className="facility-receipt">
                  <div className="facility-receipt-des">
                    <p>2nd {data?.isFacility ? "Payment" : "Payout"}: </p>
                    <Link
                      className="text-primary"
                      onClick={() => {
                        setImagePopupModal(true);
                        setSrc(data.invoiceForFacility[1].url);
                      }}
                    >
                      View
                    </Link>
                    <img
                      src={Delete}
                      onClick={() => deleteCallbackFn(1, "facility")}
                      className="img-fluid align-self-center"
                      alt="Lin"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="facility-receipt">
                    <div className="facility-receipt-upload">
                      <p>2nd {data?.isFacility ? "Payment" : "Payout"}: </p>
                      <UploadFile
                        serverFiles={[]}
                        multiple={false}
                        id="profileUrl"
                        name={"profileUrl"}
                        accept={ACCEPT_IMAGE}
                        folder="images"
                        max={1}
                        gridView={true}
                        callbackFn={(respData) =>
                          callbackFn(respData, data.isFacility)
                        }
                      />
                      <img
                        src={Delete}
                        className="img-fluid align-self-center"
                        alt=""
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {data.invoiceForClinician && data.invoiceForClinician[0] ? (
                <div className="facility-receipt">
                  <div className="facility-receipt-des">
                    <p> Initial {data?.isFacility ? "Payment" : "Payout"}: </p>
                    <Link
                      className="text-primary"
                      onClick={() => {
                        setImagePopupModal(true);
                        setSrc(data.invoiceForClinician[0].url);
                      }}
                    >
                      View
                    </Link>
                    <img
                      src={Delete}
                      onClick={() => deleteCallbackFn(0, "clinician")}
                      className="img-fluid align-self-center"
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="facility-receipt">
                    <div className="facility-receipt-upload">
                      <p>
                        {" "}
                        Initial {data?.isFacility ? "Payment" : "Payout"}:{" "}
                      </p>
                      <UploadFile
                        serverFiles={[]}
                        multiple={false}
                        id="profileUrl"
                        name={"profileUrl"}
                        accept={ACCEPT_IMAGE}
                        folder="images"
                        max={1}
                        gridView={true}
                        callbackFn={(respData) =>
                          callbackFn(respData, data.isFacility)
                        }
                      />
                      <img
                        src={Delete}
                        className="img-fluid align-self-center"
                        alt=""
                      />
                    </div>
                  </div>
                </>
              )}

              {data.invoiceForClinician && data.invoiceForClinician[1] ? (
                <div className="facility-receipt">
                  <div className="facility-receipt-des">
                    <p> 2nd {data?.isFacility ? "Payment" : "Payout"}:</p>
                    <Link
                      className="text-primary"
                      onClick={() => {
                        setImagePopupModal(true);
                        setSrc(data.invoiceForClinician[1].url);
                      }}
                    >
                      View
                    </Link>
                    <img
                      src={Delete}
                      onClick={() => deleteCallbackFn(1, "clinician")}
                      className="img-fluid align-self-center"
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <div className="facility-receipt mt-4">
                  <div className="facility-receipt-upload">
                    <p> 2nd {data?.isFacility ? "Payment" : "Payout"}:</p>
                    <UploadFile
                      serverFiles={[]}
                      multiple={false}
                      id="profileUrl"
                      name={"profileUrl"}
                      accept={ACCEPT_IMAGE}
                      folder="images"
                      max={1}
                      gridView={true}
                      callbackFn={(respData) =>
                        callbackFn(respData, data.isFacility)
                      }
                    />
                    <img src={Delete} className="img-fluid align-self-center" alt="" />
                  </div>
                </div>
              )}
            </>
          )}

          <div className="editworkmodal-btn text-center mt-5">
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
