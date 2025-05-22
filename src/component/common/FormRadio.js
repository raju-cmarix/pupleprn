import { random } from "radash";
import { Input } from "reactstrap";
import FormError from "./FormError";
import { getErrorMessage } from "utils/Utils";

export default function FormRadio({
  name,
  register,
  rules,
  options,
  errors,
  divClassName,
  defaultChecked = null,
  disabled,
}) {
  const { ref, ...rest } = register(name, rules);

  return (
    <>
      {options.map((option) => {
        let rand = random(1, 1000);
        return (
          <div
            className={divClassName}
            key={option.label}>
            <Input
              disabled={disabled}
              defaultChecked={option.value === defaultChecked}
              type="radio"
              name={name}
              className="form-check-input"
              id={option.label + rand}
              value={option.value}
              {...rest}
              innerRef={ref}
            />
            <label htmlFor={option.label + rand}>{option.label}</label>
          </div>
        );
      })}
      <p>
        <FormError msg={getErrorMessage(errors, name)} />
      </p>
    </>
  );
}
