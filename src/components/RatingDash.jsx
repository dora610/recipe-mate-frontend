import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import RatingBar from './RatingBar';

function RatingDash({ ratings }) {
  let ratingConsolidate = ratings.reduce(
    (prev, next) => {
      let totalRating = prev._id * prev.count + next._id * next.count;
      let totalCount = prev.count + next.count;
      let avgRating = Math.trunc((totalRating / totalCount) * 100) / 100;
      return { _id: avgRating, count: totalCount };
    },
    { _id: 0, count: 0 }
  );

  const ratingColor = (point) => {
    switch (Math.trunc(point)) {
      case 5:
        return 'text-green-700';
      case 4:
        return 'text-lime-700';
      case 3:
        return 'text-amber-600';
      case 2:
        return 'text-orange-700';
      case 1:
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex gap-6 my-4">
      <div>
        <h1
          className={`text-6xl font-semibold ${ratingColor(
            ratingConsolidate._id
          )}`}
        >
          {ratingConsolidate._id}
        </h1>
        <div className="flex items-center justify-between text-fuchsia-600 mt-3">
          <FaRegStar className="text-sm" />
          <p className="text-sm font-extralight">
            {ratingConsolidate.count} ratings
          </p>
        </div>
        {/* <StarRatingDisplay avgRating={ratingConsolidate.count} /> */}
      </div>
      <RatingBar ratings={ratings} totalCount={ratingConsolidate.count} />
    </div>
  );
}

export default RatingDash;
