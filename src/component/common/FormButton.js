import { LeftwhiteArrow } from "assets/svg";
import { Spinner } from "reactstrap";

export default function FormButton({
  label,
  type,
  onClick,
  disabled,
  loader,
  icon,
  iconPosition,
  className,
}) {
  return (
    <button
      className={`${className || "pt-btn btn-primary email-capture"} position-relative`}
      type={type}
      color="primary"
      disabled={disabled || loader}
      onClick={onClick}

    >
      {loader ? (
        <Spinner color="light" />
      ) : (
        <span>
          {iconPosition === "left" && icon} {label}
          {iconPosition === "right" && icon}
        </span>
      )}
    </button>
  );
}
