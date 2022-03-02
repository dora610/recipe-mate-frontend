import axios from 'axios';
import { useReducer, useState } from 'react';
import '../asset/StarRatingForm.css';
import { API } from '../backend';
import useAuth from '../hooks/useAuth';
import reviewReducer from '../reducers/reviewReducer';
import handleHttpErrorResp from '../utils/handleErrorResponse';

const useReviewForm = (recipeId) => {
  const initialState = {
    rating: 0,
    comments: '',
    isLoading: false,
    error: null,
    success: null,
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);
  const { user } = useAuth();

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
        url: `${API}/review`,
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
      dispatch({ type: 'submit_success', payload: response.data });
    } catch (err) {
      dispatch({ type: 'submit_failure', payload: handleHttpErrorResp(err) });
    }
  };

  return [state, handleInputChange, handleCommentChange, handleSubmit];
};

export default useReviewForm;
