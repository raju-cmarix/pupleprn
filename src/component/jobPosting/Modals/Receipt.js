import {
  ReceiptTexts,
  cardLastDigits,
  CARD_SVG,
  PERCENTAGE,
  PURPLEPT_SERVICE_CHARGES,
  StripeCharges,
  PAYMENT_RECEIPT,
  PaymentMethods,
  StripeChargesAccount,
} from "constants/AppConstants";
import React, { useRef } from "react";
import { Modal, ModalBody, ModalHeader, UncontrolledTooltip } from "reactstrap";
import { AmericanExpressIcon, MastercardIcon, VisaIcon } from "assets/svg";
import { ReactComponent as DiscoverIcon } from "assets/images/icons/DiscoverIconTwo.svg";
import { ReactComponent as DinersclubIcon } from "assets/images/icons/DinersClubIcon.svg";
import { ReactComponent as UnionPayIcon } from "assets/images/icons/UnionPayIcon.svg";
import { ReactComponent as JCBIcon } from "assets/images/icons/JCBIcon.svg";
import fileDownload from "js-file-download";
import { GET_PAYMENT_RECEIPT } from "constants/ApiUrls";
import { api } from "api/Api";
import { timeZone } from "utils/Utils";
const ReceiptModal = (props) => {
  const pdfRef = useRef(null);

  const totalShiftPay = (
    <div className="total-pay">
      <p>
        {ReceiptTexts?.totalShiftPay}
        <span>
          $
          {props?.hourlyRate ||
            (
              Number(props?.totalAmount) /
              Number(props?.data?.originalTotalWorkedHours)
            )?.toPrecision(1)}{" "}
          per hour x {props?.data?.originalTotalWorkedHours} hour
          {props?.data?.originalTotalWorkedHours >= 2 ? "s" : ""}
        </span>
      </p>
      <span>${props?.totalAmount}</span>
    </div>
  );

  const purplePTServiceChargePay = PERCENTAGE(
    props?.totalAmount,
    PURPLEPT_SERVICE_CHARGES
  );
  const totalAmountAndServiceCharge =
    purplePTServiceChargePay + Number(props?.totalAmount);

  const StripeAdditionPay =
    props?.data?.paymentMethod === PaymentMethods?.ACH
      ? 0
      : StripeCharges(totalAmountAndServiceCharge);

  let grandTotalPay = Number(
    Number(totalAmountAndServiceCharge) + Number(StripeAdditionPay)
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
          {props?.data?.paymentMethod === PaymentMethods?.ACH
            ? ReceiptTexts?.serviceFeeChargesACH
            : ReceiptTexts?.serviceFeeCharges}
        </span>
      </p>
      <span>
        $
        {Number(
          Number(purplePTServiceChargePay) + Number(StripeAdditionPay)
        )?.toFixed(2)}
      </span>
    </div>
  );

  const grandTotal = (
    <div className="total-pay">
      <p>{ReceiptTexts?.totalPay}</p>
      <span>${grandTotalPay || props?.data?.grandTotal}</span>
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
    <Modal
      centered
      isOpen={props?.isOpen}
      toggle={props?.toggle}
      className={
        props?.data?.paymentStatus !== PaymentMethods?.Invoice
          ? "Pay-and-get"
          : ""
      }
    >
      <ModalHeader toggle={props?.toggle}>{ReceiptTexts?.header}</ModalHeader>
      <ModalBody>
        {props?.data?.paymentStatus !== PaymentMethods?.Invoice && (
          <>
            <div
              className="slip"
              id={PAYMENT_RECEIPT}
              ref={pdfRef}
              onClick={downloadAsPDF}
            >
              <p>
                <span>{ReceiptTexts?.shiftPaymentDetails}</span> <br />
                {ReceiptTexts?.jobId} {props?.data?.serialNumber}
              </p>
              <div className="top-detail">
                <div className="amount-paid">
                  <p>{ReceiptTexts?.amountPaid}</p>
                  <span>${grandTotalPayString || props?.data?.grandTotal}</span>
                </div>
                <div className="amount-paid">
                  <p>{ReceiptTexts?.paymentMethod}</p>
                  <span>
                    <div className="card-img">
                      {CARD_SVG?.includes(
                        props?.data?.facilityPaymentCardBrand
                      ) ? (
                        <>
                          {props?.data?.facilityPaymentCardBrand === "amex" && (
                            <AmericanExpressIcon />
                          )}
                          {props?.data?.facilityPaymentCardBrand === "visa" && (
                            <VisaIcon />
                          )}
                          {props?.data?.facilityPaymentCardBrand ===
                            "mastercard" && <MastercardIcon />}
                          {props?.data?.facilityPaymentCardBrand ===
                            "discover" && <DiscoverIcon />}
                          {props?.data?.facilityPaymentCardBrand ===
                            "diners" && <DinersclubIcon />}
                          {props?.data?.facilityPaymentCardBrand ===
                            "unionpay" && <UnionPayIcon />}
                          {props?.data?.facilityPaymentCardBrand === "jcb" && (
                            <JCBIcon />
                          )}
                        </>
                      ) : (
                        <>{props?.data?.facilityPaymentCardBrand || ""}</>
                      )}
                    </div>
                    -{cardLastDigits(props?.data?.facilityPaymentCard)}
                  </span>
                </div>
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
              target={PAYMENT_RECEIPT}
              id="DownloadTip"
            >
              {ReceiptTexts?.downloadPDF}
            </UncontrolledTooltip>
          </>
        )}
        <div className="payment-method">
          {props?.data?.paymentStatus !== PaymentMethods?.Invoice && (
            <p>{ReceiptTexts?.otherReceipts}</p>
          )}
          <div className="select-card"></div>
          <div className="cards">
            {props?.data?.invoiceForFacility &&
              props.data?.invoiceForFacility?.map((e, i) => {
                return (
                  <a
                    className="pt-btn btn-primary pt-btn-small me-2"
                    href={e?.url}
                    rel={"noreferrer"}
                    target="_blank"
                  >
                    {e?.url?.startsWith(ReceiptTexts?.stripeReceiptUrl)
                      ? ReceiptTexts?.stripeReceipt
                      : `${ReceiptTexts?.otherReceipt} #${i + 1}`}
                  </a>
                );
              })}
          </div>
        </div>

        {props?.data?.paymentStatus !== PaymentMethods?.Invoice && (
          <div className="model-footer">
            <span>{ReceiptTexts?.noteText}</span>
            <p>{ReceiptTexts?.note}</p>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ReceiptModal;
