import { random } from "radash";
import { Input } from "reactstrap";
import FormError from "./FormError";
const FormCheckboxOther = ({
  name,
  errors,
  register,
  rules,
  divClassName,
  children,
  options,
  className,
  disabled = false,
  onChangeFor
}) => {
  const { ref, ...rest } = register(name, rules);

  return (
    <>
      {options.map((option, index) => {
        let rand = random(1, 1000);
        return (
          <div className={divClassName} key={index}>
            <Input
              disabled={disabled}
              className={className}
              type={"checkbox"}
              id={option.label + rand}
              name={name}
              value={option.value}
              errors={errors}
              innerRef={ref}
              {...rest}
              onChange={(e) => {
                rest.onChange(e);
                onChangeFor && onChangeFor(option.label);
              }}
            />
            <label htmlFor={option.label + rand}>{option.label}</label>
          </div>
        );
      })}
      {children}
      <br></br>
      <FormError msg={errors[name]?.message} />
    </>
  );
};

export default FormCheckboxOther;
