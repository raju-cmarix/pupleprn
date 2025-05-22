import DatesLabel from "component/common/NewDatesLabel";
import {
  CURSORPOINTER,
  DEFAULT_TIMEZONE,
  FlexibleTimingsText,
} from "constants/AppConstants";
import { useState } from "react";
import { Input } from "reactstrap";
import { timeZone } from "utils/Utils";
import JobApplyStepFirst from "./JobApplyStepFirst";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.extend(utc);

export default function JobApplyStepSecond({
  getValues,
  data,
  officeAddress,
  changedTimes,
  commonProps,
  jobSlotsValue,
  setValue,
  serverTotalHours,
  ourTotalHours,
  totalPay,
}) {
  const values = getValues();
  const [changeTimes, setChangeTimes] = useState(false);
  const FlexibleTimingsCheckBox = () => {
    const convertedJobSlots = data?.jobSlots?.map((e) => {
      return {
        ...e,
        startDate: dayjs(e.startDate).tz(values.timeZone).toDate(),
        endDate: dayjs(e.endDate).tz(values.timeZone).toDate(),
      };
    });
    if (changeTimes) {
      setValue("jobSlots", convertedJobSlots);
    }
    setChangeTimes(!changeTimes);
  };

  return (
    <>
      <div className="job-post">
        <p>Are you sure you’d like to apply this shift offer?</p>
        <p>
          <span className="d-block">Facility:</span>
          {data.officeName}
        </p>
        <p>
          <span className="d-block">Zipcode:</span>
          {data.zipCode}
        </p>
        <p>
          <span className="d-block">Date & Time :</span>
          <DatesLabel
            arr={data.jobSlots}
            timeZone={data.timeZone ?? DEFAULT_TIMEZONE}
          />
        </p>
        {serverTotalHours && (
          <p>
            <span className="d-block">Total hours :</span>
            <b>{serverTotalHours && serverTotalHours} hrs</b>
          </p>
        )}
        {changedTimes && (
          <>
            <p>
              <span className="d-block">Date & Time proposed:</span>
              <DatesLabel
                arr={values.jobSlots}
                serverDate={false}
                timeZone={timeZone()}
              />
            </p>

            <p>
              <span className="d-block">Total hours proposed :</span>
              <b>{ourTotalHours && ourTotalHours} hrs</b>
            </p>
          </>
        )}
        <p className="mb-0">
          {/* <span>Estimated pay: ${totalPay}</span>{" "} */}
          <span>Hourly Rate: </span>
          {`$${data.effectiveHourlyRate}`}
        </p>
        {/* {serverTotalHours >= 5 && LUNCH_BREAK(data.jobSlots, true)} */}
        {/* {ourTotalHours>5LUNCH_BREAK(values.jobSlots)} */}
        <p
          onClick={FlexibleTimingsCheckBox}
          style={CURSORPOINTER}
          className="mt-3">
          <Input
            style={CURSORPOINTER}
            type="checkbox"
            className="form-check-input"
            checked={changeTimes}
          />{" "}
          {FlexibleTimingsText}
        </p>
      </div>

      {changeTimes && (
        <div>
          <JobApplyStepFirst
            {...commonProps}
            jobSlotsValue={jobSlotsValue}
            setValue={setValue}
            timeZone={data.timeZone ?? DEFAULT_TIMEZONE}
            getValues={getValues}
          />
        </div>
      )}
    </>
  );
}
