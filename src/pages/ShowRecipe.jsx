import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useContext, useEffect } from 'react';
import { MdOutlineAccessTime } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../backend';
import IngrComponent from '../components/IngrComponent';
import Loader from '../components/Loader';
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
import useReviewForm from '../hooks/useReviewForm';
import handleHttpErrorResp from '../utils/handleErrorResponse';
import NotFound from './NotFound';

function ShowRecipe() {
  const params = useParams();
  const [dispatch] = useContext(recipeContext);
  const navigate = useNavigate();
  let { user } = useAuth();

  if (!params.recipeId) {
    return <NotFound />;
  }
  const [{ data: recipe, isLoading, error }, fetchRecipe] = useFetchData(
    null,
    {}
  );
  const [reviewState, formHandlers, setRecipeId] = useReviewForm();

  useEffect(() => {
    fetchRecipe(`${API}/recipe/${params.recipeId}`);
    setRecipeId(params.recipeId);
  }, [params.recipeId]);

  if (error) {
    return <NotFound />;
  }

  const updateRecipeHandler = () => {
    dispatch({ type: MODIFY_RECIPE, payload: recipe });
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
    <div className="bg-white bg-opacity-80 backdrop-blur-2xl py-8 px-3">
      {isLoading ? (
        <div className="relative text-center flex justify-center">
          <Loader isLoading={isLoading} />
        </div>
      ) : error ? (
        <h3 className="error-card">{error}</h3>
      ) : (
        <div className="sm:grid flex flex-col lg:grid-cols-[2fr_3fr_1fr] gap-4 sm:grid-cols-[2fr_3fr] sm:grid-rows-[1fr_auto] text-slate-800">
          <div className="recipe-image flex justify-center p-2">
            <img
              src={recipe?.photo?.square || recipe?.photo?.secure_url}
              alt="recipe img"
              className="object-cover h-fit rounded-md shadow-lg"
            />
          </div>

          <div className="flex flex-col gap-3 justify-start items-start p-2">
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
            {/* {user && recipe && user._id === recipe?.createdBy?._id && (
              <div className="flex gap-1 justify-end">
                <button onClick={updateRecipeHandler} className="btn-mini">
                  <FiEdit3 />
                </button>
                <button onClick={deleteRecipeHandler} className="btn-mini">
                  <MdDeleteOutline />
                </button>
              </div>
            )} */}

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

            {
              <p className="recipe-desc text-primary capitalize leading-7 mt-2">
                <span className="text-primary-bold">Description: </span>
                {recipe?.description}
              </p>
            }

            <IngrComponent
              title={'Ingredients:'}
              contentList={recipe?.ingredients}
            />
          </div>

          <div className="col-span-2 justify-items-start">
            <StepsComponent
              title={'Steps:'}
              stepsList={recipe?.steps}
              className="w-full"
            />
          </div>

          {recipe?.createdBy?._id && (
            <div className="mt-8 col-span-2 lg:row-start-1 lg:col-start-3 lg:col-end-3 lg:row-span-2 ">
              <SideWindow
                authorId={recipe?.createdBy?._id}
                fullName={recipe?.createdBy?.fullName}
              />
            </div>
          )}
        </div>
      )}

      {reviewState.isLoading ? (
        <div className="relative text-center flex justify-center">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <div className="mt-10 flex gap-6 lg:flex-row flex-col items-center lg:items-start">
          <div className="w-max-[24rem] lg:w-[35rem]">
            <RatingDash ratings={reviewState.ratingsCount} />
          </div>
          <div className="review section w-full">
            <ReviewSection reviews={reviewState.reviews} />
          </div>
        </div>
      )}

      <Modal>
        <StarRatingForm state={reviewState} formHandlers={formHandlers} />
      </Modal>
    </div>
  );
}

export default ShowRecipe;
