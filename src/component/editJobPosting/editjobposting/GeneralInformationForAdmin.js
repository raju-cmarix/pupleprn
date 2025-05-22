import DatesLabel from "component/common/NewDatesLabel";
import EditClinicianTypeModalForAdmin from "component/modals/EditClinicianTypeModalForAdmin";
import EditDateTimeModalForAdmin from "component/modals/EditDateTimeModalForAdmin";
import EditFacilityTypeModalForAdmin from "component/modals/EditFacilityTypeModalForAdmin";
import EditLocationModalForAdmin from "component/modals/EditLocationModalForAdmin";
import EditMinimumExperienceModalForAdmin from "component/modals/EditMinimumExperienceModalForAdmin";
import EditPayModalForAdmin from "component/modals/EditPayModalForAdmin";
import {
  CLINICIAN_TYPE_LABELS,
  CONFIRMED,
  FACILITY_TYPE_LABELS,
  YearsOfPracticeString,
} from "constants/AppConstants";
import { useContext, useState } from "react";
import UserContext from "utils/context/UserContext";
import { getLocation } from "utils/Utils";
import { state } from "views/authentication/signUpClinician/HourlyConstant";
import { Pencil } from "../../../assets/svg";

function GeneralInformationForAdmin({
  data,
  editable,
  getData,
  officeAddress,
}) {
  const [payModal, setPayModal] = useState(false);
  const [editDMModal, setEditDMModal] = useState(false);
  const [editMinimumExperienceModal, setEditMinimumExperienceModal] =
    useState(false);
  const [editClinicianTypeModal, setEditClinicianTypeModal] = useState(false);
  const [editFacilityTypeModal, setEditFacilityTypeModal] = useState(false);
  const [editLocationModal, setEditLocationModal] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <div className="general-content">
      <div className="general-detail">
        <ul>
          <li>
            <span>Date & Time:</span>
            <DatesLabel
              arr={data.jobSlots}
              timeZone={data.timeZone}
            />
            {user.roles !== 'subadmin' && editable && (
              <span
                className="pencilicon"
                onClick={() => setEditDMModal(!editDMModal)}>
                <Pencil />
              </span>
            )}
          </li>
          {data?.applicantSlots && data?.applicantSlots?.length > 0 && (
            <li>
              <span>Proposed Date & Time: </span>
              <DatesLabel
                arr={data.applicantSlots}
                timeZone={data.timeZone}
              />
            </li>
          )}
          <li>
            {!user?.facilityId ? (
              <>
                {!CONFIRMED?.includes(data?.status) ? (
                  <>
                    <span>Address: </span>
                    {data?.jobAddress1} {data?.jobAddress2},{" "}
                    {data?.city ? data.city : ""}{" "}
                    {state.find((item) => item.value === data.state)?.stateCode}{" "}
                    {data.zipCode}
                  </>
                ) : (
                  <>
                    <span>Location: </span>
                    {getLocation(data, officeAddress || false) ||
                      data?.officeAddressZipCode}
                  </>
                )}
              </>
            ) : (
              <>
                <span>Location: </span>
                {getLocation(data, officeAddress || false) ||
                  data?.officeAddressZipCode}
              </>
            )}

            {user.roles !== 'subadmin' && editable && (
              <span
                className="pencilicon"
                onClick={() => setEditLocationModal(!editLocationModal)}>
                <Pencil />
              </span>
            )}
          </li>
          <li>
            <span>Type of Facility:</span>{" "}
            {FACILITY_TYPE_LABELS.get(data.facilityType) || data.facilityType}
            {user.roles !== 'subadmin' && editable && (
              <span
                className="pencilicon"
                onClick={() =>
                  setEditFacilityTypeModal(!editFacilityTypeModal)
                }>
                <Pencil />
              </span>
            )}
          </li>
          <li className="flex-wrap">
            <span>Hourly Rate:</span> ${data.hourlyRate}
            {user.roles !== 'subadmin' && editable && (
              <span
                className="pencilicon"
                onClick={() => setPayModal(!payModal)}>
                <Pencil />
              </span>
            )}
            {/* <div
              className="includes">
              {LUNCH_BREAK(
              clinician
                ? data?.applicantSlots || data?.jobSlots
                : data?.jobSlots,
              true
            )}</div> */}
          </li>
          <li>
            <span>Clinician type:</span>{" "}
            {CLINICIAN_TYPE_LABELS.get(data.clinicianType) ??
              data.clinicianType}
            {user.roles !== 'subadmin' && editable && (
              <span
                className="pencilicon"
                onClick={() =>
                  setEditClinicianTypeModal(!editClinicianTypeModal)
                }>
                <Pencil />
              </span>
            )}
          </li>
          <li>
            <span>{YearsOfPracticeString}:</span> {data.minimumExperince}
            {user.roles !== 'subadmin' && editable && (
              <span
                className="pencilicon"
                onClick={() =>
                  setEditMinimumExperienceModal(!editMinimumExperienceModal)
                }>
                <Pencil />
              </span>
            )}
          </li>
        </ul>
      </div>

      <EditPayModalForAdmin
        modal={payModal}
        toggle={() => setPayModal(!payModal)}
        data={data}
        callbackFn={() => {
          setPayModal(!payModal);
          getData();
        }}
      />

      <EditDateTimeModalForAdmin
        modal={editDMModal}
        toggle={() => setEditDMModal(!editDMModal)}
        data={data}
        callbackFn={() => {
          setEditDMModal(!editDMModal);
          getData();
        }}
      />
      <EditFacilityTypeModalForAdmin
        modal={editFacilityTypeModal}
        toggle={() => setEditFacilityTypeModal(!editFacilityTypeModal)}
        data={data}
        callbackFn={() => {
          setEditFacilityTypeModal(!editFacilityTypeModal);
          getData();
        }}
      />
      <EditLocationModalForAdmin
        modal={editLocationModal}
        toggle={() => setEditLocationModal(!editLocationModal)}
        data={data}
        callbackFn={() => {
          setEditLocationModal(!editLocationModal);
          getData();
        }}
      />
      <EditClinicianTypeModalForAdmin
        modal={editClinicianTypeModal}
        toggle={() => setEditClinicianTypeModal(!editClinicianTypeModal)}
        data={data}
        callbackFn={() => {
          setEditClinicianTypeModal(!editClinicianTypeModal);
          getData();
        }}
      />
      <EditMinimumExperienceModalForAdmin
        modal={editMinimumExperienceModal}
        toggle={() =>
          setEditMinimumExperienceModal(!editMinimumExperienceModal)
        }
        data={data}
        callbackFn={() => {
          setEditMinimumExperienceModal(!editMinimumExperienceModal);
          getData();
        }}
      />
    </div>
  );
}

export default GeneralInformationForAdmin;
