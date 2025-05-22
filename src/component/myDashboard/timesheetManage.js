// React and Third party imports
import { Options } from "assets/svg";
import { TIMESHEET_URL } from "constants/AppConstants";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const TimesheetManage = ({ data, uploadToggle, setSelectedRow }) => {
    
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /**
   * The function toggleDropdown toggles the value of isDropdownOpen.
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <UncontrolledDropdown
        setActiveFromChild
        isOpen={isDropdownOpen}
        toggle={toggleDropdown}
        className="user-dropdown border-0"
      >
        <DropdownToggle tag="a" className="timeCard-clinician">
          <Button id={"id" + data.id} className="table-dot" type="button">
            {" "}
            <Options />
          </Button>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            tag={Link}
            className="w-100 pointer"
            onClick={() => {
              setSelectedRow(data);
              uploadToggle();
            }}
          >
            <span>
              {" "}
              {data?.timeCardUrlForClinician ? "View" : "Upload"} Time Card
            </span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to={TIMESHEET_URL} className="">
            {/* <a href={TIMESHEET_URL}> Download Timesheet</a> */}
            <span>Download Timesheet</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default TimesheetManage;
