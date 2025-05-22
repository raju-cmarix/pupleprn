import React, { useState, useEffect } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import FormButton from "component/common/FormButton";
import { useForm } from "react-hook-form";
import { api } from "api/Api";
import { UPDATE_FACILITY_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import "component/editJobPosting/editjobposting.scss";
import FormInput from "component/common/FormInput";

export default function EditEmailModal({ modal, toggle, callbackFn, data }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (modal) reset({ email: data.userId.email });
  }, [modal]);
  const onSubmit = (formData) => {
    setLoader(true);
    api(UPDATE_FACILITY_URL, {
      ...formData,
      id: data.id,
      userId: data.userId.id,
    }).then((res) => {
      if (res.status === RESPONSE_OK) callbackFn();
      setLoader(false);
    });
  };

  const [loader, setLoader] = useState(false);

  return (
    <Modal centered isOpen={modal} toggle={toggle} className="editJobDes-modal">
      <ModalHeader toggle={toggle}>Edit Email Address</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name={"email"}
            id={"email"}
            type="text"
            label="Email Address:"
            register={register}
            rules={{}}
            defaultValue={data.userId}
            errors={errors}
            control={control}
          />
          <div className="text-center mt-4">
            <FormButton
              loader={loader}
              className={"pt-btn-small pt-btn btn-primary"}
              type="submit"
              label={"Save"}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
