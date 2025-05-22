import { ReactComponent as CloseIcon } from "assets/images/icons/close.svg";
import { DownArrow, SearchBar, Smallcalender, SmallID, SmallMarker } from "assets/svg";
import ClinicianExpFilterModal from "component/modals/filters/ClinicianExpFilterModal";
import ClinicianTypeFilterModal from "component/modals/filters/ClinicianTypeFilterModal";
import DistanceSelectModal from "component/modals/filters/DistanceSelectModal";
import FacilityTypeFilterModal from "component/modals/filters/FacilityTypeFilterModal";
import HourlyFilterModal from "component/modals/filters/HourlyFilterModal";
import { ARROW_KEYS, SPACE_KEY } from "constants/AppConstants";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-dropdown-select";
import RangeSlider from "react-range-slider-input/dist/components/RangeSlider";
import { Button, Col, Input, Row } from "reactstrap";
import { ClinicianJobSortOptions } from "views/authentication/signUpClinician/HourlyConstant";

export default function JobBoardFilter({ filters, setFilters, leftSideDisabled }) {
  const [clinicianExpModal, setClinicianExpModal] = useState(false);
  const [distanceModal, setDistanceModal] = useState(false);
  const [clinicianTypeModal, setClinicianTypeModal] = useState(false);
  const [facilityTypeModal, setFacilityTypeModal] = useState(false);
  const [hourlyModal, setHourlyModal] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const initialDistance = JSON.parse(localStorage.getItem('distance')) || 45;
  const [vals, setVals] = useState([0, initialDistance]);
  const toggleModals = (modalType) => {
    switch (modalType) {
      case "type":
        setClinicianTypeModal(!clinicianTypeModal);
        break;
        case "facility":
          setFacilityTypeModal(!facilityTypeModal);
          break;
      case "exp":
        setClinicianExpModal(!clinicianExpModal);
        break;
      case "distance":
        setDistanceModal(!distanceModal);
        break;
      case "hour":
        setHourlyModal(!hourlyModal);
        break;
      default:
        break;
    }
  };

  const handleChange = (ev) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const handleDateChange = (date) => {
    if (date && date?.length === 2 && date?.every((e) => e)) {
      setDateRange(date);
      setFilters({
        ...filters,
        startDate: new Date(new Date(date[0]).setHours(0, 0, 0, 0)),
        endDate: new Date(new Date(date[1]).setHours(23, 59, 59, 0)),
      });
    } else {
      if (date) {
        setDateRange(date);
      } else {
        setDateRange([]);
        setFilters({
          ...filters,
          startDate: "",
          endDate: "",
        });
      }
    }
  };

  const handleOnChange = (newValue) => {
    setVals(newValue);
            //  setFilters({ ...filters, distance: vals[1], skip: 0 });
            //  localStorage.setItem('distance', JSON.stringify(vals[1]));
  };

  const handleOnRelease = () => {
    setFilters({ ...filters, distance: vals[1], skip: 0 });
    localStorage.setItem('distance', JSON.stringify(vals[1]));
  };

  const ACTIVE = "menu-btn border active";
  const PASSIVE = "menu-btn border";
  const BUTTON_CLASSNAME = (condition) => (condition ? ACTIVE : PASSIVE);
  return (
    <>
      <Row>
        <Col lg="6" className="jobsearch">
          <div className="jobsearch-btn">
            <div className="zipcode-input">
              <SmallMarker />
              <Input
                type="number"
                name="search"
                placeholder="Zipcode (Exact)"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (ARROW_KEYS?.includes(e?.code)) {
                    e?.preventDefault();
                  }
                }}
                onWheel={(e) => e?.target?.blur()}
              />
            </div>
            <div className="zipcode-input fi-input p-2">
              <SmallID />
              <Input
                type="text"
                name="facility"
                placeholder="Facility ID (Exact)"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.code === SPACE_KEY) {
                    e?.preventDefault();
                  }
                }}
                onWheel={(e) => e?.target?.blur()}
              />
            </div>
            <div className="daterange-input">
              <div
                onClick={() => {
                  if (dateRange?.length > 0) handleDateChange();
                }}
              >
                {dateRange?.length < 1 ? <Smallcalender /> : <CloseIcon />}
              </div>

              <DatePicker
                minDate={new Date() - 1}
                selectsRange={true}
                className="form-control"
                onChange={(date) => handleDateChange(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Date range (optional)"
                startDate={dateRange[0]}
                endDate={dateRange[1]}
              />
            </div>
          </div>
          <div className="jobboard-search">
            <span>
              <SearchBar />
            </span>
          </div>
        </Col>
        <Col lg="6" className="hourly">
          <div className="hourly-select">
            <label htmlFor="hourlySelect">Sort by:</label>
            <Select
              onChange={(data) =>
                setFilters({ ...filters, sortBy: data?.[0]?.value })
              }
              values={ClinicianJobSortOptions.filter(
                (option) => option["value"] === filters.sortBy
              )}
              options={ClinicianJobSortOptions}
              placeholder={ClinicianJobSortOptions[0]?.label}
            />
          </div>
          {filters?.sortBy && (
            <div className="hourly-btn">
              <span
                className={`uparrow ${
                  (filters.direction === "aToZ" || !filters?.direction) &&
                  "active"
                }`}
                onClick={() =>
                  setFilters({
                    ...filters,
                    direction: filters.direction !== "aToZ" ? "aToZ" : "",
                  })
                }
              >
                <DownArrow />
              </span>
              <span
                className={`down ${filters.direction === "zToA" && "active"}`}
                onClick={() =>
                  setFilters({
                    ...filters,
                    direction: filters.direction !== "zToA" ? "zToA" : "",
                  })
                }
              >
                <DownArrow />
              </span>
            </div>
          )}
        </Col>
      </Row>
      <div className="jobmenu-btns">

        {/* <Button
          className={BUTTON_CLASSNAME(filters?.clinicianType)}
          color
          onClick={() => toggleModals("type")}
        >
          Clinician type
        </Button> */}
        {/* <Button
          className={BUTTON_CLASSNAME(filters?.minimumExperience)}
          color
          onClick={() => toggleModals("exp")}
        >
          Experience
        </Button> */}
       <div style={{minWidth:"30%"}} className="distance-modal">
      <div className="modal-body">
        <p style={{width:"100%"}}>Distance from home</p>
        <div className="slider">
        <span>{vals[0]}</span>
        <RangeSlider
           value={vals}
           onInput={ handleOnChange }
           onThumbDragEnd={ () => handleOnRelease() }
            className="distance-range-slider"
            thumbsDisabled={[true, leftSideDisabled]}
            rangeSlideDisabled={true}
            rightSideDisabled={true}  
            max={100}
            min={0}
          />
          <span style={{width:"30%"}}>{vals[1]} miles</span>
        </div>
      </div>
    </div>
        {/* <Button
          className={BUTTON_CLASSNAME(filters?.distance)}
          color
          onClick={() => toggleModals("distance")}
        >
          Distance from home
        </Button> */}
        <Button
          className={BUTTON_CLASSNAME(filters?.hourlyRate)}
          color
          onClick={() => toggleModals("hour")}
        >
          Hourly rate
        </Button>
        <Button
          className={BUTTON_CLASSNAME(filters?.clinicianType)}
          color
          onClick={() => toggleModals("facility")}
        >
          Facility type
        </Button>
      </div>
      <HourlyFilterModal
        modal={hourlyModal}
        handleApply={(val) => {
          // val?.toString()
          setFilters({ ...filters, hourlyRate: val[0], skip: 0 });
          toggleModals("hour");
        }}
        toggle={() => toggleModals("hour")}
        currentValue={filters?.hourlyRate || null}
        leftSideDisabled={true}
      />

      <ClinicianTypeFilterModal
        handleApply={(val) => {
          setFilters({ ...filters, clinicianType: val, skip: 0 });
          toggleModals("type");
        }}
        modal={clinicianTypeModal}
        toggle={() => toggleModals("type")}
        currentValue={filters?.clinicianType || null}
      />

      <ClinicianExpFilterModal
        modal={clinicianExpModal}
        toggle={() => toggleModals("exp")}
        handleApply={(val) => {
          setFilters({ ...filters, minimumExperience: val, skip: 0 });
          toggleModals("exp");
        }}
        currentValue={filters?.minimumExperience || null}
      />

<DistanceSelectModal
        modal={distanceModal}
        handleApply={(val) => {
          setFilters({ ...filters, distance: val[1], skip: 0 });
          toggleModals("distance");
        }}
        toggle={() => toggleModals("distance")}
        currentValue={filters?.distance || null}
        rightSideDisabled={true}  
      />
      <FacilityTypeFilterModal
      modal={facilityTypeModal}
      toggle={() => toggleModals("facility")}
      handleApply={(val) => {
        setFilters({ ...filters, facilityType: val, skip: 0 });
        toggleModals("facility");
      }}
      currentValue={filters?.facilityType || null}
      />
    </>
  );
}
