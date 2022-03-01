import React from 'react';
import StarRatingDisplay from './StarRatingDisplay';
import { DateTime } from 'luxon';

// TODO: pass props
function CommentBox({ review, author }) {
  return (
    <div className="comment-box bg-white text-gray-700 px-4 py-4 flex flex-col gap-2 rounded-lg text-sm hover:shadow-lg">
      <div>
        <h6 className="text-base font-semibold">
          {author?.firstName} {author?.lastName}
        </h6>
        <StarRatingDisplay avgRating={review.rating} />
        <div className="flex text-xs font-thin text-slate-500">
          <p>
            {DateTime.fromISO(review?.updatedAt).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </p>
          <p>{review?.updatedAt !== review?.createdAt && 'edited'}</p>
        </div>
      </div>
      <hr />
      <p className="text-base">{review.comments}</p>
    </div>
  );
}

export default CommentBox;
