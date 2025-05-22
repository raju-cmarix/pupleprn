import React, { useState, useEffect } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import FormButton from "component/common/FormButton";
import { useForm } from "react-hook-form";
import { api } from "api/Api";
import { UPDATE_JOB_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import FormQuill from "component/common/FormQuill";
import { jobDescriptionRules } from "constants/Rules";

export default function EditJobDescriptionModal({
  modal,
  toggle,
  callbackFn,
  data,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (modal) reset({ ...data, facilityId: data.facilityId.id });
  }, [modal]);
  const onSubmit = (formData) => {
    setLoader(true);
    api(UPDATE_JOB_URL, formData).then((res) => {
      if (res.status === RESPONSE_OK) callbackFn();
      setLoader(false);
      toggle();
    });
  };

  const [loader, setLoader] = useState(false);
  const jobDescription = data?.jobDescription;
  const customModules = {
    toolbar: false,
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="editJobDes-modal">
      <ModalHeader toggle={toggle}>Edit Shift Description</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormQuill
            label="Shift Description:"
            name="jobDescription"
            control={control}
            register={register}
            trigger={trigger}
            rules={jobDescriptionRules}
            customModules={{
              toolbar: false,
            }}
            errors={errors}
            height="200px"
          />
          <div className="text-center">
            <FormButton
              loader={loader}
              className={"pt-btn-small pt-btn btn-primary mt-3"}
              type="submit"
              label={"Save"}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
