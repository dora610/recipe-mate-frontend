import React from 'react';
import Card from './Card';
import Loader from './Loader';
import Pagination from './Pagination';
import useFetchData from '../hooks/useFetchData';
import usePagination from '../hooks/usePagination';

function RecipeCollections({ fetchUrl }) {
  let paginationUrl = `${fetchUrl}${
    fetchUrl.includes('?') ? '&page=' : '?page='
  }`;

  const [{ data, isLoading, error }, setUrl] = useFetchData(fetchUrl, {
    recipes: [],
    count: 0,
  });
  const [currPage, pageCount, prevPage, nextpage, changePage] = usePagination(
    data.count,
    setUrl,
    paginationUrl
  );

  if (error) {
    return <h3 className='error-card'>{error}</h3>;
  }

  return (
    <div>
      {isLoading ? (
        <div className='relative text-center flex justify-center'>
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <>
          <div className='p-2 mb-4 mx-1 flex gap-3 flex-wrap justify-center'>
            {data.recipes.map((recipe, index) => (
              <Card key={index} recipe={recipe} />
            ))}
          </div>

          <Pagination
            currPage={currPage}
            pageCount={pageCount}
            prevPage={prevPage}
            nextpage={nextpage}
            changePage={changePage}
          />
        </>
      )}
    </div>
  );
}

export default RecipeCollections;
