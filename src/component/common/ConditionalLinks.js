import {
  ApplyToWork,
  CLINICIAN_SIGNUP,
  COMPLETE_PROFILE_FIRST,
  FACILITY_SIGNUP,
  HireStaff,
  ROLE_CLINICIAN,
  ROLE_FACILITY,
  TOAST_AUTO_CLOSE,
} from "constants/AppConstants";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import UserContext from "utils/context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, Slide } from "react-toastify";
import AuthContext from "utils/context/AuthContext";
import { FACILITY_SIGNUP_URL } from "constants/ApiUrls";
export default function ConditionalLinks({ type, role }) {
  const { user } = useContext(UserContext);
  const { isUserAuthenticated } = useContext(AuthContext);
  const AW = ApplyToWork(isUserAuthenticated);
  const HS = HireStaff(isUserAuthenticated);
  const navigate = useNavigate();
  const showToast = (msg) => {
    toast.error(msg, {
      transition: Slide,
      autoClose: TOAST_AUTO_CLOSE,
    });
  };
  const verifyFirst = () => {
    showToast("Call with Onboarding team is pending for verification");
    window.scrollTo(0, 0);
  };
  const clinicianCheck = () => {
    if (isUserAuthenticated) {
      if (user?.clinicianId && !user?.clinicianId?.isSignupCompleted) {
        showToast(COMPLETE_PROFILE_FIRST);
      } else if (ROLE_CLINICIAN.includes(user?.roles)) {
        verifyFirst();
      } else {
        showToast("Clinician signup/login is required");
      }
    } else {
      navigate(CLINICIAN_SIGNUP);
    }
  };
  const facilityCheck = () => {
    if (isUserAuthenticated) {
      if (user?.facilityId && !user?.facilityId?.isSignupCompleted) {
        showToast(COMPLETE_PROFILE_FIRST);
      } else if (
        ROLE_FACILITY.includes(user?.roles) &&
        !user?.isApprovedByAdmin
      ) {
        verifyFirst();
      } else {
        if (!user?.isApprovedByAdmin)
          showToast("Facility signup/login is required");
      }
    } else {
      navigate(FACILITY_SIGNUP);
    }
  };
  const cliLink = user?.isApprovedByAdmin ? (
    <Link
      to={
        isUserAuthenticated
          ? ROLE_CLINICIAN.includes(user?.roles)
            ? "/clinician/jobboard"
            : CLINICIAN_SIGNUP
          : CLINICIAN_SIGNUP
      }
      className="btn-secondary pt-btn ms-3"
    >
      {AW}
    </Link>
  ) : (
    <>
      <Link
        to={
          isUserAuthenticated
            ? !ROLE_CLINICIAN.includes(user?.roles)
              ? CLINICIAN_SIGNUP
              : ""
            : CLINICIAN_SIGNUP
        }
        className="btn-secondary pt-btn ms-3"
        onClick={clinicianCheck}
      >
        {AW}
      </Link>
    </>
  );

  const cliButton = user?.isApprovedByAdmin ? (
    <a
      className={
        type === "navLink" ? "cursor-pointer" : "btn-secondary pt-btn ms-3"
      }
      onClick={() =>
        isUserAuthenticated
          ? showToast("Clinician signup/login is required")
          : navigate(CLINICIAN_SIGNUP)
      }
    >
      {AW}
    </a>
  ) : (
    <a
      onClick={clinicianCheck}
      className={
        type === "navLink" ? "cursor-pointer" : "btn-secondary pt-btn ms-3"
      }
    >
      {AW}
    </a>
  );

  const cliNavLink = (
    <>
      {user?.isApprovedByAdmin ? (
        <NavLink
          to={
            isUserAuthenticated
              ? ROLE_CLINICIAN.includes(user?.roles)
                ? "/clinician/jobboard"
                : CLINICIAN_SIGNUP
              : CLINICIAN_SIGNUP
          }
          onClick={() => window.scrollTo(0, 0)}
        >
          {AW}
        </NavLink>
      ) : (
        <>
          <NavLink
            to={
              isUserAuthenticated
                ? !ROLE_CLINICIAN.includes(user?.roles)
                  ? CLINICIAN_SIGNUP
                  : ""
                : CLINICIAN_SIGNUP
            }
            onClick={clinicianCheck}
          >
            {AW}
          </NavLink>
        </>
      )}
    </>
  );

  const facLink = user?.isApprovedByAdmin ? (
    <Link
      to={
        isUserAuthenticated
          ? ROLE_FACILITY.includes(user?.roles)
            ? "/facility/shiftmanagement"
            : FACILITY_SIGNUP
          : FACILITY_SIGNUP
      }
      className="btn-primary pt-btn me-sm-4"
    >
      {HS}
    </Link>
  ) : (
    <Link
      to={
        isUserAuthenticated
          ? !ROLE_FACILITY.includes(user?.roles)
            ? FACILITY_SIGNUP
            : ""
          : FACILITY_SIGNUP
      }
      className="btn-primary pt-btn me-sm-4"
      onClick={facilityCheck}
    >
      {HS}
    </Link>
  );

  const facButton = user?.isApprovedByAdmin ? (
    <a
      className={
        type === "navLink" ? "cursor-pointer" : "btn-primary pt-btn me-sm-4"
      }
      onClick={() =>
        isUserAuthenticated
          ? showToast("Facility signup/login is required")
          : navigate(FACILITY_SIGNUP)
      }
    >
      {HS}
    </a>
  ) : (
    <a
      className={
        type === "navLink" ? "cursor-pointer" : "btn-primary pt-btn me-sm-4"
      }
      onClick={facilityCheck}
    >
      {HS}
    </a>
  );

  const facNavLink = user?.isApprovedByAdmin ? (
    <NavLink
      to={
        isUserAuthenticated
          ? ROLE_FACILITY.includes(user?.roles)
            ? "/facility/shiftmanagement"
            : FACILITY_SIGNUP
          : FACILITY_SIGNUP
      }
      onClick={() => window.scrollTo(0, 0)}
    >
      {HS}
    </NavLink>
  ) : (
    <NavLink
      to={
        isUserAuthenticated
          ? !ROLE_FACILITY.includes(user?.roles)
            ? FACILITY_SIGNUP
            : ""
          : FACILITY_SIGNUP
      }
      onClick={facilityCheck}
    >
      {HS}
    </NavLink>
  );

  const renderItems = () => {
    let x = <></>;

    switch (role) {
      case "fac":
        if (type === "navLink") {
          x = <li className="nav-item">{facNavLink}</li>;
        } else if (!user || user?.facilityId) {
          x = facLink;
        } else x = facButton;

        break;

      case "cli":
        if (type === "navLink") {
          x = <li className="nav-item">{cliNavLink}</li>;
        } else if (!user || user?.clinicianId) {
          x = cliLink;
        } else x = cliButton;
        break;

      default:
        break;
    }

    return x;
  };

  return <>{renderItems()}</>;
}
