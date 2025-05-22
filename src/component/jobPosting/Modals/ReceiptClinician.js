import { ReceiptTexts, PaymentMethods } from "constants/AppConstants";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ReceiptClinicianModal = (props) => {
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
        <div className="payment-method">
          {props?.data?.paymentStatus !== PaymentMethods?.Invoice && (
            <p>{ReceiptTexts?.otherReceipts}</p>
          )}
          <div className="select-card"></div>
          <div className="cards">
            {props?.data?.invoiceForClinician &&
              props.data?.invoiceForClinician?.map((e, i) => {
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
      </ModalBody>
    </Modal>
  );
};

export default ReceiptClinicianModal;
