import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { TERMS_AND_CONDITION_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useRef, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useReactToPrint } from "react-to-print";
import "react-quill/dist/quill.core.css";

export default function TermAndConditionsModal({ modal, toggle, data }) {
  const [approveLoader, setApproveLoader] = useState(false);
  const [printLoader, setPrintLoader] = useState(false);
  const note = data?.termAndConditions;
  const contentToPrint = useRef(null);

  const handleApprove = () => {
    setApproveLoader(true);
    api(TERMS_AND_CONDITION_URL, {
      userId: data?.id,
      isTermAccept: true,
    }).then((res) => {
      if (res.status === RESPONSE_OK) setApproveLoader(false);
      toggle();
    });
  };

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    bodyClass: "ql-editor",
    documentTitle: "Terms & Conditions",
    removeAfterPrint: true,
  });

  return (
    <Modal centered isOpen={modal} className="agreement-modal">
      <ModalHeader>
        <h5 style={{ color: "#382768" }}>Terms & Conditions</h5>
        <span style={{ color: "#382768", fontWeight: "500", fontSize: "15px" }}>
          Please scroll down to accept
        </span>
      </ModalHeader>

      <ModalBody className="ql-editor">
        <div ref={contentToPrint} dangerouslySetInnerHTML={{ __html: note ? note : "NA" }}></div>
      </ModalBody>
      <ModalFooter>
        <div className="modal-footer">
          <FormButton
            loader={approveLoader}
            label={"Accept"}
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => handleApprove()}
          />
          <FormButton
            loader={printLoader}
            label={"Print"}
            className="pt-btn btn-secondary pt-btn-small"
            onClick={() => handlePrint()}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
}
