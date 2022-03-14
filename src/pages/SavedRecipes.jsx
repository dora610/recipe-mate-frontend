import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { API } from '../backend';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import useFetchData from '../hooks/useFetchData';
import usePagination from '../hooks/usePagination';

function SavedRecipes() {
  const [{ data, isLoading, error }, setUrl] = useFetchData(
    `${API}/recipe/saved/all?page=1`,
    { recipes: [] }
  );

  const [currPage, pageCount, prevPage, nextpage] = usePagination(
    data.count,
    setUrl
  );

  let recipes = data.recipes;

  if (isLoading) {
    return (
      <div className="relative text-center flex justify-center">
        <Loader isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div>
      {error ? (
        <div className="flex justify-center">
          <h3 className="error-card text-center">{error}</h3>
        </div>
      ) : (
        recipes.length === 0 && (
          <div className="flex justify-center">
            <h3 className="error-card text-center">No saved recipe found</h3>
          </div>
        )
      )}

      <div className="p-2 sm:mx-6 grid grid-cols-cards gap-4 items-center">
        {recipes.length > 0 &&
          recipes.map((recipe, index) => <Card key={index} recipe={recipe} />)}
      </div>

      <Pagination
        currPage={currPage}
        pageCount={pageCount}
        prevPage={prevPage}
        nextpage={nextpage}
      />
    </div>
  );
}

export default SavedRecipes;
