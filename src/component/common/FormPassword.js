import { useEffect, useState } from "react";
import { HideEye, Eye } from "assets/svg";
import FormError from "./FormError";
import TickIcon from "../../assets/images/icons/remove.png";
import TickGreen from "../../assets/images/icons/check-green.png";
import { Input } from "reactstrap";
import { VALID_PASSWORD_REGEX } from "constants/AppConstants";

const FormPassword = (props) => {
  const {
    label,
    htmlFor,
    placeholder,
    register,
    rules,
    errors,
    name,
    passwordValue,
    isConfirmPassword,
    confirmPasswordMessage,
    dirtyFields,
    trigger,
    cPasswordValue,
  } = props;

  if (isConfirmPassword === true) {
    rules.validate = (value) =>
      value === passwordValue || confirmPasswordMessage;
  }

  useEffect(() => {
    dirtyFields &&
      dirtyFields[name] &&
      passwordValue &&
      isConfirmPassword &&
      trigger([name]);
  }, [passwordValue]);

  const { ref, ...rest } = register(name, rules);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <div className="form-group">
      {label ? (
        <label className="form-label cu-form-label" htmlFor={htmlFor}>
          {label}{" "}
        </label>
      ) : null}
      <div className="signup-password">
        <Input
          innerRef={ref}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder ? placeholder : "············"}
          className={
            errors[name]?.message ? "form-control required" : "form-control"
          }
          {...(label && htmlFor
            ? {
                id: htmlFor,
              }
            : {})}
          {...rest}
        />

        {dirtyFields && dirtyFields[name] && (
          <div className="tick-icon">
            <>
              {isConfirmPassword ? (
                <img
                  alt="checkmark"
                  src={
                    errors[name] ||
                    !VALID_PASSWORD_REGEX.test(cPasswordValue) ||
                    cPasswordValue !== passwordValue
                      ? TickIcon
                      : TickGreen
                  }
                  className="tickicon image-fluid"
                />
              ) : (
                <img
                  alt="checkmark"
                  src={
                    errors[name] || !VALID_PASSWORD_REGEX.test(passwordValue)
                      ? TickIcon
                      : TickGreen
                  }
                  className="tickicon image-fluid"
                />
              )}
            </>
          </div>
        )}

        <div className="password-eye" onClick={toggle}>
          {show ? <HideEye /> : <Eye />}
        </div>
      </div>

      <FormError msg={errors[name]?.message} />
    </div>
  );
};

export default FormPassword;
