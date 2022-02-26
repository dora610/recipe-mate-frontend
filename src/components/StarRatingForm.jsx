import React, { useState } from 'react';
import '../asset/StarRatingForm.css';

function StarRatingForm() {
  const [starRating, setStarRating] = useState();

  const handleInputChange = (e) => {
    setStarRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="ratings">
      <div className="rating-block">
        <input
          type="radio"
          name="rating"
          id="5"
          value="5"
          checked={starRating == 5}
          onChange={handleInputChange}
        />
        <label htmlFor="5">☆</label>
        <input
          type="radio"
          name="rating"
          id="4"
          value="4"
          checked={starRating == 4}
          onChange={handleInputChange}
        />
        <label htmlFor="4">☆</label>
        <input
          type="radio"
          name="rating"
          id="3"
          value="3"
          checked={starRating == 3}
          onChange={handleInputChange}
        />
        <label htmlFor="3">☆</label>
        <input
          type="radio"
          name="rating"
          id="2"
          value="2"
          checked={starRating == 2}
          onChange={handleInputChange}
        />
        <label htmlFor="2">☆</label>
        <input
          type="radio"
          name="rating"
          id="1"
          value="1"
          checked={starRating == 1}
          onChange={handleInputChange}
        />
        <label htmlFor="1">☆</label>
      </div>
      <button className="btn-mini px-4" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default StarRatingForm;
