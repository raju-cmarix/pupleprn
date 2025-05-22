import React, { useState, useEffect } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import FormButton from "component/common/FormButton";
import { state } from "views/authentication/signUpClinician/HourlyConstant";
import { useForm } from "react-hook-form";
import { api } from "api/Api";
import { ADMIN_EDIT_JOB_POST_DETAILS_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import FormSelect from "component/common/FormSelect";
import FormInput from "component/common/FormInput";
import { getLatLng, getTimeZone, timeZone } from "utils/Utils";
import { AddressRules, CityRules } from "constants/Rules";

export default function EditLocationModalForAdmin({
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
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (modal) reset({ ...data, facilityId: data.facilityId.id });
  }, [modal, data, reset]);

  const onSubmit = async (formData) => {
    setLoader(true);

    // Find the job location's lat long and timezone
    const address = `${formData.jobAddress1 || ""} ${
      formData.jobAddress2 || ""
    }  ${formData.city || ""} ${formData.state || ""} ${
      formData.zipCode || ""
    }`;
    const latLongRes = await getLatLng(address);

    if (latLongRes.status === "OK") {
      const lat = latLongRes?.results[0]?.geometry?.location?.lat;
      const long = latLongRes?.results[0]?.geometry?.location?.lng;

      const timezoneId = await getTimeZone(lat, long);
      formData.lat = lat;
      formData.long = long;
      formData.timeZone = timezoneId;
    }

    // Update job
    api(ADMIN_EDIT_JOB_POST_DETAILS_URL, formData).then((res) => {
      if (res.status === RESPONSE_OK) callbackFn();
      setLoader(false);
    });
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="editLocation-modal">
      <ModalHeader toggle={toggle}>Edit Location</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            divClassName="form-group"
            name={"jobAddress1"}
            id={"jobAddress1"}
            label="Address Line1:"
            register={register}
            type={"text"}
            rules={AddressRules}
            defaultValue={data.jobAddress1}
            errors={errors}
            control={control}
          />
          <FormInput
            divClassName="form-group"
            name={"jobAddress2"}
            id={"jobAddress2"}
            label="Address Line2:"
            register={register}
            type={"text"}
            rules={{}}
            options={{}}
            defaultValue={data.jobAddress2}
            errors={errors}
            control={control}
          />
          <FormInput
            divClassName="form-group"
            name={"city"}
            id={"city"}
            label="City:"
            register={register}
            type={"text"}
            rules={CityRules}
            defaultValue={data.city}
            errors={errors}
            control={control}
          />
          <FormSelect
            divClassName={"state-select"}
            name={"state"}
            id={"state"}
            label="State:"
            register={register}
            rules={{}}
            options={state}
            defaultValue={data.state}
            errors={errors}
            // placeholder="Select"
            control={control}
            optionValue="value"
            optionLabel="label"
          />
          <FormInput
            divClassName="form-group"
            name={"zipCode"}
            id={"zipCode"}
            label="ZipCode:"
            register={register}
            type={"text"}
            rules={{}}
            options={{}}
            defaultValue={data.zipCode}
            errors={errors}
            control={control}
          />
          <div className="text-center">
            <FormButton
              loader={loader}
              className={"pt-btn-small pt-btn btn-primary editexp-btn"}
              type="submit"
              label={"Save"}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
