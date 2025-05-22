import DatesLabel from "component/common/NewDatesLabel";
import {
  CLINICIAN_TYPE_LABELS,
  FACILITY_TYPE_LABELS,
  YearsOfPracticeString,
} from "constants/AppConstants";
import { useEffect } from "react";
import { getLocation, timeZone } from "utils/Utils";
import ReactHtmlParser from "react-html-parser";

export default function AddJobPostingStepFifth({
  getValues,
  setTotalPay,
  totalPay,
}) {
  const values = getValues();
  useEffect(() => {
    if (totalPay) {
      setTotalPay(totalPay);
    }
  }, [totalPay]);

  return (
    <>
      <div className="job-post">
        <p>Are you sure you’d like to post this shift?</p>
        <p>
          <span>Facility type</span>:{" "}
          {FACILITY_TYPE_LABELS.get(values.facilityType) ?? values.facilityType}
        </p>
        <p>
          <span>Clinician type</span>:{" "}
          {CLINICIAN_TYPE_LABELS.get(values.clinicianType) ??
            values.clinicianType}
        </p>
        <p>
          <span>{YearsOfPracticeString}</span>: {values.minimumExperince}
        </p>
        <p>
          <span className="d-block">Date & Time:</span>
          <DatesLabel
            arr={values.jobSlots}
            timeZone={timeZone()}
          />
        </p>
        <p>
          <span className="d-block">Location:</span>
          {getLocation(values)}
        </p>
        <p
          className="job-desc"
          style={{ marginBottom: "0px !important" }}>
          <span
            className="d-block"
            style={{ marginBottom: "0" }}>
            Shift description:
          </span>
          {ReactHtmlParser(values.jobDescription)}
        </p>
        <p className="mt-3 mb-0">
          <span>Hourly Rate:</span> ${values.hourlyRate}{" "}
        </p>
        {/* {LUNCH_BREAK(values.jobSlots, true)} */}
      </div>
    </>
  );
}
