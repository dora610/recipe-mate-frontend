import React from 'react';
import { useModal } from '../context/modalContext';
import Modal from './Modal';
import RatingBar from './RatingBar';
import StarRatingForm from './StarRatingForm';

function RatingDash({ ratings }) {
  const { openModalhandler } = useModal();

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
    <div className="bg-fuchsia-50/50 px-6 py-4 rounded-lg hover:shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-700">User reviews</h2>
      <div className="flex gap-6 my-4 justify-start">
        <div>
          <h1
            className={`text-6xl font-semibold ${ratingColor(
              ratingConsolidate._id
            )}`}
          >
            {ratingConsolidate._id}
          </h1>
          <h5 className="text-sm font-extralight text-fuchsia-600 text-center mt-4">
            {ratingConsolidate.count} ratings submitted
          </h5>
          {/* <StarRatingDisplay avgRating={ratingConsolidate.count} /> */}
        </div>
        <RatingBar ratings={ratings} totalCount={ratingConsolidate.count} />
      </div>
      <button className="btn-primary px-4 mt-4" onClick={openModalhandler}>
        Submit review
      </button>
    </div>
  );
}

export default RatingDash;
