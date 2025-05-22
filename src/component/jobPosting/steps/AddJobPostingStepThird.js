import FormDatePicker from "component/common/FormDatePicker";
import FormError from "component/common/FormError";
import { DEFAULT_TIME_INTERVAL } from "constants/AppConstants";
import { ArrivalTimeRules, EndTimeRules } from "constants/Rules";
import dayjs from "dayjs";
import { Col, Row } from "reactstrap";

export default function AddJobPostingStepThird({
  errors,
  control,
  trigger,
  arrivalTimeValue,
  multiLabel,
  // setValue,
  // timming,
}) {
  return (
    <>
      <label className="font-12 mb-24 d-block">
        {multiLabel
          ? "Select a default time (you can edit them individually on the next screen):"
          : "Select time:"}
      </label>
      <div className="days-available">
        <Row className="days">
          <Col className="weektiming mb-12 px-sm-3 px-1">
            <div className="weekfrom d-flex align-items-center">
              <label className="font-12 me-2">arrival time:</label>
              <div className="signup-select max-80">
                <FormDatePicker
                  dateFormat={"h:mm aa"}
                  trigger={trigger}
                  control={control}
                  errors={{}}
                  rules={ArrivalTimeRules}
                  name="arrivalTime"
                  showTimeSelect={true}
                  showTimeSelectOnly={true}
                  timeIntervals={DEFAULT_TIME_INTERVAL}
                  // placeholder={timming?.jobSlots?.startDate}
                />
              </div>
            </div>
            <FormError msg={errors["arrivalTime"]?.message} />
          </Col>
          <Col className="weektiming mb-12 px-sm-3 px-1">
            <div className="weekfrom d-flex align-items-center">
              <label className="font-12 me-2">end time:</label>
              <div className="signup-select max-80">
                <FormDatePicker
                  minTime={
                    arrivalTimeValue
                      ? dayjs(arrivalTimeValue).add(1, "hour").toDate()
                      : null
                  }
                  dateFormat={"h:mm aa"}
                  trigger={trigger}
                  control={control}
                  errors={{}}
                  name="endTime"
                  rules={EndTimeRules}
                  showTimeSelect={true}
                  showTimeSelectOnly={true}
                  timeIntervals={DEFAULT_TIME_INTERVAL}
                />
              </div>
            </div>
            <FormError msg={errors["endTime"]?.message} />
          </Col>
        </Row>
      </div>
    </>
  );
}
