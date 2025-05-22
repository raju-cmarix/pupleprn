import { api } from "api/Api";
import { JobPostSuccess } from "assets/svg";
import FormButton from "component/common/FormButton";
import { TIMESHEET_APPROVE } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

export default function ApprovedTimesheetModal({
  open,
  toggle,
  timesheetData,
}) {
  const [loader, setLoader] = useState(false);

  const handleApprove = () => {
    setLoader(true);
    api(TIMESHEET_APPROVE, {
      ...timesheetData,
      id: timesheetData.timesheetId,
    })
      .then((res) => {
        if (res.status !== RESPONSE_OK) {
          toggle();
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    handleApprove();
  }, []);

  return (
    <div className="jobPost-modal">
      <Modal
        centered
        isOpen={open}
        toggle={toggle}
        className="jobPost-modal position-relative">
        <>
          <div className="centered-spinner">
            <Spinner />
          </div>
          <div className={loader ? "opacity-50" : ""}>
            <ModalHeader toggle={toggle}>
              <h5 className="modal-title">
                Timesheet approved <span>successfully!</span>
              </h5>
            </ModalHeader>
            <ModalBody>
              <div className="job-post-sucess">
                <JobPostSuccess />
                <p>
                  <Link to="/facility/shiftmanagement">Click here</Link> to
                  visit the shift management page.
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="modal-footer">
                <FormButton
                  loader={false}
                  label={"Close"}
                  className="pt-btn btn-secondary pt-btn-small"
                  onClick={() => toggle()}
                />
              </div>
            </ModalFooter>
          </div>
        </>
      </Modal>
    </div>
  );
}
