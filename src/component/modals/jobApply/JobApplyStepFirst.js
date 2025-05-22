import FormDatePicker from "component/common/FormDatePicker";
import FormError from "component/common/FormError";
import {
  DEFAULT_TIME_INTERVAL,
  HoursChangeError,
} from "constants/AppConstants";
import { ArrivalTimeRules, EndTimeRules } from "constants/Rules";
import { useFieldArray } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { handleDateChange } from "utils/Utils";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.extend(utc);

export default function JobApplyStepFirst({
  jobSlotsValue,
  control,
  errors,
  trigger,
  setValue,
  timeZone,
  getValues
}) {
  const { fields } = useFieldArray({
    control,
    name: "jobSlots",
  });


  return (
    <>
      {/* <label className="font-12 mb-24 d-block">Edit time (optional):</label> */}
      <div className="days-available">
        <Row className="align-items-center justify-content-center">
          {fields.map((field, index) => {
            const newStartDate = dayjs(jobSlotsValue[index]?.startDate).tz(timeZone);
            const newEndDate = dayjs(jobSlotsValue[index]?.endDate).tz(timeZone);
            let newTemp = newEndDate.diff(newStartDate, "h", true);

            const newDays = Math.floor(newTemp / 24);
            newTemp -= newDays * 24;

            const newHours = Number(newTemp)?.toPrecision(2);

            const originalStartDate = dayjs(field?.startDate).tz(timeZone);
            const originalEndDate = dayjs(field?.endDate).tz(timeZone);
            let originalTemp = originalEndDate.diff(
              originalStartDate,
              "h",
              true
            );

            const oldDays = Math.floor(originalTemp / 24);
            originalTemp -= oldDays * 24;

            const originalHours = Number(originalTemp)?.toPrecision(2);

            return (
              <Row key={field.id}>
                <Col className="dashed-border m-0">
                  <Row className="align-items-center">
                    <Col sm={12} md={3} className="weektiming mb-6 pe-0">
                      <label className="font-12">
                        {dayjs(field.startDate).tz(timeZone).format("ddd DD MMM, YYYY")}
                      </label>
                    </Col>
                    <Col
                      sm={12}
                      md={9}
                      className="weektiming mb-6 text-right d-flex justify-content-around"
                    >
                      <div>
                        <div className="weekfrom d-inline-flex align-items-center me-2">
                          <label className="font-12 me-2">arrival time:</label>
                          <div className="signup-select max-80">
                            <FormDatePicker
                              dateFormat={"h:mm aa"}
                              onChangeCallback={() => {
                                setValue(`jobSlots[${index}].endDate`, null)
                                const date =  handleDateChange(getValues(`jobSlots[${index}].startDate`), field.startDate);
                                setValue(`jobSlots[${index}].startDate`, date)
                              }}
                              trigger={trigger}
                              control={control}
                              errors={{}}
                              rules={ArrivalTimeRules}
                              name={`jobSlots[${index}].startDate`}
                              showTimeSelect={true}
                              showTimeSelectOnly={true}
                              timeIntervals={DEFAULT_TIME_INTERVAL}
                            />
                          </div>
                        </div>
                        <FormError
                          msg={
                            errors["jobSlots"]?.[index]?.["startDate"]?.message
                          }
                        />
                      </div>
                      <div>
                        <div className="weekfrom d-inline-flex align-items-center">
                          <label className="font-12 me-2">end time:</label>
                          <div className="signup-select max-80">
                            <FormDatePicker
                              dateFormat={"h:mm aa"}
                              minTime={
                                jobSlotsValue[index].startDate
                                  ? dayjs(jobSlotsValue[index].startDate)
                                      .add(1, "hour")
                                      .toDate()
                                  : null
                              }
                              onChangeCallback={() => {
                                const date = handleDateChange(getValues(`jobSlots[${index}].endDate`), field.endDate);
                                setValue(`jobSlots[${index}].endDate`, date);
                              }}
                              trigger={trigger}
                              control={control}
                              errors={{}}
                              rules={EndTimeRules}
                              name={`jobSlots[${index}].endDate`}
                              showTimeSelect={true}
                              showTimeSelectOnly={true}
                              timeIntervals={DEFAULT_TIME_INTERVAL}
                            />
                          </div>
                        </div>
                        <FormError
                          msg={
                            errors["jobSlots"]?.[index]?.["endDate"]?.message
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  {Number(originalHours) < Number(newHours) &&
                    !isNaN(originalHours) &&
                    !isNaN(newHours) && (
                      <p style={{ color: "#ff3333", fontSize: "12px" }}>
                        {HoursChangeError}
                      </p>
                    )}
                </Col>
              </Row>
            );
          })}
        </Row>
      </div>
    </>
  );
}
