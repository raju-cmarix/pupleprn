import { Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import FormError from "./FormError";

export default function FormCleave({
  errors,
  name,
  rules,
  label,
  divClassName,
  control,
  inputDivClassName,
  id,
  trigger,
  disabled = false,
  extraText,
  checkBox,
}) {
  return (
    <div className={divClassName || "form-group"}>
      <label htmlFor={id}>{label}</label>
      <div className={inputDivClassName}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => {
            
            return (
              <Cleave
                onBlur={() => trigger([name])}
                inputRef={field.ref}
                // htmlRef={(ref) => field.ref(ref)} // Fix for focus issue
                // ref={field.ref}
                name={name}
                onChange={(ev) => field.onChange(ev.target.rawValue)}
                value={field.value}
                className={
                  errors[name]?.message
                    ? "form-control required"
                    : "form-control"
                }
                placeholder=""
                options={{
                  numericOnly: true,
                  delimiters: ["(", ") ", "-"],
                  blocks: [0, 3, 3, 4],
                }}
                disabled={disabled}
              />
            );
          }}
        />
        {checkBox && checkBox}
        {extraText && (
          <p style={{ marginTop: "5px", fontSize: "12px" }}>{extraText}</p>
        )}
      </div>
      <FormError msg={errors[name]?.message} />
    </div>
  );
}
