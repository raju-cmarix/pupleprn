import FormButton from "component/common/FormButton";
import {
  AcceptClinicianApplicationWInvoiceMessage,
  PaymentMethods,
} from "constants/AppConstants";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const AcceptClinicianApplicationWInvoice = (props) => {
  const toggleModal = () => {
    props?.toggle();
  };

  return (
    <Modal
      centered
      isOpen={props?.isOpen}
      toggle={toggleModal}
      {...props?.args}
      className="stripe-connect">
      <ModalHeader toggle={toggleModal}>
        {AcceptClinicianApplicationWInvoiceMessage?.header}
      </ModalHeader>
      <ModalBody>
        <p onClick={() => props?.setAccept(2)}>
          {AcceptClinicianApplicationWInvoiceMessage?.text}
        </p>
        <div className="model-footer">
          <FormButton
            className="pt-btn-small pt-btn btn-primary"
            type="button"
            onClick={toggleModal}
            label={"Close"}
          />
          <FormButton
            className="pt-btn-small pt-btn btn-primary"
            loader={props?.loader}
            // disabled
            label="Confirm"
            type="button"
            onClick={() =>
              props?.handleApplication({
                paymentMethod: PaymentMethods?.Invoice,
              })
            }
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AcceptClinicianApplicationWInvoice;
