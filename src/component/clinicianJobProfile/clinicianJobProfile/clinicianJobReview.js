import React from "react";
import CustomPagination from "../../common/customPagination";
import RatingCard from "./RatingCard";
import { NOREVIEWS } from "constants/AppConstants";

function EditJobReview(props) {
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
        </div>
      </div>
      <CustomPagination
        type={"review"}
        count={props.count}
        filters={props?.filters}
        setFilters={props?.setFilters}
      />
    </>
  );
}

export default EditJobReview;
