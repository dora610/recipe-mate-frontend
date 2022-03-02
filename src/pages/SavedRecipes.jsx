import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { API } from '../backend';
import Card from '../components/Card';
import Loader from '../components/Loader';
import useFetchData from '../hooks/useFetchData';

function SavedRecipes() {
  const [{ data, isLoading, error }] = useFetchData(
    `${API}/recipe/saved/all?page=1`,
    { recipes: [] }
  );

  let recipes = data.recipes;

  if (isLoading) {
    return (
      <div className="relative text-center">
        <Loader isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="flex justify-center">
          <h3 className="error-card text-center">{error}</h3>
        </div>
      )}
      {recipes.length === 0 && (
        <div className="flex justify-center">
          <h3 className="error-card text-center">No saved recipe found</h3>
        </div>
      )}

      <div className="p-2 sm:mx-6 grid grid-cols-cards gap-4 items-center">
        {recipes.length > 0 &&
          recipes.map((recipe, index) => <Card key={index} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default SavedRecipes;
