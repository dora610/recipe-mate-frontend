import { DateTime } from 'luxon';
import React from 'react';
import { MdOutlineAccessTime } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Cardmini({ recipe }) {
  return (
    <div className="flex gap-2 bg-white text-gray-700 rounded-md hover:shadow-lg ">
      <img
        src={recipe?.photo.thumbnail}
        alt="thumb-recipe"
        className="object-cover w-20 h-fit rounded-l-md"
      />
      <div className="card-body-mini text-mini font-extralight py-1">
        <div>
          <h3 className="text-lg font-light">{recipe?.name}</h3>
          <p className="flex items-center gap-1 text-xs font-thin">
            <MdOutlineAccessTime className="font-extralight " />
            {DateTime.fromISO(recipe?.createdAt).toRelative()}
          </p>
        </div>
        <div className="flex mt-1 divide-x-2 divide-fuchsia-400">
          <p
            className={`pr-1 ${
              recipe?.type === 'veg' ? 'text-green-700' : 'text-fuchsia-500'
            }`}
          >
            {recipe?.type}
          </p>
          <p className="text-fuchsia-500 pl-1">{recipe?.course}</p>
        </div>
      </div>
    </div>
  );
}

export default Cardmini;
