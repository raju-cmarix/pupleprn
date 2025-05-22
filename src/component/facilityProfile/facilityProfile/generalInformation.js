import { NOT_SUBMIT, REFERENCEBY } from "constants/AppConstants";
import dayjs from "dayjs";
import { convertServerDateToDate, getDateFormat } from "utils/Utils";
const inYears = "(years)";

function GeneralInformation({ data, admin }) {
  return (
    <>
      <div className="general-content">
        <div className="first-block">
          <div className="day-time-lang">
            {data.facilityExperience.length > 0 && (
              <div className="days-time">
                <h3>Facility Experience {inYears}</h3>
                <ul>
                  {data?.facilityExperience?.every(
                    (fac) => !fac.isAvailable,
                  ) ? (
                    <>-</>
                  ) : (
                    data?.facilityExperience?.map((fac) => {
                      if (fac.isAvailable) {
                        return (
                          <li>
                            {fac.day}: {fac.startTime} year
                            {fac.startTime > 1 && "s"}
                          </li>
                        );
                      }
                    })
                  )}
                </ul>
              </div>
            )}

            {data.patientExperience.length > 0 && (
              <div className="days-time">
                <h3>Patient Experience {inYears}</h3>
                <ul>
                  {data?.patientExperience?.every((pat) => !pat.isAvailable) ? (
                    <>-</>
                  ) : (
                    data.patientExperience.map((pat) => {
                      if (pat.isAvailable) {
                        return (
                          <li>
                            {pat.day}: {pat.startTime} year
                            {pat.startTime > 1 && "s"}
                          </li>
                        );
                      }
                    })
                  )}
                </ul>
              </div>
            )}

            <div className="lang">
              <h3>Languages</h3>
              <ul>
                {data.knownLanuages.map((language) => {
                  return <li>{language}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="block">
          <h3>Education</h3>
          <ul>
            <li>
              {data.educationSchool} ({data.graduationYear})
            </li>
          </ul>
        </div>

        {data.certificationDetails &&
          data.certificationDetails.length > 0 &&
          data.certificationDetails[0].name && (
            <div className="block">
              <h3>Certification</h3>
              <ul>
                {data.certificationDetails.map((certi) => {
                  return (
                    <>
                      {certi?.name && certi?.receivedYear && (
                        <li>
                          {certi.name} ({certi.receivedYear})
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>
          )}

        {data.specialityDetails &&
          data.specialityDetails.length > 0 &&
          data.specialityDetails[0].name && (
            <div className="block">
              <h3>Specialties</h3>
              <ul>
                {data.specialityDetails.map((spe) => {
                  return (
                    <li>
                      {spe.name} ({spe.receivedYear})
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

        {data.cprExpiryDate || data.tbTestExpiryDate || data.covidStatus ? (
          <div className="block">
            <h3>Medical tests</h3>
            <ul>
              {data.covidStatus && <li>Covid: {data.covidStatus}</li>}
              {data.cprExpiryDate && (
                <li>
                  CPR:{" "}
                  {getDateFormat(
                    convertServerDateToDate(data.cprExpiryDate),
                    "MMM YYYY",
                  )}
                </li>
              )}
              {data.isTbTest && (
                <li>
                  TB:{" "}
                  {getDateFormat(
                    convertServerDateToDate(data.tbTestExpiryDate),
                    "MMM YYYY",
                  )}
                </li>
              )}
            </ul>
          </div>
        ) : (
          <></>
        )}

        {data.facilityCertificates && data.facilityCertificates?.length > 0 && (
          <div className="block">
            <h3>Facility Certificates</h3>
            <ul>
              {data.facilityCertificates.map((fc) => (
                <li>{fc}</li>
              ))}
            </ul>
          </div>
        )}

        {/* {admin ? (
          <div className="block">
            <h3>{REFERENCEBY}</h3>
            <ul>
              <li>{data.referenceBy}</li>
            </ul>
          </div>
        ) : (
          <></>
        )} */}
        <div className="block">
          <h3>NPI and Licenses</h3>
          <ul>
            <li>NPI Number: {data?.npiNumber || "NA"}</li>
            <li>
              Licenses:{" "}
              {data.licenseDetails && data.licenseDetails?.length ? (
                data.licenseDetails.map((lic, index) => (
                  <span key={index}>
                  {lic?.licenseNumber || "NA"} | {lic?.state || "NA"}
                </span>
                ))
              ) : (
                <>-</>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default GeneralInformation;
