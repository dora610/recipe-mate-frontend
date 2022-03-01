import React from 'react';
import useFetchData from '../hooks/useFetchData';
import Cardmini from './Cardmini';
import Loader from './Loader';

function SideWindow({ authorId, fullName }) {
  let [{ data, isLoading, error }] = useFetchData(
    `recipe?user=${authorId}`,
    []
  );

  let recipes = data.recipeList ?? [];

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (error) {
    return <h3 className="error-card">{error}</h3>;
  }

  return (
    <div className="reviews bg-fuchsia-50/50 rounded-md shadow-lg">
      <h4 className="bg-fuchsia-300 text-stone-900 py-2 pl-4 text-lg font-semibold rounded-t-md">
        More from {fullName}
      </h4>

      <div className=" flex flex-col space-y-1 px-2 py-2">
        {recipes.map((recipe, index) => (
          <React.Fragment key={index}>
            <Cardmini recipe={recipe} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SideWindow;
