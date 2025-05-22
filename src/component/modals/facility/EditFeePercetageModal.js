import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { api } from "api/Api";
import { UPDATE_FACILITY_URL } from "constants/ApiUrls";
import FormInput from "component/common/FormInput";
import { FacilityFeePercentageRules } from "constants/Rules";
import FormButton from "component/common/FormButton";

export default function EditFeePercetageModal({
  modal,
  toggle,
  data,
  getData,
}) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    reset({ feePercentage: data?.facilityId?.facilityFeePercentage });
  }, [data]);

  const onSubmit = async () => {
    const res = await trigger();
    if (!res) {
      return;
    }
    setLoader(true);
    const values = getValues();
    const payload = {
      id: data?.facilityId?.id,
      userId: data?.id,
      feePercentage: Number(values?.feePercentage),
    };
    api(UPDATE_FACILITY_URL, payload)
      .then(() => {
        getData(false);
        toggle();
      })
      .catch((err) => {
        console.error("Facility fee percentage error: ", err);
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
      <ModalHeader toggle={toggle}>Edit Fee Percentage</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="model-input total-amount">
            <FormInput
              name="feePercentage"
              id="feePercentage"
              type="number"
              placeholder="Enter fee percentage"
              autoFocus={true}
              register={register}
              rules={FacilityFeePercentageRules}
              errors={errors}
              decimal={true}
            />
          </div>
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
