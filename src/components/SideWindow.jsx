import React from 'react';
import EventCard from './admin/EventCard';
import Loader from './Loader';

function SideWindow() {
  let [{ data, isLoading, error }, doFetch] = useFetchData(
    'recipe/all?page=1',
    []
  );

  let recipes = data.recipes ?? [];

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (error) {
    <h3 className="error-card">{error}</h3>;
  }

  return (
    <div className="reviews bg-fuchsia-50/50 rounded-lg">
      <h4 className="bg-fuchsia-300 text-stone-900 py-2 pl-4 text-lg font-semibold rounded-t-lg">
        Recently added
      </h4>

      {!isLoading && (
        <div className=" flex flex-col space-y-1 px-2 py-2">
          <EventCard />
        </div>
      )}
    </div>
  );
}

export default SideWindow;
