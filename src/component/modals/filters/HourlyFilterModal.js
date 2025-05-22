import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input/dist/components/RangeSlider";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function HourlyFilterModal({
  modal,
  toggle,
  handleApply,
  currentValue,
  leftSideDisabled,
}) {
  const [vals, setVals] = useState([0, 200]);
  useEffect(() => {
    if (currentValue && modal) {
      setVals([Number(currentValue || 0), 200]);
    }
  }, [currentValue, modal]);
  const toggleModal = () => {
    setVals([0, 200]);
    toggle();
  };

  return (
    <Modal
      centered
      isOpen={modal}
      className="hourly-modal"
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal}>Hourly rate</ModalHeader>
      <ModalBody>
        <p>
          From ${vals[0]} to ${vals[1]} per hour
        </p>

        <RangeSlider
          onInput={(val) => setVals(val)}
          value={vals}
          className="single-thumb price-range-slider"
          thumbsDisabled={[false, leftSideDisabled]}
          rangeSlideDisabled={true}
          max={200}
          min={0}
        />
        <div className="hourlymodal-btn">
          <button
            className="btn-secondary pt-btn"
            onClick={() => {
              handleApply([0, 200]);
              setVals([0, 200]);
            }}
          >
            Clear
          </button>
          <button
            className="btn-primary pt-btn"
            onClick={() => handleApply(vals)}
          >
            Apply
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
