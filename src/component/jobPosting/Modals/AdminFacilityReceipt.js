import {
  ReceiptTexts,
  cardLastDigits,
  CARD_SVG,
  PERCENTAGE,
  PURPLEPT_SERVICE_CHARGES,
  StripeCharges,
  PAYMENT_RECEIPT,
  ACCEPT_IMAGE,
  PaymentMethods,
} from "constants/AppConstants";
import React, { useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader, UncontrolledTooltip } from "reactstrap";
import { AmericanExpressIcon, MastercardIcon, VisaIcon } from "assets/svg";
import { ReactComponent as DiscoverIcon } from "assets/images/icons/DiscoverIconTwo.svg";
import { ReactComponent as DinersclubIcon } from "assets/images/icons/DinersClubIcon.svg";
import { ReactComponent as UnionPayIcon } from "assets/images/icons/UnionPayIcon.svg";
import { ReactComponent as JCBIcon } from "assets/images/icons/JCBIcon.svg";
import fileDownload from "js-file-download";
import { GET_PAYMENT_RECEIPT } from "constants/ApiUrls";
import { api } from "api/Api";
import UploadFile from "component/common/uploadFile";
import Delete from "assets/images/icons/delete.png";
import { Link } from "react-router-dom";
import "../jobPosting.scss";
import { Lightbox } from "react-modal-image";
import { timeZone } from "utils/Utils";
import bankLogo from "assets/images/icons/bank.png";

