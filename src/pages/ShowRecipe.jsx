import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useContext, useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteOutline, MdOutlineAccessTime } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../backend';
import IngrComponent from '../components/IngrComponent';
import Modal from '../components/Modal';
import RatingDash from '../components/RatingDash';
import ReviewSection from '../components/ReviewSection';
import SideWindow from '../components/SideWindow';
import StarRatingForm from '../components/StarRatingForm';
import StepsComponent from '../components/StepsComponent';
import { MODIFY_RECIPE } from '../context/actions.types';
import recipeContext from '../context/recipeContext';
import useAuth from '../hooks/useAuth';
import useFetchData from '../hooks/useFetchData';
import handleHttpErrorResp from '../utils/handleErrorResponse';
import NotFound from './NotFound';

function ShowRecipe() {
  const [isDescMinimized, setIsDescMinimized] = useState(true);
  const params = useParams();
  const [dispatch] = useContext(recipeContext);
  const navigate = useNavigate();
  let { user } = useAuth();

  if (!params.recipeId) {
    return <NotFound />;
  }
  let [{ data, isLoading, error }, doFetch] = useFetchData(null, {
    recipe: null,
    ratings: [],
    reviews: [],
  });

  useEffect(() => {
    doFetch(`${API}/recipe/${params.recipeId}`);
  }, [params.recipeId]);

  let { recipe, ratings, reviews } = data;

  if (error) {
    return <NotFound />;
  }

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
    <div className="bg-white bg-opacity-80 backdrop-blur-2xl grid grid-cols-[4fr_1fr]">
      {isLoading ? (
        <h3 className="text-warn">Loading...</h3>
      ) : error ? (
        <h3 className="error-card">{error}</h3>
      ) : (
        <div className="content py-8 px-4">
          <div className="sub-content grid grid-cols-[2fr_3fr] grid-rows-[1fr_auto] gap-4 text-slate-800 ">
            <div className="recipe-image flex justify-center">
              <img
                src={recipe?.photo?.square || recipe?.photo?.secure_url}
                alt="recipe img"
                className=" object-cover w-11/12 min-w-[24rem] h-fit rounded-md shadow-lg"
              />
            </div>

            <div className="flex flex-col gap-3 justify-start items-start">
              <h1 className="text-heading">{recipe?.name}</h1>
              <h3 className="text-sub-heading text-slate-600">
                {recipe?.createdBy?.fullName}
              </h3>
              <div className="flex items-center gap-2">
                <MdOutlineAccessTime />
                <h6 className="font-extralight text-sm">
                  {DateTime.fromISO(recipe?.createdAt).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </h6>
              </div>
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

              <div className="grid grid-cols-2 w-full text-primary">
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

              <p className="recipe-desc text-primary capitalize leading-3 mt-2">
                <span className="text-primary-bold">Description: </span>
                {recipe?.description}
              </p>

              <IngrComponent
                title={'Ingredients:'}
                contentList={recipe?.ingredients}
              />

              <StepsComponent
                title={'Steps:'}
                stepsList={recipe?.steps}
                className="w-full"
              />
            </div>

            <div className="justify-self-center w-96">
              <RatingDash ratings={ratings} />
            </div>

            <div className="review section">
              <ReviewSection reviews={reviews} />
            </div>
          </div>
        </div>
      )}

      {recipe?.createdBy?._id && (
        <div className="mt-8 mx-2">
          <SideWindow
            authorId={recipe?.createdBy._id}
            fullName={recipe?.createdBy?.fullName}
          />
        </div>
      )}

      <Modal>
        <StarRatingForm recipeId={recipe?._id} />
      </Modal>
    </div>
  );
}

export default ShowRecipe;
