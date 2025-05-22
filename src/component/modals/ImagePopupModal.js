import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function ImagePopupModal({ modal, toggle, src }) {
  return (
    <Modal centered isOpen={modal} className="receipt-modal" toggle={toggle}>
       <ModalHeader toggle={toggle}>
        </ModalHeader>
      <ModalBody>
        <div className="text-center">
          <img src={src} alt="" className="img-fluid" />
        </div>
      </ModalBody>
    </Modal>
  );
}
