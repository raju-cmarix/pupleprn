import DatesLabel from "component/common/DatesLabelCard";
import FormButton from "component/common/FormButton";
import { CONFIRMED, SmallLogoURL } from "constants/AppConstants";
import { Link } from "react-router-dom";
import "./jobBoard.scss";

function JobCard({
  jobId,
  data,
  mainTitle,
  dateTime,
  rating,
  review,
  handleNPINumber,
  loader,
  facilityNickName,
  timeZone,
}) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <img
            src={data?.jobAddressPic || SmallLogoURL}
            alt={"Facility Profile"}
          />
          <div>
            <h2>{mainTitle}</h2>
            <h4>{data?.facilityOfficeName}</h4>
            <h4>{facilityNickName}</h4>
          </div>
          <span>{data.clinicianType}</span>
        </div>
        <ul>
          <li>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Shift #{data.jobSerialNumber}
            </span>
          </li>
          <li>
            <span>Date & Time: </span>
            <DatesLabel
              arr={dateTime}
              timeZone={timeZone}
              jobId={jobId}
            />
          </li>
          <li>
            {!CONFIRMED?.includes(data?.status) ? (
              <span>Zipcode: </span>
            ) : (
              <span>Location: </span>
            )}
            {data.zipCode}
          </li>
          <li>
            <span>Distance from home: </span>
            {Math.round(data.distance)} mi
          </li>
        </ul>
        <div className="card-footer">
          {/* <div className="review">
            <Star />{' '}
            <h3>
              {rating ? `${rating}/5` : ""} <span>{review}</span>
            </h3>
          </div> */}
          <div className="d-flex gap-1 align-items-end">
            <h3 className="">Hourly Rate: </h3>
            <div className="rate">
              <h3 className="d-block">
                {/* if there is admin hourly or main hourly rate is higher than old hourly rate  */}
                {data?.adminHourlyRate &&
                data?.adminHourlyRate > data?.hourlyRate ? (
                  <>
                    <div
                      className="admin-rate"
                      style={{ color: "red" }}>
                      ${data?.adminHourlyRate}!
                    </div>
                    <div className="rate-container">
                      <div
                        className="strikethrough"
                        style={{
                          textDecoration: "line-through 2px solid red",
                        }}>
                        ${data?.hourlyRate}
                      </div>
                    </div>
                  </>
                ) : data?.oldHourlyRate &&
                  data?.hourlyRate > data?.oldHourlyRate ? (
                  <>
                    <div
                      className="admin-rate"
                      style={{ color: "red" }}>
                      ${data?.hourlyRate}!
                    </div>
                    <div className="rate-container">
                      <div
                        className="strikethrough"
                        style={{
                          textDecoration: "line-through 2px solid red",
                        }}>
                        ${data?.oldHourlyRate}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rate-container">
                    <div>${data?.hourlyRate}</div>
                  </div>
                )}
              </h3>
            </div>
          </div>
        </div>
        <div className="card-btn">
          <Link
            to={`/clinician/jobprofile/${jobId}`}
            className="btn-secondary pt-btn">
            View details
          </Link>

          <FormButton
            className="btn-primary pt-btn"
            type={"button"}
            label={"Apply"}
            loader={loader}
            onClick={() => {
              handleNPINumber(data);
              // handleApplyCallback(data);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default JobCard;
