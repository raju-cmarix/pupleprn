import { random } from "radash";
import { Controller } from "react-hook-form";
import { Input } from "reactstrap";
import FormError from "./FormError";
const FormCheckbox = ({
  name,
  errors,
  rules,
  divClassName,
  children,
  options,
  className,
  control,
  changeCallback,
  disabled,
  defaultChecked,
  renderBRTag = true,
}) => {
  return (
    <>
      {options.map((option, index) => {
        let rand = random(1, 1000);
        return (
          <Controller
            key={index}
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value, ref } }) => (
              <div
                className={divClassName}
                key={index}>
                <Input
                  className={className}
                  type={"checkbox"}
                  id={option.label + rand}
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
                <label htmlFor={option.label + rand}>{option.label}</label>
              </div>
            )}
          />
        );
      })}
      {children}
      {renderBRTag ? <br></br> : null}
      <FormError msg={errors[name]?.message} />
    </>
  );
};

export default FormCheckbox;
