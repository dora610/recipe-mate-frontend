import React, { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import useFetchData from '../hooks/useFetchData';
import NotFound from './NotFound';
import IngrComponent from '../components/IngrComponent';
import StepsComponent from '../components/StepsComponent';
import { FaRegStar } from 'react-icons/fa';
import recipeContext from '../context/recipeContext';
import { MODIFY_RECIPE } from '../context/actions.types';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import { API } from '../backend';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function ShowRecipe() {
  const [isDescMinimized, setIsDescMinimized] = useState(true);
  const params = useParams();
  const [state, dispatch] = useContext(recipeContext);
  const navigate = useNavigate();
  let { user } = useAuth();

  if (!params.recipeId) {
    return <NotFound />;
  }
  let [{ data, isLoading, error }, setUrl] = useFetchData(
    `recipe/${params.recipeId}`,
    null
  );

  let recipe = data?.recipe;

  if (error) {
    return <NotFound />;
  }

  const textEllipsisClass = 'overflow-x-hidden whitespace-nowrap text-ellipsis';

  const showDesc = () => {
    setIsDescMinimized(!isDescMinimized);
  };

  const updateRecipeHandler = () => {
    dispatch({ type: MODIFY_RECIPE, payload: data.recipe });
    navigate('/recipe/updateRecipe', { state: { from: 'showRecipe' } });
  };

  const deleteRecipeHandler = async () => {
    try {
      let response = await axios({
        url: `${API}/recipe/${params.recipeId}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user['jwt']}`,
          auth: user.userId,
        },
      });
      toast.success(response.data.status);
      navigate('/');
    } catch (err) {
      toast.error(handleHttpErrorResp(err));
    }
  };

  return (
    <div className="grid place-items-center">
      {isLoading ? (
        <h3 className="text-warn">Loading...</h3>
      ) : error ? (
        <h3 className="error-card">{error}</h3>
      ) : (
        <>
          <div className="content md:grid gap-4 mx-auto px-4 py-4 bg-white bg-opacity-70 backdrop-blur-2xl shadow-lg rounded-xl md:w-5/6 md:grid-cols-2 lg:w-[950px] flex flex-col w-11/12 justify-center text-slate-800 my-6">
            <div className="recipe-image flex flex-col gap-4 justify-start">
              <img
                src={recipe?.photo?.square || recipe?.photo?.secure_url}
                alt="recipe img"
                className="object-cover md:h-96 w-full h-64 rounded-md shadow-lg"
              />
              <IngrComponent
                title={'Ingredients:'}
                contentList={recipe?.ingredients}
              />
            </div>

            <div className="flex flex-col justify-start md:items-start items-start px-2">
              {user && recipe && user._id === recipe.createdBy._id && (
                <div className="flex gap-1 justify-end">
                  <button onClick={updateRecipeHandler} className="btn-mini">
                    <FiEdit3 />
                  </button>
                  <button onClick={deleteRecipeHandler} className="btn-mini">
                    <MdDeleteOutline />
                  </button>
                </div>
              )}
              <h6 className="font-extralight text-xs">
                {DateTime.fromISO(recipe?.updatedAt).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </h6>

              <h1 className="text-heading my-4">{recipe?.name}</h1>

              <h3 className="text-sub-heading text-slate-600">
                {recipe?.createdBy?.fullName}
              </h3>

              <div className="text-mini flex gap-3 justify-evenly items-center my-2">
                <FaRegStar />
                {recipe?.rating > 0 ? recipe?.rating : '--'}
              </div>

              <div className="grid grid-cols-2 w-full text-primary mt-6">
                <p>
                  <span className="text-primary-bold">Prep time: </span>
                  {recipe?.preparationTime} mins
                </p>
                <p>
                  <span className="text-primary-bold">Cook time: </span>
                  {recipe?.cookTime} mins
                </p>
                <p>
                  <span className="text-primary-bold">Type: </span>
                  {recipe?.type}
                </p>
                <p>
                  <span className="text-primary-bold">Course: </span>
                  {recipe?.course}
                </p>
              </div>

              <div className="w-full leading-3 my-6">
                <p
                  className={`recipe-desc text-primary capitalize ${
                    isDescMinimized ? textEllipsisClass : ''
                  }`}
                >
                  <span className="text-primary-bold">Description: </span>
                  {recipe?.description}
                </p>
                <button className="text-xs text-stone-600" onClick={showDesc}>
                  {isDescMinimized ? 'show more' : 'show less'}
                </button>
              </div>

              <StepsComponent
                title={'Steps:'}
                stepsList={recipe?.steps}
                className="w-full"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowRecipe;
