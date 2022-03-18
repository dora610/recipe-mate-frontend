import React from 'react';
import { HiBookmark } from 'react-icons/hi';
import { API } from '../backend';
import RecipeCollections from '../components/RecipeCollections';

function SavedRecipes() {
  const url = `${API}/recipe/saved/all`;

  return (
    <>
      <div className='flex items-center gap-2 mb-2 ml-4'>
        <HiBookmark className='text-2xl fill-fuchsia-200' />
        <h3 className='text-fuchsia-200 text-xl font-semibold underline'>
          Saved recipes
        </h3>
      </div>

      <RecipeCollections fetchUrl={url} />
    </>
  );
}

export default SavedRecipes;
