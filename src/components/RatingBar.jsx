import React from 'react';

function RatingBar({ ratings, totalCount }) {
  let ratingsArr = new Array(5).fill('0');

  ratings.forEach(
    ({ _id, count }) =>
      (ratingsArr[_id - 1] = Math.round((count / totalCount) * 100).toString())
  );

  return (
    <div className="grid grid-cols-[1fr_7fr] grid-rows-5 gap-2 justify-center items-center">
      {ratingsArr.reverse().map((fracCnt, index) => (
        <React.Fragment key={index}>
          <p className="text-xs leading-3 text-fuchsia-800">{5 - index} ☆</p>
          <div className="bg-fuchsia-300 relative w-full h-2 rounded-r-xl">
            <div
              className={`bg-fuchsia-600 h-2 w-[${fracCnt}%] absolute rounded-r-xl opacity-100`}
            ></div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default RatingBar;
