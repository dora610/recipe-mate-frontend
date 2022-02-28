import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Modal from '../components/Modal';

function Home() {
  let recipeUrl = `recipe/all?page=1`;
  let [{ data, isLoading, error }, doFetch] = useFetchData(recipeUrl, []);

  let recipes = data.recipes ?? [];
  let ratings = data.ratings ?? [];

  ratings = ratings.reduce((acc, currRating) => {
    acc[currRating._id] = currRating.rating;
    return acc;
  }, {});

  if (isLoading) {
    <h3 className="text-warn">Loading...</h3>;
  }

  if (error) {
    <h3 className="error-card">{error}</h3>;
  }

  return (
    <>
      <Hero />
      <div className="p-2 sm:mx-6 grid grid-cols-cards gap-4 items-center">
        {recipes.map((recipe, index) => (
          <Card key={index} recipe={recipe} rating={ratings[recipe._id]} />
        ))}
      </div>
    </>
  );
}

export default Home;
