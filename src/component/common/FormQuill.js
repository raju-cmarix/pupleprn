import FormError from "./FormError";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

export default function FormQuill({
  id,
  trigger,
  errors,
  control,
  name,
  rules,
  label,
  divClassName,
  defaultValue,
  customModules,
  inputDivClassName = "",
  height = "90px",
}) {
  return (
    <div className={divClassName || "form-group"}>
      <label htmlFor={id}>{label}</label>
      <div className={`${inputDivClassName}`}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <ReactQuill
              {...field}
              style={{ height: height, overflowY: "auto" }}
              onChange={(value) => {
                field.onChange(value);
                trigger(name);
              }}
              className={`${errors[name]?.message ? "required" : ""}`}
              onBlur={() => trigger(name)}
              defaultValue={defaultValue}
              modules={customModules}
            />
          )}
        />
      </div>
      <FormError msg={errors[name]?.message} />
    </div>
  );
}
