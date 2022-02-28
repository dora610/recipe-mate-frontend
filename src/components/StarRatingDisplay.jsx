import React from 'react';
import '../asset/StarRatingDisplay.css';

function StarRatingDisplay({ avgRating }) {
  let ratingRound = Math.round(avgRating);
  let ratingArr = new Array(5).fill('star-fill');
  ratingArr[ratingRound - 1] = 'star-fill checked';

  return (
    <div className="rating-block">
      {ratingArr.reverse().map((ele, index) => (
        <React.Fragment key={index}>
          <span className={ele}></span>
          <span className="star-outline">☆</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default StarRatingDisplay;
