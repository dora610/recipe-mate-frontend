import React from 'react';
import { API } from '../backend';
import { HiTrendingUp } from 'react-icons/hi';
import RecipeCollections from '../components/RecipeCollections';

function TrendingSection() {
  const url = `${API}/recipe/all`;

  return (
    <div>
      <div className='flex items-center gap-2 mb-2 ml-4'>
        <HiTrendingUp className='text-2xl fill-fuchsia-200' />
        <h3 className='text-fuchsia-200 text-xl font-semibold underline'>
          Trending
        </h3>
      </div>

      <RecipeCollections fetchUrl={url} />
    </div>
  );
}

export default TrendingSection;
