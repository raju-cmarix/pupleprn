import { useEffect, useState } from "react";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";

export default function ClinicianTypeFilterModal({
  modal,
  toggle,
  handleApply,
  currentValue,
}) {
  const [val, setVal] = useState();
  const toggleModal = () => {
    setVal();
    toggle();
  };
  useEffect(() => {
    if (currentValue) {
      setVal(currentValue);
    }
  }, [currentValue, modal]);

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggleModal}
      className="clinician-modal"
    >
      <ModalHeader toggle={toggleModal}>Clinician type</ModalHeader>
      <ModalBody>
        <div className="clinicianPT">
          <div className="pt-radio">
            <Input
              checked={val === "pt"}
              type="radio"
              name="clinicianType"
              id="PT"
              value={"pt"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="PT">PT</label>
          </div>
          <div className="pt-radio">
            <Input
              type="radio"
              name="clinicianType"
              value={"pta"}
              checked={val === "pta"}
              id="PTA"
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="PTA">PTA</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "ot"}
              type="radio"
              name="clinicianType"
              id="ot"
              value={"ot"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="ot">OT</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "ota"}
              type="radio"
              name="clinicianType"
              id="ota"
              value={"ota"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="ota">OTA</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "slp"}
              type="radio"
              name="clinicianType"
              id="slp"
              value={"slp"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="slp">SLP</label>
          </div>
          {/* <div className="pt-radio">
            <Input
              checked={val === "cota"}
              type="radio"
              name="clinicianType"
              id="cota"
              value={"cota"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="cota">COTA</label>
          </div> */}
        </div>
        <div className="clinicianmodal-btn">
          <button
            className="btn-secondary pt-btn"
            onClick={() => {
              handleApply();
              setVal();
            }}
          >
            Clear
          </button>
          <button
            className="btn-primary pt-btn"
            onClick={() => handleApply(val)}
          >
            Apply
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
