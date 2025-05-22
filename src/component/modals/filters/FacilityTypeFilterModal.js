import { useEffect, useState } from "react";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";

export default function FacilityTypeFilterModal({
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
      className="clinician-modal">
      <ModalHeader toggle={toggleModal}>Facility type</ModalHeader>
      <ModalBody>
        <div className="Facility">
          <div className="pt-radio">
            <Input
              type="radio"
              name="facilityType"
              value={"Inpatient"}
              checked={val === "Inpatient"}
              id="Inpatient"
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="Inpatient">Inpatient</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "LTACH"}
              type="radio"
              name="facilityType"
              id="LTACH"
              value={"LTACH"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="LTACH">LTACH</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "Outpatient"}
              type="radio"
              name="facilityType"
              id="Outpatient"
              value={"Outpatient"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="Outpatient">Outpatient</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "other"}
              type="radio"
              name="other"
              id="other"
              value={"other"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="other">Other</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "Home Health"}
              type="radio"
              name="facilityType"
              id="Home Health"
              value={"Home Health"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="Home Health">Home Health</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "Pediatrics"}
              type="radio"
              name="facilityType"
              id="Pediatrics"
              value={"Pediatrics"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="Pediatrics">Pediatrics</label>
          </div>
          <div className="pt-radio">
            <Input
              checked={val === "SNF"}
              type="radio"
              name="facilityType"
              id="SNF"
              value={"SNF"}
              onChange={(ev) => setVal(ev.target.value)}
            />
            <label htmlFor="SNF">SNF</label>
          </div>
        </div>
        <div className="clinicianmodal-btn">
          <button
            className="btn-secondary pt-btn"
            onClick={() => {
              handleApply();
              setVal();
            }}>
            Clear
          </button>
          <button
            className="btn-primary pt-btn"
            onClick={() => handleApply(val)}>
            Apply
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
