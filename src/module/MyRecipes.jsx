import React from 'react';
import { API } from '../backend';
import RecipeCollections from '../components/RecipeCollections';
import useAuth from '../hooks/useAuth';

function MyRecipes() {
  const { user } = useAuth();
  const url = `${API}/recipe?user=${user.userId}`;

  return (
    <div>
      <div className='flex items-center gap-2 mb-2 ml-4'>
        <h3 className='text-fuchsia-200 text-xl font-semibold underline'>
          My Recipes:
        </h3>
      </div>

      <RecipeCollections fetchUrl={url} />
    </div>
  );
}

export default MyRecipes;
