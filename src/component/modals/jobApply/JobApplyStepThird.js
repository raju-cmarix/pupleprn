import { JobPostSuccess } from "assets/svg";
import { Link } from "react-router-dom";

export default function JobApplyStepThird({ toggle }) {
  return (
    <div className="job-post-sucess">
      <JobPostSuccess />
      <p>
        <Link to="/clinician/dashboard" onClick={() => toggle()}>
          Click here
        </Link>{" "}
        to go to My Dashboard
      </p>
    </div>
  );
}
