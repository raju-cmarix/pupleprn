import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import FormButton from 'component/common/FormButton';
import { useForm } from 'react-hook-form';

export default function DeleteLocationModal({
  modal,
  toggle,
  callbackFn,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);
  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => toggle()}
      className="applicant-modal">
      <ModalHeader toggle={() => toggle()}>
        {`Delete Metro Area Location`}
      </ModalHeader>
      <ModalBody>
        <p className="font-12 mb-24 d-block text-center">
          Are you sure you want to delete this location ?
        </p>
        <div className="modal-footer">
          <button
            className="pt-btn btn-gray pt-btn-small"
            onClick={() => toggle()}>
            Cancel
          </button>
          <FormButton
            label={`Delete`}
            className="pt-btn btn-primary pt-btn-small"
            onClick={callbackFn}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
