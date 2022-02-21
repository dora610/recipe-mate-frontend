import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { API } from '../backend';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card';

function Home() {
  let recipeUrl = `recipe/all?page=1`;

  let [{ data, isLoading, error }, doFetch] = useFetchData(recipeUrl, []);

  if (isLoading) {
    <h3 className="text-warn">Loading...</h3>;
  }

  if (error) {
    <h3 className="error-card">{error}</h3>;
  }

  return (
    <div className="">
      <Hero />

      <div className="jumbotron"></div>
      <div className="p-2 sm:mx-6 grid grid-cols-cards gap-4 items-center">
        {data.recipes &&
          data.recipes.map((recipe, index) => (
            <Card key={index} recipe={recipe} />
          ))}
      </div>
    </div>
  );
}

export default Home;
