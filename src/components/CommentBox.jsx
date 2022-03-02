import React from 'react';
import StarRatingDisplay from './StarRatingDisplay';
import { DateTime } from 'luxon';
import { MdOutlineAccessTime } from 'react-icons/md';

function CommentBox({ review }) {
  return (
    <div className="comment-box bg-white text-gray-700 px-4 py-4 flex flex-col gap-2 rounded-lg text-sm hover:shadow-lg">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <h6 className="text-base font-semibold">
            {review?.author?.firstName} {review?.author?.lastName}
          </h6>
          <StarRatingDisplay avgRating={review?.rating} />
        </div>
        <div className="flex text-xs font-thin text-slate-500">
          <div className="flex items-center gap-1">
            <MdOutlineAccessTime />
            <p>{DateTime.fromISO(review?.updatedAt).toRelative()}</p>
          </div>
          <p>{review?.updatedAt !== review?.createdAt && 'edited'}</p>
        </div>
      </div>
      <hr />
      <p className="text-base">{review?.comments}</p>
    </div>
  );
}

export default CommentBox;
