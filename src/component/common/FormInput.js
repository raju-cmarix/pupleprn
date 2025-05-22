import {
  INVALID_DECIMAL_INPUT,
  INVALID_NUMBER_INPUT,
} from "constants/AppConstants";
import { useEffect } from "react";
import { Input } from "reactstrap";
import { getDynamicFilter } from "utils/Utils";
import FormError from "./FormError";

export default function FormInput({
  type,
  id,
  children,
  autoFocus,
  register,
  errors,
  name,
  rules,
  label,
  rows,
  divClassName,
  decimal,
  inputDivClassName,
  errorMsg,
  placeholder,
  disabled,
  maxLength,
  defaultvalue,
  style = {}
}) {

  const { ref, ...rest } = register(name, rules);

  if (type === "textarea" && maxLength === undefined)
    rules.maxLength = {
      value:500,
      // message:
      //   (getDynamicFilter(label) ?? "Input") + " cannot exceed 500 characters",
    };
  if (type === "text")
    rules.maxLength = {
      value: 100,
      message:
        (getDynamicFilter(label) ?? "Input") + " cannot exceed 100 characters",
    };

  function onKeyDown(ev) {
    if (type === "number" && (ev.keyCode === 38 || ev.keyCode === 40)) {
      ev.preventDefault();
    }
  }
  function onKeyPress(ev) {
    if (
      type === "number" &&
      ev.key.match(decimal ? INVALID_DECIMAL_INPUT : INVALID_NUMBER_INPUT)
    ) {
      ev.preventDefault();
    }
  }

  return (
    <div className={divClassName || "form-group"}>
      <label htmlFor={id}>{label}</label>
      <div className={inputDivClassName}>
        <Input
          defaultValue={defaultvalue}
          onKeyDown={onKeyDown}
          disabled={disabled}
          onKeyPress={onKeyPress}
          autoFocus={autoFocus}
          name={name}
          rows={rows}
          type={decimal ? "text" : type}
          id={id}
          style={style}
          className={
            errorMsg || errors[name]?.message
              ? "form-control required"
              : "form-control"
          }
          {...rest}
          innerRef={ref}
          onWheel={(ev) => ev.target.blur()}
          placeholder={placeholder}
          maxLength={maxLength || rules?.maxLength?.value}
        />
      </div>
     <FormError msg={errorMsg || errors[name]?.message} />
      {children}
    </div>
  );
}
