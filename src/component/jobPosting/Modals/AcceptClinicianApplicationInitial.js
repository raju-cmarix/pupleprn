import FormButton from "component/common/FormButton";
import { AcceptClinicianApplicationInitialMessage } from "constants/AppConstants";
import React, { useEffect, useState } from "react";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";

const AcceptClinicianApplicationInitial = (props) => {
  const [doAccept, setDoAccept] = useState(0);
  
  const toggleModal = () => {
    props?.toggle();
    setDoAccept(0);
  };
  const CursorStyle = (id) => {
    return {
      cursor: doAccept !== id ? "pointer" : "default",
    };
  };
  useEffect(() => {
    setDoAccept(0);
  }, [props?.trigger]);

  return (
    <Modal
      centered
      isOpen={props?.isOpen}
      toggle={toggleModal}
      {...props?.args}
      className="stripe-connect"
    >
      <ModalHeader toggle={toggleModal}>
        {AcceptClinicianApplicationInitialMessage?.header}
      </ModalHeader>
      <ModalBody>
        <div className="confirm-shift">
          <div className="pt-radio mb-2" onClick={() => setDoAccept(2)}>
            <Input
              type="radio"
              className="form-check-input"
              name="Cardnumber"
              id={`Cardnumber_1`}
              checked={doAccept === 2}
              style={CursorStyle(2)}
            />
            <label for="Cardnumber_1" style={CursorStyle(2)}>
              {AcceptClinicianApplicationInitialMessage?.optionOne}
            </label>
          </div>

          <div className="pt-radio mb-2" onClick={() => setDoAccept(4)}>
            <Input
              type="radio"
              className="form-check-input"
              name="Cardnumber"
              id={`Cardnumber_3`}
              checked={doAccept === 4}
              style={CursorStyle(4)}
            />
            <label for="Cardnumber_3" style={CursorStyle(4)}>
              {AcceptClinicianApplicationInitialMessage?.optionThree}
            </label>
          </div>

          <div className="pt-radio" onClick={() => setDoAccept(3)}>
            <Input
              type="radio"
              className="form-check-input"
              name="Cardnumber"
              id={`Cardnumber_2`}
              checked={doAccept === 3}
              style={CursorStyle(3)}
            />
            <label for="Cardnumber_2" style={CursorStyle(3)}>
              {AcceptClinicianApplicationInitialMessage?.optionTwo}
            </label>
          </div>
        </div>

        <div className="model-footer">
          <FormButton
            className="pt-btn-small pt-btn btn-primary"
            label="Close"
            type="button"
            onClick={toggleModal}
          />
       
          
      
            <FormButton
              className="pt-btn-small pt-btn btn-secondary"
              disabled={doAccept === 0}
              label={doAccept === 2 ? props.cardsCount > 0 ? "Proceed" : "Add card details" : "Proceed"}
              type="button"
              onClick={() =>
                doAccept === 2
                  ? props?.cardsCount > 0
                    ? props?.setAccept(doAccept)
                    : props?.navigateToPaymentTab()
                  : props?.setAccept(doAccept)
              }
            />
      
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AcceptClinicianApplicationInitial;
