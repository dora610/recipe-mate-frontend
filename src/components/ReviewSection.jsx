import React from 'react';
import CommentBox from './CommentBox';

function ReviewSection({ reviews }) {
  return (
    <div className="reviews bg-fuchsia-50/50 rounded-lg shadow-lg">
      <h4 className="text-fuchsia-700 py-2 pl-4 text-xl font-semibold rounded-t-lg">
        Most recent reviews
      </h4>
      <div className=" flex flex-col space-y-1 px-2 py-2">
        {reviews.map((review, index) => (
          <React.Fragment key={index}>
            <CommentBox review={review} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;
