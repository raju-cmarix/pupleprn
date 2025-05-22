import { BigStar } from "assets/svg";
import React from "react";
import { getDateFormat } from "utils/Utils";
import { NO_RATINGS, SmallLogoURL } from "constants/AppConstants";
const RatingCard = (props) => {
  const role = localStorage.getItem("userRole");

  let reviewBy;

  if (role === "admin") {
    reviewBy =
      props?.data?.reviewBy?.roles === "facility"
        ? props?.data?.reviewBy?.facilityId?.officeName
        : `${props?.data?.reviewBy?.firstName}  ${props?.data?.reviewBy?.lastName}`;
  } else {
    reviewBy =
      props?.data?.reviewBy?.roles === "facility"
        ? props?.data?.reviewBy?.facilityId?.officeName &&
          props?.data?.reviewBy?.facilityId?.officeName?.split(" ")[0]
        : props?.data?.reviewBy?.firstName;
  }

  return (
    <div className="card">
      <h3>
        <span>
          <img
            src={props?.data?.reviewBy?.profileImageUrl || SmallLogoURL}
            alt="Facility profile"
          />
          {/* <ReviewIconImg /> */}
        </span>
        {reviewBy || "DJonathan D."}
      </h3>
      <p>{props?.data?.review}</p>
      <div className="card-btm">
        <div className="reviewrating">
          <span>
            <BigStar />
          </span>
          {props?.data?.rating ? (
            <>{props?.data?.rating || 0}/5</>
          ) : (
            <>{NO_RATINGS}</>
          )}
        </div>
        <div className="reviewdate">
          {getDateFormat(props?.data?.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
