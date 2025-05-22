import FormDatePicker from "component/common/FormDatePicker";
import FormMultiDatePicker from "component/common/FormMultiDatePicker";
import { jobDatesRules } from "constants/Rules";
import dayjs from "dayjs";

export default function AddJobPostingStepSecond({
  errors,
  control,
  trigger,
  Dates,
  setDates,
  modal,
  disabled,
  isEdit,
}) {
  return (
    // <FormDatePicker
    //   minDate={new Date()}
    //   inline={true}
    //   trigger={() => {}}
    //   errors={errors}
    //   divClassName="job-date-picker"
    //   rules={jobDatesRules}
    //   control={control}
    //   label="Select Date:"
    //   name={"dates"}
    //   id="range-picker"
    //   className="form-control"
    //   selectsRange={true}
    //   sameAsStartDate={true}
    // />
    <FormMultiDatePicker
      minDate={new Date()}
      maxDate={dayjs().add(90, 'day').toDate()}
      inline={true}
      isEdit={isEdit}
      Dates={Dates}
      modal={modal}
      setDates={setDates}
      trigger={() => {}}
      errors={errors}
      isDisabled={disabled}
      divClassName="job-date-picker unselected-date-border"
      rules={jobDatesRules}
      control={control}
      label="Select Date:"
      name={"dates"}
      id="range-picker"
      className="form-control"
      selectsRange={true}
      sameAsStartDate={true}
    />
  );
}

