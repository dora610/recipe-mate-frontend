import React from 'react';
import CommentBox from './CommentBox';

function ReviewSection({ reviews }) {
  return (
    <div className="reviews bg-fuchsia-50/50 rounded-lg">
      <h4 className="bg-fuchsia-200 text-stone-900 py-2 pl-4 text-lg font-semibold rounded-t-lg">
        Most recent reviews
      </h4>
      <div className=" flex flex-col space-y-1 px-2 py-2">
        {reviews.map(({ review, author }, index) => (
          <React.Fragment key={index}>
            <CommentBox review={review} author={author} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;
