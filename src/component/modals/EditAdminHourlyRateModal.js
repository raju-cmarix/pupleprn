import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Form, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { api } from 'api/Api';
import { ADMIN_HOURLY_RATE } from 'constants/ApiUrls';
import { RESPONSE_OK } from 'constants/AppConstants';
import FormInput from 'component/common/FormInput';
import { HourlyRateRules } from 'constants/Rules';
import FormButton from 'component/common/FormButton';

export default function EditAdminHourlyRateModal({
  modal,
  toggle,
  data,
  getList,
  jobId
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    reset({ ...data });
  }, [data]);

  useEffect(() => {
    if (data?.adminHourlyRate) {
      reset({ ...data });
    } else {
      reset({
        adminHourlyRate: data?.hourlyRate,
      });
    }
  }, [modal]);

  const onSubmit = (formData) => {
    if (!isNaN(formData.adminHourlyRate)) {
      const reqData = {
        id: jobId,
        adminHourlyRate: Number(formData.adminHourlyRate),
      };
      setLoader(true);
      api(ADMIN_HOURLY_RATE, reqData).then((res) => {
        if (res.status === RESPONSE_OK) {
          setError('');
          getList(false); //fetch data without showing loader
          toggle();
        }
        setLoader(false);
      });
    } else {
      setError('Only Numbers are supported');
    }
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="edittimework-modal">
      <ModalHeader toggle={toggle}>Edit Hourly Rate</ModalHeader>
      <ModalBody>
        {error && <p style={{ color: '#ff3333', fontSize: '12px' }}>{error}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="model-input total-amount">
            <FormInput
              name="adminHourlyRate"
              id="adminHourlyRate"
              label="$"
              type="number"
              placeholder=""
              defaultValue={data?.adminHourlyRate || data?.hourlyRate}
              autoFocus={false}
              register={register}
              rules={HourlyRateRules}
              errors={errors}
              decimal={true}
            />
          </div>

          <div className="editworkmodal-btn text-center">
            <FormButton
              className={'btn-primary pt-btn'}
              label="Save"
              loader={loader}
              type={'submit'}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
