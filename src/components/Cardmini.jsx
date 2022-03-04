import { DateTime } from 'luxon';
import React from 'react';
import { MdOutlineAccessTime } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Cardmini({ recipe }) {
  return (
    <div className="flex gap-1 bg-white text-gray-700 rounded-md hover:shadow-lg ">
      <img
        src={recipe?.photo.thumbnail}
        alt="thumb-recipe"
        className="object-cover w-20 h-fit rounded-l-md"
      />
      <div className="card-body-mini text-xs font-extralight py-1 ">
        <div>
          <h3 className="text-sm font-normal">{recipe?.name}</h3>
          <p className="flex items-center gap-1">
            <MdOutlineAccessTime className="font-extralight " />
            {DateTime.fromISO(recipe?.createdAt).toRelative()}
          </p>
        </div>
        <div className="flex gap-5 mt-3">
          <p
            className={`border-l-4 pl-2 ${
              recipe?.type === 'veg' ? 'border-green-700' : 'border-fuchsia-500'
            }`}
          >
            {recipe?.type}
          </p>
          <p className="border-l-4 pl-2 border-fuchsia-500">{recipe?.course}</p>
        </div>
      </div>
    </div>
  );
}

export default Cardmini;
