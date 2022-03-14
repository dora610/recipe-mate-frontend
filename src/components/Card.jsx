import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { MdOutlineAccessTime } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../backend';
import useAuth from '../hooks/useAuth';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function Card({ recipe }) {
  const { user } = useAuth();
  const [isSavedRecipe, setIsSavedRecipe] = useState(
    recipe.savedby.includes(user?.userId)
  );

  const saveRecipeHandler = () => {
    setIsSavedRecipe(!isSavedRecipe);
    axios
      .put(
        `${API}/recipe/savedrecipes/${recipe._id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['jwt']}`,
            auth: user.userId,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.status);
      })
      .catch((err) => toast.error(handleHttpErrorResp(err)));
  };

  return (
    <div className="card sm:w-64">
      <div className="card-image">
        <img
          src={recipe?.photo?.square}
          alt="recipe img"
          className="object-cover w-full rounded-t-md"
        />
      </div>
      <div className="card-body pb-6 relative">
        <div className="card-title flex justify-between gap-2 h-10 mb-4 items-center">
          <Link to={`/recipe/${recipe?._id}`}>{recipe?.name}</Link>

          <div className="badge-outline">
            <FaStar className="fill-yellow-700" />
            <p className="">{recipe.rating > 0 ? recipe.rating : '--'}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <MdOutlineAccessTime className="fill-slate-600 text-sm" />
          <h6 className="font-extralight text-xs text-slate-700">
            {DateTime.fromISO(recipe?.createdAt).toRelative()}
          </h6>
        </div>

        <div className="card-sub-titile text-base font-normal text-slate-800">
          {recipe?.createdBy?.fullName}
        </div>

        <div className="card-text text-slate-700">
          <p className="border-l-4 pl-2 border-fuchsia-500">
            {recipe?.preparationTime} mins to prepare
          </p>

          <p className="border-l-4 pl-2 border-fuchsia-500">
            {recipe?.cookTime} mins to cook
          </p>
        </div>

        <div className="card-footer flex gap-1 flex-wrap mt-4">
          {recipe?.type === 'veg' && (
            <p className={`badge ${'bg-green-700'}`}>{recipe?.type}</p>
          )}

          <p className="badge">{recipe?.course}</p>
        </div>

        {recipe.createdBy._id !== user?.userId && (
          <button
            className="absolute -top-7 right-4"
            onClick={saveRecipeHandler}
          >
            {isSavedRecipe ? (
              <HiBookmark className="fill-purple-800 text-2xl" />
            ) : (
              <HiOutlineBookmark className="stroke-purple-700 text-2xl" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
