import FormButton from "component/common/FormButton";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function RequireNpiNumberModal({ modal, toggle, data }) {
  const [approveLoader, setApproveLoader] = useState(false);
  const navigate = useNavigate();
  const npiSectionRef = useRef(null);

  const handleAddNpi = () => {
    toggle();
    navigate("/clinician/settings#npi-section");
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => toggle()}
      className="applicant-modal"
    >
      <ModalHeader toggle={() => toggle()}>
        {`Important Notice: NPI Required`}
      </ModalHeader>
      <ModalBody>
        <p>
          To apply for shifts, you'll need a National Provider Identifier
          (NPI).  Having your NPI on file ensures compliance with healthcare
          regulations and allows you to seamlessly apply for shifts.
        </p>
        <p>Steps to obtain or add your NPI:</p>
        <div className="number npi-block">
          <ul className="m-0 mt-2 ms-2">
            <li className="text-highlight">
              <p className="m-0">Find your NPI:{" "}
                <a
                  className="text-decoration-none"
                  target={"_blank"}
                  rel={"noreferrer"}
                  href="https://npiregistry.cms.hhs.gov/search"
                >
                  Click here to find your NPI
                </a>
              </p>
            </li>
            <li>
              <p className="m-0">
              Obtain an NPI:{" "}
                <a
                  className="text-highlight"
                  target={"_blank"}
                  rel={"noreferrer"}
                  href="https://nppes.cms.hhs.gov/#/"
                >
                  https://nppes.cms.hhs.gov/
                </a>
              </p>
            </li>

            <li>
              <p className="m-0">
                Add your NPI: In your "Account Settings"
              </p>
            </li>
          </ul>
          <br />
          <p className="m-0">
                Questions?{" "}
                <a
                  className="text-highlight"
                  target={"_blank"}
                  rel={"noreferrer"}
                  href="https://docs.google.com/document/d/e/2PACX-1vSVOpAzJxg5TyQoKrdx18SQD2PR725raK5lHxWpYVeDecICS1mu7AxA8nPnJ6lmb26X_cHR-1aXwim_/pub"
                >
                  Check out our NPI Guide
                </a>
              </p>
              <br />
              <p>
              If you have any further questions or need assistance, please contact {" "}
              <Link
              className="text-highlight"
              target={"_blank"}
              rel={"noreferrer"}
              to={"https://purpleprn.com/contactus"}
              >
               our support team.
              </Link>
              </p>
        </div>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => toggle()}
          >
            Cancel
          </button>
          <FormButton
            loader={approveLoader}
            label={`Add NPI`}
            className="pt-btn btn-primary pt-btn-small"
            onClick={handleAddNpi}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
