import { LeftwhiteArrow, RightwhiteArrow } from "assets/svg";
import FormButton from "component/common/FormButton";

export default function FooterButtons({
  leftLabel,
  rightLabel,
  onRightClick,
  setCurStep,
  curStep,
  rightType,
  loader,
  firstSignUp,
  onLeftClick,
  onSubmit
}) {
  return (
    <div className="signup-btns">
      {leftLabel && (
        <FormButton
          className="pt-btn btn-primary sign-btn sign-prev-btn"
          color="primary"
          label={leftLabel}
          type="button"
          onClick={() => onLeftClick ? onLeftClick() : setCurStep(curStep - 1)}
          icon={<LeftwhiteArrow />}
          iconPosition="left"
        />
      )}
      {firstSignUp ? (
        <>
          {rightLabel && (
            <FormButton
              loader={loader}
              className="pt-btn btn-primary sign-btn"
              color="primary"
              label={rightLabel}
              type={rightType ? "submit" : "button"}
              onClick={() => onRightClick && onRightClick()}
            />
          )}
        </>
      ) : (
        <>
          {rightLabel && (
            <FormButton
              loader={loader}
              className="pt-btn btn-primary sign-btn"
              color="primary"
              label={rightLabel}
              type={rightType ? "submit" : "button"}
              onClick={rightType ? onSubmit : onRightClick }
              icon={<RightwhiteArrow />}
              iconPosition="right"
            />
          )}
        </>
      )}
    </div>
  );
}
