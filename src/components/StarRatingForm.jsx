import axios from 'axios';
import React, { useReducer } from 'react';
import '../asset/StarRatingForm.css';
import { API } from '../backend';
import useAuth from '../hooks/useAuth';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function StarRatingForm({
  state,
  formHandlers: { handleInputChange, handleCommentChange, handleSubmit },
}) {
  if (state.isLoading) {
    return (
      <div className="text-warn">
        <p>Loading...</p>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="text-success">
        <p>{state.success.status}</p>
      </div>
    );
  }

  return (
    <>
      {state.error && (
        <div className="text-danger">
          <p>{state.error}</p>
        </div>
      )}
      <h2 className="text-lg font-bold">Want to rate this recipe?</h2>
      <p>Please submit your rating</p>
      <form className="ratings" onSubmit={handleSubmit}>
        <div className="rating-block">
          <input
            type="radio"
            name="rating"
            id="5"
            value="5"
            checked={state.rating == 5}
            onChange={handleInputChange}
          />
          <label htmlFor="5">☆</label>
          <input
            type="radio"
            name="rating"
            id="4"
            value="4"
            checked={state.rating == 4}
            onChange={handleInputChange}
          />
          <label htmlFor="4">☆</label>
          <input
            type="radio"
            name="rating"
            id="3"
            value="3"
            checked={state.rating == 3}
            onChange={handleInputChange}
          />
          <label htmlFor="3">☆</label>
          <input
            type="radio"
            name="rating"
            id="2"
            value="2"
            checked={state.rating == 2}
            onChange={handleInputChange}
          />
          <label htmlFor="2">☆</label>
          <input
            type="radio"
            name="rating"
            id="1"
            value="1"
            checked={state.rating == 1}
            onChange={handleInputChange}
          />
          <label htmlFor="1">☆</label>
        </div>
        <label htmlFor="comments" className="text-lg font-semibold">
          Leave a comment
        </label>
        <textarea
          name="comments"
          id="comments"
          cols="30"
          rows="3"
          className="col-span-3 px-4 py-2 my-3 rounded-lg border-stone-200 bg-fuchsia-50 hover:bg-stone-100/50 hover:border-fuchsia-200 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500"
          value={state.comments}
          onChange={handleCommentChange}
        ></textarea>
        {(function () {
          let btnLable = state.isLoading ? 'in progress...' : 'Submit';
          return (
            <button
              type="submit"
              disabled={state.isLoading}
              className="btn-primary w-1/3 disabled:bg-yellow-500"
            >
              {btnLable}
            </button>
          );
        })()}
      </form>
    </>
  );
}

export default StarRatingForm;
