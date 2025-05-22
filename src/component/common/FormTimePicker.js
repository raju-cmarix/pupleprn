import FormError from "./FormError";
import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useRef, useEffect } from "react";

export default function FormTimePicker({
  id,
  control,
  errors,
  name,
  rules,
  label,
  trigger,
  errorMsg,
  disabled,
  onChangeCallback,
  divClassName = "",
}) {
  const datePickerRef = useRef(null);

  useEffect(() => {
    // for closing the time picker when user clicks outside of it
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        datePickerRef.current.closeCalendar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`form-group ${divClassName}`}>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, inputRef } }) => (
          <div
            className={"signup-input"}
            ref={inputRef}>
            <DatePicker
              shadow={false}
              disableDayPicker
              ref={datePickerRef}
              value={value}
              placeholder="Select"
              onChange={(val) => {
                onChange(val ? new Date(val) : undefined);
                onChangeCallback && onChangeCallback();
              }}
              dropdownMode="select"
              disabled={disabled}
              format="hh:mm A"
              plugins={[
                <TimePicker
                  hideSeconds
                  position="bottom"
                />,
              ]}
            />
          </div>
        )}
      />
      <FormError msg={errorMsg || errors[name]?.message} />
    </div>
  );
}