const AdminReceiptModal = (props) => {
  const pdfRef = useRef(null);
  const [imagePopupModal, setImagePopupModal] = useState(false);
  const [src, setSrc] = useState(null);

  const totalShiftPay = (
    <div className="total-pay">
      <p>
        {ReceiptTexts?.totalShiftPay}
        <span>
          $
          {props?.hourlyRate ||
            Number(props?.totalAmount) /
              Number(props?.data?.originalTotalWorkedHours)}{" "}
          per hour x {props?.data?.originalTotalWorkedHours} hour
          {props?.data?.originalTotalWorkedHours >= 2 ? "s" : ""}
        </span>
      </p>
      <span>${props?.totalAmount}</span>
    </div>
  );

  const purplePTServiceChargePay = PERCENTAGE(
    props?.totalAmount,
    PURPLEPT_SERVICE_CHARGES,
  );
  const StripeAdditionPay =
    props?.data?.paymentMethod === PaymentMethods?.ACH
      ? 0
      : StripeCharges(
          Number(props?.totalAmount) + Number(purplePTServiceChargePay),
        );

  let grandTotalPay = Number(
    Number(props?.totalAmount) +
      Number(purplePTServiceChargePay) +
      Number(StripeAdditionPay),
  ).toFixed(2);

  let grandTotalPayString = "";

  if (grandTotalPay % 1 !== 0) {
    const before = grandTotalPay?.toString()?.split(".")[0];
    let after = Number(grandTotalPay?.toString()?.split(".")[1]);

    if (after < 10) {
      after *= 10;
      grandTotalPayString = before + `.${after}`;
    } else {
      grandTotalPayString = grandTotalPay;
    }
  } else {
    grandTotalPayString = grandTotalPay;
  }

  const purplePTServiceCharge = (
    <div className="total-pay">
      <p>
        {ReceiptTexts?.serviceFee}
        <span>
          {PaymentMethods?.ACH
            ? ReceiptTexts?.serviceFeeChargesACH
            : ReceiptTexts?.serviceFeeCharges}
        </span>
      </p>
      <span>
        $
        {Number(
          Number(purplePTServiceChargePay) + Number(StripeAdditionPay),
        )?.toFixed(2)}
      </span>
    </div>
  );

  const grandTotal = (
    <div className="total-pay">
      <p>{ReceiptTexts?.totalPay}</p>
      <span>${grandTotalPayString || props?.data?.grandTotal}</span>
    </div>
  );

  const downloadAsPDF = async () => {
    props?.setLoading(true);
    try {
      const response = await api(GET_PAYMENT_RECEIPT, {
        id: props?.data?.id,
        timeZone: timeZone(),
      });

      props?.setLoading(false);
      if (response && response.status === 200) {
        const fileName = props?.data?.serialNumber
          ? `${String(props?.data?.serialNumber)}_purplept_receipt.pdf`
          : "purplept_receipt.pdf";
        fileDownload(response?.data, fileName);
      }
    } catch (err) {
      console.log({ err });
      props?.setLoading(false);
    }
  };

  return (
    <>
      <Modal
        centered
        isOpen={props?.isOpen}
        toggle={props?.toggle}
        className={
          props?.data?.isFacility &&
          props?.data?.paymentStatus !== PaymentMethods?.Invoice
            ? "Pay-and-get"
            : ""
        }>
        <ModalHeader toggle={props?.toggle}>
          {props?.data?.isFacility ? "Facility" : "Clinician"} Receipts
        </ModalHeader>
        <ModalBody>
          {props?.data?.isFacility ? (
            <>
              {/* Virtual PDF */}
              {props?.data?.paymentStatus !== PaymentMethods?.Invoice && (
                <>
                  <div
                    className="slip"
                    id={PAYMENT_RECEIPT}
                    ref={pdfRef}
                    onClick={downloadAsPDF}>
                    <p>
                      <span>{ReceiptTexts?.shiftPaymentDetails}</span> <br />
                      {ReceiptTexts?.shiftId} {props?.data?.serialNumber}
                    </p>
                    <div className="top-detail">
                      <div className="amount-paid">
                        <p>{ReceiptTexts?.amountPaid}</p>
                        <span>${props?.data?.grandTotal || grandTotalPay}</span>
                      </div>
                      {props?.data?.facilityPaymentCardBrand === "Bank" ? (
                        <div className="amount-paid">
                          <p>{ReceiptTexts?.paymentMethod}</p>
                          <span>
                            <div className="card-img">
                              Bank -{" "}
                              <img
                                src={bankLogo}
                                className="img-fluid"
                                alt="bank logo"
                              />
                            </div>
                          </span>
                        </div>
                      ) : (
                        <div className="amount-paid">
                          <p>{ReceiptTexts?.paymentMethod}</p>
                          <span>
                            <div className="card-img">
                              {CARD_SVG?.includes(
                                props?.data?.facilityPaymentCardBrand,
                              ) ? (
                                <>
                                  {props?.data?.facilityPaymentCardBrand ===
                                    "amex" && <AmericanExpressIcon />}
                                  {props?.data?.facilityPaymentCardBrand ===
                                    "visa" && <VisaIcon />}
                                  {props?.data?.facilityPaymentCardBrand ===
                                    "mastercard" && <MastercardIcon />}
                                  {props?.data?.facilityPaymentCardBrand ===
                                    "discover" && <DiscoverIcon />}
                                  {props?.data?.facilityPaymentCardBrand ===
                                    "diners" && <DinersclubIcon />}
                                  {props?.data?.facilityPaymentCardBrand ===
                                    "unionpay" && <UnionPayIcon />}
                                  {props?.data?.facilityPaymentCardBrand ===
                                    "jcb" && <JCBIcon />}
                                </>
                              ) : (
                                <>
                                  {props?.data?.facilityPaymentCardBrand ===
                                  "Bank" ? (
                                    <img
                                      src={bankLogo}
                                      className="img-fluid"
                                      alt="bank logo"
                                    />
                                  ) : (
                                    props?.data?.facilityPaymentCardBrand || ""
                                  )}
                                </>
                              )}
                            </div>
                            -
                            {props?.data?.facilityPaymentCard
                              ? cardLastDigits(props?.data?.facilityPaymentCard)
                              : props?.data?.facilityPaymentCardBrand}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="total-summary">
                      <p>{ReceiptTexts?.summary}</p>
                      <div className="total-shift-charges">
                        <div className="total-shift">
                          {totalShiftPay}
                          {purplePTServiceCharge}
                        </div>

                        <div className="total-shift">{grandTotal}</div>
                      </div>
                    </div>
                    <p className="slip-footer">{ReceiptTexts?.stripe}</p>
                  </div>
                  <UncontrolledTooltip
                    placement="right"
                    target={PAYMENT_RECEIPT}>
                    {ReceiptTexts?.downloadPDF}
                  </UncontrolledTooltip>
                </>
              )}
              {/* Other Section */}
              <div className="payment-method">
                {props?.data?.paymentStatus !== PaymentMethods?.Invoice && (
                  <>
                    <p>{ReceiptTexts?.otherReceipts}</p>
                    <div className="select-card"></div>
                  </>
                )}
                <div className="cards">
                  {props?.data?.invoiceForFacility &&
                    props.data?.invoiceForFacility?.map((e, i) => {
                      return (
                        <>
                          {e?.url?.startsWith(
                            ReceiptTexts?.stripeReceiptUrl,
                          ) ? (
                            <a
                              className="pt-btn btn-primary pt-btn-small me-2 mb-3"
                              href={e?.url}
                              rel={"noreferrer"}
                              target="_blank">
                              {ReceiptTexts?.stripeReceipt}
                            </a>
                          ) : (
                            <div className="mb-4">
                              <Link
                                className="pt-btn btn-primary pt-btn-small me-2"
                                onClick={() => {
                                  setImagePopupModal(true);
                                  setSrc(e?.url);
                                }}>
                                {`${ReceiptTexts?.otherReceipt} #${i + 1}`}
                              </Link>
                              <img
                                src={Delete}
                                onClick={() =>
                                  props?.deleteCallbackFn(i, "facility")
                                }
                                className="img-fluid align-self-center cursor-pointer me-5"
                                alt="Lin"
                              />
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
                {props?.data.invoiceForFacility &&
                  !props?.data.invoiceForFacility[0] && (
                    <>
                      <div className="facility-receipt">
                        <div className="facility-receipt-upload">
                          <p>
                            1st {props?.data?.isFacility ? "Payment" : "Payout"}
                            :{" "}
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
                              props?.callbackFn(
                                respData,
                                props?.data?.isFacility,
                              )
                            }
                            deleteCallbackFn={(data, id, multiple) => {}}
                          />
                        </div>
                      </div>
                    </>
                  )}
                {props?.data.invoiceForFacility &&
                  !props?.data.invoiceForFacility[1] && (
                    <>
                      <div className="facility-receipt mt-2">
                        <div className="facility-receipt-upload">
                          <p>
                            2nd {props?.data?.isFacility ? "Payment" : "Payout"}
                            :{" "}
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
                              props?.callbackFn(
                                respData,
                                props?.data?.isFacility,
                              )
                            }
                            deleteCallbackFn={(data, id, multiple) => {}}
                          />
                        </div>
                      </div>
                    </>
                  )}
              </div>

              {props?.data?.paymentStatus !== PaymentMethods?.Invoice && (
                <div className="model-footer">
                  <span>{ReceiptTexts?.noteText}</span>
                  <p>{ReceiptTexts?.note}</p>
                </div>
              )}
            </>
          ) : (
            <>
              {props?.data?.invoiceForClinician &&
              props?.data?.invoiceForClinician[0] ? (
                <div className="facility-receipt">
                  <div className="facility-receipt-des">
                    <p>
                      {" "}
                      Initial {props?.data?.isFacility
                        ? "Payment"
                        : "Payout"}:{" "}
                    </p>
                    <Link
                      className="text-primary"
                      onClick={() => {
                        setImagePopupModal(true);
                        setSrc(props?.data.invoiceForClinician[0].url);
                      }}>
                      View
                    </Link>
                    <img
                      src={Delete}
                      onClick={() => props?.deleteCallbackFn(0, "clinician")}
                      className="img-fluid align-self-center cursor-pointer"
                      alt="delete"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="facility-receipt">
                    <div className="facility-receipt-upload">
                      <p>
                        {" "}
                        Initial {props?.data?.isFacility ? "Payment" : "Payout"}
                        :{" "}
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
                          props?.callbackFn(respData, props?.data?.isFacility)
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {props?.data.invoiceForClinician &&
              props?.data.invoiceForClinician[1] ? (
                <div className="facility-receipt">
                  <div className="mt-4 facility-receipt-des">
                    <p>
                      {" "}
                      2nd {props?.data?.isFacility ? "Payment" : "Payout"}:
                    </p>
                    <Link
                      className="text-primary"
                      onClick={() => {
                        setImagePopupModal(true);
                        setSrc(props?.data.invoiceForClinician[1].url);
                      }}>
                      View
                    </Link>
                    <img
                      src={Delete}
                      onClick={() => props?.deleteCallbackFn(1, "clinician")}
                      className="img-fluid align-self-center cursor-pointer"
                      alt="delete"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-4 facility-receipt">
                  <div className="facility-receipt-upload">
                    <p>
                      {" "}
                      2nd {props?.data?.isFacility ? "Payment" : "Payout"}:
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
                        props?.callbackFn(respData, props?.data?.isFacility)
                      }
                    />
                  </div>
                </div>
              )}
            </>
          )}
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
};

export default AdminReceiptModal;
