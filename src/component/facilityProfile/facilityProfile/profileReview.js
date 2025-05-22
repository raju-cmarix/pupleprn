import React from "react";
import CustomPagination from "../../common/customPagination";
import RatingCard from "component/clinicianJobProfile/clinicianJobProfile/RatingCard";
import { NOREVIEWS } from "constants/AppConstants";

function ReviewProfile(props) {
  const ratings = props?.ratings?.data;
  return (
    <>
      <div className="general-content review-content">
        <div className="review-cards">
          {ratings && ratings.length > 0 ? (
            <>
              {ratings.map((e, i) => (
                <RatingCard key={i} data={e} />
              ))}
            </>
          ) : (
            <p>{NOREVIEWS}</p>
          )}
          <CustomPagination
            type={"review"}
            count={props.count}
            filters={props?.filters}
            setFilters={props?.setFilters}
          />
        </div>
      </div>
    </>
  );
}

export default ReviewProfile;
