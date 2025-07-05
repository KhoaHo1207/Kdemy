import React, { useEffect, useState } from "react";

const Rating = ({ initalRating, onRate }) => {
  const [ratings, setRatings] = useState(initalRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const handleRating = (value) => {
    setRatings(value);
    if (onRate) {
      onRate(value);
    }
  };

  useEffect(() => {
    if (initalRating) {
      setRatings(initalRating);
    }
  }, [initalRating]);
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= (hoverRating || ratings)
                ? "text-yellow-400"
                : "text-gray-400"
            } hover:text-yellow-500`}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
