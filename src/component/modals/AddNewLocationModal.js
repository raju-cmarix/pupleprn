import React, { useState, useEffect } from 'react';
import { Form, Modal, ModalBody, ModalHeader } from 'reactstrap';
import FormButton from 'component/common/FormButton';
import {
  clinician,
  HourlyConstants,
  PercentageContstants,
  RadiusConstants,
} from 'views/authentication/signUpClinician/HourlyConstant';
import { useForm } from 'react-hook-form';
import { api } from 'api/Api';
import { ADD_MEDIAN_RATES } from 'constants/ApiUrls';
import { RESPONSE_OK } from 'constants/AppConstants';
import FormSelect from 'component/common/FormSelect';
import FormInput from 'component/common/FormInput';
import {
  ClinicianTypeRules,
  fillPercentageRules,
  HourlyRateRules,
  metroAreaNameRules,
  radiusRules,
  ZipCodeRules,
} from 'constants/Rules';

export default function AddNewLocationModal({
  modal,
  toggle,
  callbackFn,
}) {
  const {
    register,
    trigger,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);

  const onSubmit = (formData) => {
    setLoader(true);
    api(ADD_MEDIAN_RATES, {
      ...formData,
      isActive: true,
    }).then((res) => {
      if (res.status === RESPONSE_OK) callbackFn();
      setLoader(false);
    });
  };

  useEffect(() => {
    if (modal) {
      reset({
        metroAreaName: '',
        rate: '',
        fillPercentage: '',
        clinicianType: '',
        radius: '',
        zipcode: '',
      });
    }
  }, [modal, reset]);

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="addLocation-modal">
      <ModalHeader toggle={toggle}>Add New Metro Area Location</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column mb-2">
            <FormInput
              name={'metroAreaName'}
              id={'metroAreaName'}
              label="Area Name:"
              register={register}
              defaultValue={{}}
              rules={metroAreaNameRules}
              options={{}}
              errors={errors}
              control={control}
            />
            <FormSelect
              options={HourlyConstants}
              placeholder="Select"
              control={control}
              name={'rate'}
              id={`rate`}
              errors={errors}
              optionValue="value"
              optionLabel="label"
              rules={HourlyRateRules}
              label="Rate:"
              divClassName={'form-group'}
            />
            <FormSelect
              options={PercentageContstants}
              placeholder="Select"
              control={control}
              name={`fillPercentage`}
              id={`fillPercentage`}
              errors={errors}
              optionValue="value"
              optionLabel="label"
              rules={fillPercentageRules}
              divClassName={'form-group'}
              label="Fill Percentage"
            />
            <FormSelect
              name={'clinicianType'}
              id={'clinicianType'}
              rules={ClinicianTypeRules}
              options={clinician}
              errors={errors}
              placeholder="Select"
              control={control}
              optionValue="value"
              optionLabel="label"
              label="Clinician Type"
            />
            <FormInput
              name={'zipcode'}
              id={'zipcode'}
              type={'number'}
              label="Zipcode:"
              register={register}
              defaultValue={{}}
              rules={ZipCodeRules}
              options={{}}
              errors={errors}
              control={control}
            />
            <FormSelect
              name={'radius'}
              id={'radius'}
              rules={radiusRules}
              options={RadiusConstants}
              errors={errors}
              placeholder="Select"
              control={control}
              optionValue="value"
              optionLabel="label"
              label="Radius: "
            />
          </div>
          <div className="text-center">
            <FormButton
              loader={loader}
              className={'pt-btn-small pt-btn btn-primary editexp-btn'}
              type="submit"
              label={'Save'}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
