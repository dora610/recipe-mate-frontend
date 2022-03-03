import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import '../asset/StarRatingForm.css';
import { API } from '../backend';
import { useModal } from '../context/modalContext';
import useAuth from '../hooks/useAuth';
import reviewReducer from '../reducers/reviewReducer';
import handleHttpErrorResp from '../utils/handleErrorResponse';

const useReviewForm = () => {
  const initialState = {
    rating: 0,
    comments: '',
    isLoading: false,
    error: null,
    success: null,
    ratingsCount: [],
    reviews: [],
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);
  const [recipeId, setRecipeId] = useState(null);
  const { closeModalHandler } = useModal();
  const { user } = useAuth();
  const url = `${API}/review`;

  useEffect(() => {
    if (recipeId) {
      fetchReviews();
    }
  }, [recipeId]);

  const handleInputChange = (e) => {
    dispatch({ type: 'set_rating', payload: e.target.value });
  };
  const handleCommentChange = (e) => {
    dispatch({ type: 'set_comments', payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'submit_init' });
      const response = await axios({
        url: url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwt}`,
          auth: user.userId,
        },
        params: {
          recipe: recipeId,
        },
        data: {
          rating: state.rating,
          comments: state.comments,
        },
      });
      dispatch({ type: 'submit_success', payload: response.data.status });
      closeModalHandler();
      fetchReviews();
    } catch (err) {
      dispatch({ type: 'submit_failure', payload: handleHttpErrorResp(err) });
    }
  };

  const fetchReviews = async () => {
    try {
      dispatch({ type: 'submit_init' });
      const response = await axios({
        url: url,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwt}`,
          auth: user.userId,
        },
        params: {
          recipe: recipeId,
        },
      });
      dispatch({ type: 'fetch_success', payload: response.data });
    } catch (error) {
      dispatch({ type: 'submit_failure', payload: handleHttpErrorResp(error) });
    }
  };

  let formHandlers = { handleInputChange, handleCommentChange, handleSubmit };

  return [state, formHandlers, setRecipeId];
};

export default useReviewForm;
