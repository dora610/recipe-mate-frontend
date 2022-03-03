import React from 'react';
import { API } from '../backend';
import useFetchData from '../hooks/useFetchData';
import Cardmini from './Cardmini';
import Loader from './Loader';

function SideWindow({ authorId, fullName }) {
  const [{ data, isLoading, error }] = useFetchData(
    `${API}/recipe?user=${authorId}`,
    []
  );

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (error) {
    return <h3 className="error-card">{error}</h3>;
  }

  return (
    <div className="reviews bg-fuchsia-50/50 rounded-md shadow-lg">
      <h4 className="bg-fuchsia-50/50 text-fuchsia-900 py-2 pl-4 text-lg font-semibold rounded-t-md">
        More from {fullName}
      </h4>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-2 px-2 py-2">
        {data.map((recipe, index) => (
          <React.Fragment key={index}>
            <Cardmini recipe={recipe} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SideWindow;
