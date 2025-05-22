import React, { useState, useEffect } from 'react';
import { Form, Modal, ModalBody, ModalHeader } from 'reactstrap';
import FormButton from 'component/common/FormButton';
import { experience } from "views/authentication/signUpClinician/HourlyConstant";
import { useForm } from 'react-hook-form';
import { api } from 'api/Api';
import { ADMIN_EDIT_JOB_POST_DETAILS_URL } from 'constants/ApiUrls';
import { RESPONSE_OK } from 'constants/AppConstants';
import FormSelect from 'component/common/FormSelect';
import { timeZone } from 'utils/Utils';

export default function EditMinimumExperienceModalForAdmin({ modal, toggle, callbackFn, data }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (modal) reset({ ...data, facilityId: data.facilityId.id  });
  }, [modal]);
  const onSubmit = (formData) => {
    setLoader(true);
    api(ADMIN_EDIT_JOB_POST_DETAILS_URL, formData).then((res) => {
      if (res.status === RESPONSE_OK) callbackFn();
      setLoader(false);
    });
  };

  const [loader, setLoader] = useState(false);

  return (
    <Modal centered isOpen={modal} toggle={toggle} className="editexp-modal">
      <ModalHeader toggle={toggle}>Edit Minimum Experience</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormSelect
            divClassName={'experience-select'}
            name={'minimumExperince'}
            id={'minimumExperince'}
            label="Minimum Years of Clinician Experience:"
            register={register}
            rules={{}}
            options={experience}
            defaultValue={data.minimumExperince} 
            errors={errors}
            // placeholder="Select"
            control={control}
            optionValue="value"
            optionLabel="label"
          />
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
};