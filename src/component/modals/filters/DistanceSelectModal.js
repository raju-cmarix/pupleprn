// import { useEffect, useState } from "react";
// import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";

// export default function DistanceSelectModal({
//   modal,
//   toggle,
//   handleApply,
//   currentValue,
// }) {
//   const [val, setVal] = useState();
//   const options = [
//     {
//       label: "within 5 mi",
//       value: "5",
//     },
//     {
//       label: "within 30 mi",
//       value: "30",
//     },
//     {
//       label: "within 10 mi",
//       value: "10",
//     },
//     {
//       label: "within 40 mi",
//       value: "40",
//     },
//     {
//       label: "within 15 mi",
//       value: "15",
//     },
//     {
//       label: "within 60 mi",
//       value: "60",
//     },
//     {
//       label: "within 20 mi",
//       value: "20",
//     },
//   ];
//   useEffect(() => {
//     if (currentValue) {
//       setVal(currentValue);
//     }
//   }, [currentValue, modal]);
//   const toggleModal = () => {
//     setVal();
//     toggle();
//   };
//   return (
//     <Modal
//       centered
//       isOpen={modal}
//       toggle={toggleModal}
//       className="distance-modal"
//     >
//       <ModalHeader toggle={toggleModal}>Distance from home</ModalHeader>
//       <ModalBody>
//         <div className="distancePT">
//           {options.map((option) => {
//             return (
//               <div className="pt-radio" key={option.value}>
//                 <Input
//                   type="radio"
//                   name="distancePT"
//                   id={"a" + option.value}
//                   value={option.value}
//                   checked={val === option.value}
//                   onChange={(ev) => setVal(ev.target.value)}
//                 />
//                 <label htmlFor={"a" + option.value}>{option.label}</label>
//               </div>
//             );
//           })}
//         </div>
//         <div className="distancemodal-btn">
//           <button
//             className="btn-secondary pt-btn"
//             onClick={() => {
//               handleApply();
//               setVal();
//             }}
//           >
//             Clear
//           </button>
//           <button
//             className="btn-primary pt-btn"
//             onClick={() => handleApply(val)}
//           >
//             Apply
//           </button>
//         </div>
//       </ModalBody>
//     </Modal>
//   );
// }

import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input/dist/components/RangeSlider";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function DistanceSelectModal({
  modal,
  toggle,
  handleApply,
  currentValue,
  leftSideDisabled,
  rightSideDisabled,
}) {
  const [vals, setVals] = useState([0, 45]);

  useEffect(() => {
    if (currentValue && modal) {
      setVals([Number(0), (Number(currentValue) || 45)]);
    }
  }, [currentValue, modal]);
  const toggleModal = () => {
    setVals([0, 45]);
    toggle();
  };

  return (
    <Modal
      centered
      isOpen={modal}
      className="distance-modal"
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal}>Distance from home</ModalHeader>
      <ModalBody>
        <p>
          From {vals[0]} to {vals[1]} miles
        </p>

        <RangeSlider
          onInput={(val) => setVals(val)}
          value={vals}
          className="single-thumb distance-range-slider"
          thumbsDisabled={[true, leftSideDisabled]}
          rangeSlideDisabled={true}
          max={100}
          min={0}
        />
        <div className="distancemodal-btn">
          <button
            className="btn-secondary pt-btn"
            onClick={() => {
              handleApply([0, 45]);
              setVals([0, 45]);
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

