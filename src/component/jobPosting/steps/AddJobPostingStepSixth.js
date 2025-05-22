import { JobPostSuccess } from "assets/svg";
import { OnShiftManagementPage } from "constants/AppConstants";
import { Link } from "react-router-dom";

export default function AddJobPostingStepSixth({ toggle, setCurStep }) {
  return (
    <div className="job-post-sucess">
      <JobPostSuccess />
      <p>
        <Link onClick={() => {
          toggle(); 
          setCurStep(0);
          }}>Click here</Link> {OnShiftManagementPage}
      </p>
    </div>
  );
}
