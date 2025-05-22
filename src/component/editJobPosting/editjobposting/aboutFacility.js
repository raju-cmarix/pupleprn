import { convertArrayToString } from "utils/Utils";

function AboutFacility({ data, editable }) {
  const aboutFacilityFormatted = data?.jobAddressAbout?.replace(/\n/g, "<br>");
  return (
    <>
      <div className="general-content">
        {data.facilityPicUrl &&
          data.facilityPicUrl.length > 0 &&
          data.status !== "confirmed" && (
            <div className="general-detail aboutfacility-photo">
              <h3>Facility photos</h3>
              <div className="facility-images">
                <div className="img">
                  {data.facilityPicUrl.map((pic) => {
                    return (
                      <img
                        src={pic}
                        className="facilityimg"
                        alt="AboutFacility1"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        {data && data.status !== "confirmed" && (
          <>
            <div className="general-detail aboutfacility">
              <ul>
                <li>
                  <span>Number of clinicians currently at this facility: </span>
                  {data.numberOfClinicians || "0"}
                </li>
                <li>
                  <span>Type(s) of patients: </span>
                  {convertArrayToString(
                    data?.patientsType?.map(
                      (e) => e.charAt(0).toUpperCase() + e.slice(1),
                    ),
                  )}
                </li>
                <li>
                  <span>What EMR do you use? </span>
                  {data.emrList}
                </li>
              </ul>
            </div>
            <div className="general-detail general-dress">
              <ul>
                <li>
                  <span>Dress code: </span>
                  {convertArrayToString(
                    data?.dressCode?.filter((a) => a !== "Other") || [],
                  )}
                </li>

                <li>
                  <span>What is the parking situation? </span>
                  {data.parkingSituation || "-"}
                </li>
              </ul>
            </div>
            <div className="general-detail general-dress">
              <ul>
                <li>
                  <span>Facility description: </span>
                  <p
                    dangerouslySetInnerHTML={{ __html: aboutFacilityFormatted }}
                  />
                </li>
              </ul>
            </div>
          </>
        )}

        {data.officeName && data.status === "confirmed" && (
          <>
            <div className="general-detail aboutfacility">
              <ul>
                <li>
                  <span>Facility Name: </span>
                  {data?.facilityId?.officeName}
                </li>
                <li>
                  <span>Location: </span>
                  {data.primaryAddress.nickname
                    ? `${data.primaryAddress.nickname} - `
                    : ""}
                  {[
                    data.primaryAddress.address1,
                    data.primaryAddress.address2,
                    data.primaryAddress.city,
                    data.primaryAddress.state,
                    data.primaryAddress.zipCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </li>
              </ul>
            </div>
            <div className="general-detail aboutfacility">
              <ul>
                <li>
                  <span>Primary Contact: </span>
                  {`${data?.primaryFirstName} ${data?.primaryLastName}`}
                </li>
                <li>
                  <span>Contact Number: </span>
                  {data?.primaryPhone}
                </li>
              </ul>
            </div>
            <div className="general-detail aboutfacility">
              <ul>
                <li>
                  <span>After Hours Contact: </span>
                  {data?.afterHoursName}
                </li>
                <li>
                  <span>After Hours Contact Phone #: </span>
                  {data?.afterHoursPhone}
                </li>
              </ul>
            </div>
            <div className="general-detail aboutfacility">
              <ul>
                <li>
                  <span>Office Admin or Receptionist: </span>
                  {data?.frontOfficePersonName}
                </li>
                <li>
                  <span>Office Admin or Receptionist Phone #: </span>
                  {data?.frontOfficePersonPhone}
                </li>
              </ul>
            </div>
            <div className="general-detail aboutfacility">
              <ul>
                <li>
                  <span>Dress Code: </span>
                  {convertArrayToString(
                    data?.dressCode?.filter((a) => a !== "Other") || [],
                  )}
                </li>
                <li>
                  <span>EMR: </span>
                  {data?.emrList}
                </li>
                <li>
                  <span>Number Of patients seen per hour: </span>
                  {data?.patientsSeenPerHour}
                </li>
              </ul>
            </div>
            <div className="general-detail aboutfacility">
              <ul>
                <li>
                  <span>Check in Location: </span>
                  {data?.checkInPlaceForFirstDay}
                </li>
                <li>
                  <span>Parking Situation: </span>
                  {data?.parkingSituation || "-"}
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AboutFacility;
