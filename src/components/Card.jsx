import axios from 'axios';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../backend';
import useAuth from '../hooks/useAuth';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function Card({ recipe }) {
  const { user } = useAuth();
  const [isSavedRecipe, setIsSavedRecipe] = useState(
    recipe.savedby.includes(user.userId)
  );
  const saveRecipeHandler = () => {
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
        setIsSavedRecipe(!isSavedRecipe);
        toast.success(res.data.status);
      })
      .catch((err) => toast.error(handleHttpErrorResp(err)));
  };

  return (
    <div className="card relative">
      <div className="card-image">
        <img
          src={recipe?.photo?.square}
          alt="recipe img"
          className="object-cover w-full rounded-md"
        />
      </div>
      <div className="card-body pb-6">
        <div className="card-title flex justify-between gap-2 h-10 mb-4 items-center">
          <Link to={`/recipe/${recipe?._id}`}>{recipe?.name}</Link>
          <div className="badge">
            <FaStar className="fill-yellow-400" />
            <p className="">{recipe?.rating > 0 ? recipe?.rating : '--'}</p>
          </div>
        </div>

        <div className="card-sub-titile text-sm font-normal text-slate-800">
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
      </div>
      {recipe.createdBy._id !== user.userId && (
        <button
          className="absolute top-0 right-4 bg-white bg-opacity-50 rounded-sm"
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
  );
}

export default Card;
