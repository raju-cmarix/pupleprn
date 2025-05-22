import FormButton from "component/common/FormButton";
import { useState, useEffect } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { HourlyConstants } from "views/authentication/signUpClinician/HourlyConstant";
import { useForm } from "react-hook-form";
import { api } from "api/Api";
import { UPDATE_JOB_URL } from "constants/ApiUrls";
import { RESPONSE_OK, TOTAL_HOURS } from "constants/AppConstants";
import FormSelect from "component/common/FormSelect";
import { timeZone } from "utils/Utils";

export default function EditPayModal({ modal, toggle, callbackFn, data }) {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (modal) reset({ ...data, hourlyRate: String(data.hourlyRate), facilityId: data.facilityId.id });
  }, [modal]);

  const onSubmit = (formData) => {
    const jobSlots = data.jobSlots?.map((slot) => {
      return {
        ...slot,
        startDate: new Date(slot?.startDate),
        endDate: new Date(slot?.endDate),
      };
    });

    let [totalHours, totalHoursFull] = TOTAL_HOURS(jobSlots, false, false);

    let totalPay = String(totalHoursFull * parseInt(formData?.hourlyRate));

    setLoader(true);
    api(UPDATE_JOB_URL, {
      ...formData,
      totalPay,
    }).then((res) => {
      if (res.status === RESPONSE_OK) callbackFn();
      setLoader(false);
    });
  };

  const [loader, setLoader] = useState(false);
  return (
    <Modal centered isOpen={modal} toggle={toggle} className="editPay-modal">
      <ModalHeader toggle={toggle}>Edit Pay</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormSelect
            divClassName={"pay-select"}
            name={"hourlyRate"}
            id={"hourlyRate"}
            label="Hourly rate:"
            register={register}
            rules={{}}
            options={HourlyConstants}
            errors={errors}
            placeholder="Select"
            control={control}
            optionValue="value"
            optionLabel="label"
            trigger={trigger}
          />
          <div className="text-center">
            <FormButton
              loader={loader}
              className={"pt-btn-small pt-btn btn-primary editpay-btn"}
              type="submit"
              label={"Save"}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
