import { Controller } from "react-hook-form";
import FormError from "./FormError";

const FormToggle = ({
  name,
  errors,
  rules,
  divClassName,
  className,
  control,
  changeCallback,
  disabled,
  defaultChecked,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <div className={divClassName}>
            <label
              htmlFor={name}
              className="toggle-switch">
              <input
                className={"d-none " + className}
                type="checkbox"
                id={name}
                checked={value}
                defaultChecked={defaultChecked || false}
                onChange={(ev) => {
                  onChange(ev.target.checked);
                  if (changeCallback) {
                    changeCallback();
                  }
                }}
                errors={errors}
                innerRef={ref}
                disabled={disabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        )}
      />
      <FormError msg={errors[name]?.message} />
    </>
  );
};

export default FormToggle;
