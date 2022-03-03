import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { API } from '../backend';

function Home() {
  const [{ data, isLoading, error }] = useFetchData(
    `${API}/recipe/all?page=1`,
    { recipes: [], count: 0 }
  );

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
    <div className="relative">
      <Hero />
      <div className="p-2 sm:mx-6 grid grid-cols-cards gap-4 justify-center justify-items-center">
        {data.recipes.map((recipe, index) => (
          <Card key={index} recipe={recipe} />
        ))}
      </div>

      <Link to="/recipe/addRecipe">
        <button className="rounded-full px-5 py-5 sticky z-20 bottom-5 right-0 mr-5 ml-auto mb-2 bg-fuchsia-200 hover:bg-fuchsia-300 active:bg-fuchsia-400 active:text-white group hover:py-4 flex items-center gap-2 justify-between">
          <p className="hidden group-hover:inline-block pb-2">Add recipe</p>
          <MdAdd className="text-xl" />
        </button>
      </Link>
    </div>
  );
}

export default Home;
