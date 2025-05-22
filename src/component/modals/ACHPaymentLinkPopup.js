import { ACHPaymentLinkPopupTexts } from "constants/AppConstants";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ACHPaymentLinkPopup = ({ isOpen, toggle }, args) => {
  const toggleModal = () => toggle();
  return (
    <Modal
      centered
      isOpen={isOpen}
      toggle={toggleModal}
      {...args}
      className="stripe-connect achpaymentlinkpopup"
    >
      <ModalHeader toggle={toggleModal}>
        {ACHPaymentLinkPopupTexts?.title}
      </ModalHeader>
      <ModalBody>
        <p>{ACHPaymentLinkPopupTexts?.text}</p>
        <div className="model-footer">
          <a href={isOpen} style={{ textDecoration: "none" }}>
            <button className="pt-btn-small pt-btn btn-primary">
              {ACHPaymentLinkPopupTexts?.ok}
            </button>
          </a>

          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={toggleModal}
          >
            Cancel
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ACHPaymentLinkPopup;
