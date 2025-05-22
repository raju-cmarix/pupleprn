import DatePicker from "react-datepicker";
import FormError from "./FormError";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { msg } from "constants/messages";
import { DEFAULT_TIME_INTERVAL } from "constants/AppConstants";
import { TickCalender } from "assets/svg";
export default function FormDatePicker({
  id,
  control,
  errors,
  name,
  rules,
  label,
  divClassName,
  inputDivClassName,
  maxDate,
  dateFormat,
  showMonthYearPicker,
  minDate,
  trigger,
  selectsRange,
  inline,
  showTimeSelect,
  showTimeSelectOnly,
  timeIntervals,
  errorMsg,
  minTime,
  onChangeCallback,
  disabled,
  inlineIcon = false,
}) {
  if (selectsRange) {
    rules.validate = (value) => {
      let temp = value.filter((n) => n);
      return temp.length === 2 || msg.endDate;
    };
  }

  return (
    <div className={divClassName || "form-group"}>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, inputRef } }) => (
          <div className={inputDivClassName || "signup-input"}>
            <DatePicker
              disabled={disabled}
              minTime={minTime || null}
              maxTime={minTime ? dayjs().endOf("day").toDate() : null}
              inline={inline}
              id={id}
              selected={
                !selectsRange && value && dayjs(value).isValid()
                  ? value
                  : undefined
              }
              onChange={(val) => {
                onChange(val);
                trigger && trigger([name]);
                onChangeCallback && onChangeCallback(val);
              }}
              className={`form-control ${errors[name]?.message && "required"}`}
              upeekNextMonth
              showMonthDropdown={true}
              showYearDropdown={true}
              dropdownMode="select"
              inputRef={inputRef}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat={dateFormat}
              showMonthYearPicker={showMonthYearPicker}
              selectsRange={selectsRange}
              startDate={selectsRange && value?.[0]}
              endDate={selectsRange && value?.[1]}
              placeholderText={"Select"}
              // time options
              showTimeSelect={showTimeSelect}
              showTimeSelectOnly={showTimeSelectOnly}
              timeIntervals={timeIntervals || DEFAULT_TIME_INTERVAL}
            />
            {inlineIcon && <TickCalender />}
          </div>
        )}
      />
      <FormError msg={errorMsg || errors[name]?.message} />
    </div>
  );
}
