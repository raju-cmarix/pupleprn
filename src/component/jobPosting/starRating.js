import { CURSORPOINTER } from "constants/AppConstants";
import React, { useState } from "react";
import { StarRating1Icon, StarRatingIcon } from "../../assets/svg";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            onClick={() => setRating(rating === index ? 0 : index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            style={CURSORPOINTER}
          >
            {index <= (hover || rating) ? (
              <StarRatingIcon />
            ) : (
              <StarRating1Icon />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
