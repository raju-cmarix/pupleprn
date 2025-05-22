import FormDatePicker from "component/common/FormDatePicker";
import FormError from "component/common/FormError";
import { DEFAULT_TIME_INTERVAL } from "constants/AppConstants";
import { ArrivalTimeRules, EndTimeRules } from "constants/Rules";
import { useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { Col, Row } from "reactstrap";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { handleDateChange } from "utils/Utils";
dayjs.extend(timezone);
dayjs.extend(utc);

export default function AddJobPostingStepFourth({
  useFieldArray,
  errors,
  control,
  trigger,
  jobSlotValue,
  setValue,
  setTotalPay,
  calculateTotalPayForJob,
  hourlyRate,
  error,
}) {
  const { fields } = useFieldArray({
    control,
    name: "jobSlots",
  });

  useEffect(() => {
    setTotalPay(calculateTotalPayForJob(fields, hourlyRate));
  }, [fields]);

  return (
    <>
      <label className="font-12 mb-24 d-block">Edit time (optional):</label>
      {error && <p style={{ color: "#ff3333", fontSize: "13px" }}>{error}</p>}
      <div className="days-available height-mng">
        <Row className="align-items-center justify-content-center">
          {fields.map((field, index) => {
            return (
              <Fragment key={field.id}>
                <Row>
                  <Col className="dashed-border m-0 mb-6">
                    <Row className="align-items-center">
                      <Col sm={12} md={3} className="weektiming mb-6 pe-0">
                        <label className="font-12">
                          {dayjs(field.startDate).format("ddd DD MMM, YYYY")}{" "}
                        </label>
                      </Col>
                      <Col
                        sm={12}
                        md={9}
                        className="weektiming mb-6 text-right d-flex justify-content-around"
                      >
                        <div>
                          <div className="weekfrom d-inline-flex align-items-center me-2">
                            <label className="font-12 me-2">
                              arrival time:
                            </label>
                            <div className="signup-select max-80">
                              <FormDatePicker
                                onChangeCallback={(e) => {
                                  if (e instanceof Date) {
                                    const date = handleDateChange(e, field.startDate);
                                    setValue(`jobSlots[${index}].startDate`, date);
                                  }
                                }}
                                dateFormat={"h:mm aa"}
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
                              errors["jobSlots"]?.[index]?.["startDate"]
                                ?.message
                            }
                          />
                        </div>
                        <div>
                          <div className="weekfrom d-inline-flex align-items-center">
                            <label className="font-12 me-2">end time:</label>
                            <div className="signup-select max-80">
                              <FormDatePicker
                                minTime={
                                  jobSlotValue[index].startDate
                                    ? dayjs(jobSlotValue[index].startDate)
                                        .add(1, "hour")
                                        .toDate()
                                    : null
                                }
                                dateFormat={"h:mm aa"}
                                trigger={trigger}
                                control={control}
                                errors={{}}
                                rules={EndTimeRules}
                                name={`jobSlots[${index}].endDate`}
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                timeIntervals={DEFAULT_TIME_INTERVAL}
                                onChangeCallback={(e) => {
                                  if (e instanceof Date) {
                                    const date = handleDateChange(e, field.endDate);
                                    setValue(`jobSlots[${index}].endDate`, date);
                                  }
                                }}
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
                  </Col>
                </Row>
              </Fragment>
            );
          })}
        </Row>
      </div>
    </>
  );
}
