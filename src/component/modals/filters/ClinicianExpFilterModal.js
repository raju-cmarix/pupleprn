import { useEffect, useState } from "react";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";

export default function ClinicianExpFilterModal({
  modal,
  toggle,
  handleApply,
  currentValue,
}) {
  const options = [
    {
      label: "1+ year",
      value: "1",
    },
    {
      label: "2+ year",
      value: "2",
    },
    {
      label: "5+ year",
      value: "5",
    },
    {
      label: "10+ year",
      value: "10",
    },
  ];
  const [val, setVal] = useState();
  useEffect(() => {
    if (currentValue) {
      setVal(currentValue);
    }
  }, [currentValue, modal]);
  const toggleModal = () => {
    setVal();
    toggle();
  };
  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggleModal}
      className="experience-modal"
    >
      <ModalHeader toggle={toggleModal}>Minimum experience</ModalHeader>
      <ModalBody>
        <div className="experiencePT">
          {options.map((option) => {
            return (
              <div className="pt-radio" key={option.value}>
                <Input
                  type="radio"
                  name="minimumExperience"
                  id={"a" + option.value}
                  value={option.value}
                  checked={val === option.value}
                  onChange={(ev) => setVal(ev.target.value)}
                />
                <label htmlFor={"a" + option.value}>{option.label}</label>
              </div>
            );
          })}
        </div>
        <div className="experiencemodal-btn">
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
