import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { api } from "api/Api";
import { ADMIN_EDIT_JOB_POST_DETAILS_URL } from "constants/ApiUrls";
import { RESPONSE_OK, TOTAL_HOURS } from "constants/AppConstants";
import FormInput from "component/common/FormInput";
import { HourlyRateRules } from "constants/Rules";
import FormButton from "component/common/FormButton";
import UserContext from "utils/context/UserContext";

export default function EditHourlyRateModal({ modal, toggle, data, getList }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    reset({ ...data });
  }, [data]);

  const calculateTotalPayForJob = (jobSlots, hourlyRate) => {
    if (!hourlyRate) return;
    const jobSlotsUp = jobSlots?.map((e) => {
      return {
        ...e,
        startDate: new Date(e?.startDate),
        endDate: new Date(e?.endDate),
      };
    });

    let [totalHours, totalHoursFull] = TOTAL_HOURS(jobSlotsUp);

    let totalPay = totalHoursFull * parseInt(hourlyRate);

    return totalPay;
  };

  const onSubmit = (data) => {
    data.totalPay = String(
      calculateTotalPayForJob(data.jobSlots, data.hourlyRate),
    );
    if (!isNaN(data.hourlyRate)) {
      const reqData = {
        id: data.id,
        hourlyRate: data.hourlyRate,
        facilityId: data.facilityId,
        facilityType: data.facilityType,
        clinicianType: data.clinicianType,
        jobAddress1: data.jobAddress1,
        state: data.state,
        zipCode: data.zipCode,
        totalPay: data.totalPay,
        jobSlots: data.jobSlots,
        jobDescription: data.jobDescription,
        // adminHourlyRate: data.hourlyRate,
        // totalWorkedHours: data.totalWorkedHours,
        userId: user?.id,
        timeZone: data.timeZone,
      };
      setLoader(true);
      api(ADMIN_EDIT_JOB_POST_DETAILS_URL, reqData).then((res) => {
        if (res.status === RESPONSE_OK) {
          setError("");
          getList(false); // fetch data without showing loader
          toggle();
        }
        setLoader(false);
      });
    } else {
      setError("Only Numbers are supported");
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
        {error && <p style={{ color: "#ff3333", fontSize: "12px" }}>{error}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="model-input total-amount">
            <FormInput
              name="hourlyRate"
              id="hourlyRate"
              label="$"
              type="number"
              placeholder=""
              autoFocus={false}
              register={register}
              rules={HourlyRateRules}
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
