import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { api } from "api/Api";
import { MASS_UPDATE_JOB_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { HourlyRateRules } from "constants/Rules";
import FormButton from "component/common/FormButton";
import { HourlyConstants } from "views/authentication/signUpClinician/HourlyConstant";
import FormSelect from "component/common/FormSelect";

export default function FacilityMassHourlyRateUpdateModal({
  modal,
  toggle,
  jobIds,
  setList,
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    reset();
  }, [modal]);

  const onSubmit = (data) => {
    setLoader(true);
    api(MASS_UPDATE_JOB_URL, { hourlyRate: Number(data.hourlyRate), jobIds })
      .then((res) => {
        if (res.status === RESPONSE_OK) {
          // Optimistic Update
          setList((list) =>
            list.map((job) => {
              if (jobIds.includes(job.id)) {
                return { ...job, hourlyRate: data.hourlyRate };
              }
              return job;
            }),
          );
          toggle();
        }
      })
      .catch((err) => {
        console.error("Hourly rate updation Error: ", err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="edittimework-modal">
      <ModalHeader toggle={toggle}>Edit Hourly Rate</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormSelect
            divClassName={"pay-select"}
            name={"hourlyRate"}
            id={"hourlyRate"}
            label="Hourly rate:"
            register={register}
            rules={HourlyRateRules}
            options={HourlyConstants}
            errors={errors}
            placeholder="Select"
            control={control}
            optionValue="value"
            optionLabel="label"
            trigger={trigger}
          />

          <div className="editworkmodal-btn text-center">
            <FormButton
              className={"btn-primary pt-btn"}
              label="Save"
              loader={loader}
              type={"submit"}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
