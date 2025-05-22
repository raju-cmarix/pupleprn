import Select from "react-dropdown-select";
import { Controller } from "react-hook-form";
import FormError from "./FormError";
export default function FormSelect({
  name,
  label,
  id,
  errors,
  options,
  menuPortalTarget,
  optionLabel,
  optionValue,
  autoFocus,
  onBlur,
  control,
  isDisabled,
  multiple,
  isSearchable,
  onChangeCallback,
  isClearable,
  rules,
  placeholder,
  className,
  errorMsg,
  divClassName,
  trigger,
  defaultvalue,
}) {
  return (
    <div className={divClassName || "form-group"}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultvalue}
        render={({ field: { onChange, value, ref } }) => (
          <>
            {label && (
              <label className="form-label cu-form-label" htmlFor={id}>
                {label}
              </label>
            )}
            <div className="signup-select">
              <Select
                clearable={value && value.length ? isClearable : false}
                multi={multiple}
                innerRef={ref}
                placeholder={placeholder}
                disabled={isDisabled}
                id={id}
                className={`react-select ${
                  errorMsg || (errors[name]?.message && "required")
                } ${className}`}
                classNamePrefix="select"
                options={options}
                name={name}
                autoFocus={autoFocus}
                values={
                  multiple
                    ? value && value.length
                      ? value.map((val) => {
                          return options.find(
                            (option) => option[optionValue] === val
                          );
                        })
                      : undefined
                    : value
                    ? options.filter((option) => option[optionValue] === value)
                    : undefined
                }
                onChange={(val) => {
                  onChange(
                    val && val.length
                      ? multiple
                        ? val.map((v) => v[optionValue])
                        : val && val[0][optionValue]
                      : undefined
                  );
                  trigger && trigger([name]);
                  onChangeCallback && onChangeCallback(val);
                }}
                getOptionLabel={(option) => option[optionLabel]}
                getOptionValue={(option) => option[optionValue]}
                menuPortalTarget={menuPortalTarget}
                onBlur={(e, data) => onBlur && onBlur(e, data)}
                isSearchable={isSearchable}
                searchFn={({ methods, props, state }) => {
                  let res = [];
                  res = props.options.filter((s) =>
                    s[optionLabel]
                      .toLowerCase()
                      .startsWith(state.search.toLowerCase())
                  );
                  return res;
                }}
              />
            </div>
            <FormError msg={errorMsg || errors[name]?.message} />
          </>
        )}
      />
    </div>
  );
}
