import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Loader from '../components/Loader';

function Home() {
  let recipeUrl = `recipe/all?page=1`;
  let [{ data, isLoading, error }, doFetch] = useFetchData(recipeUrl, []);

  let recipes = data.recipes ?? [];

  if (error) {
    return <h3 className="error-card">{error}</h3>;
  }

  if (isLoading) {
    return (
      <div className="relative text-center">
        <Loader isLoading={isLoading} />
      </div>
    );
  }

  return (
    <>
      <Hero />
      <div className="p-2 sm:mx-6 grid grid-cols-cards gap-4 items-center">
        {recipes.map((recipe, index) => (
          <Card key={index} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

export default Home;
