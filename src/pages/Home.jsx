import React from 'react';
import { HiTrendingUp } from 'react-icons/hi';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { API } from '../backend';
import Card from '../components/Card';
import Hero from '../components/Hero';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import useFetchData from '../hooks/useFetchData';
import usePagination from '../hooks/usePagination';

function Home() {
  const [{ data, isLoading, error }, setUrl] = useFetchData(
    `${API}/recipe/all?page=1`,
    { recipes: [], count: 0 }
  );
  const [currPage, pageCount, prevPage, nextpage] = usePagination(
    data.count,
    setUrl
  );

  if (error) {
    return <h3 className="error-card">{error}</h3>;
  }

  if (isLoading) {
    return (
      <div className="relative text-center flex justify-center">
        <Loader isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="relative">
      <Hero />

      <div className="flex items-center sm:mx-6 gap-2">
        <HiTrendingUp className="text-xl fill-fuchsia-200" />
        <h3 className="text-fuchsia-200 text-xl font-semibold">Trending: </h3>
      </div>

      <div className="p-2 mb-4 sm:mx-6 flex gap-3 flex-wrap justify-center">
        {data.recipes.map((recipe, index) => (
          <Card key={index} recipe={recipe} />
        ))}
      </div>

      <Pagination
        currPage={currPage}
        pageCount={pageCount}
        prevPage={prevPage}
        nextpage={nextpage}
      />

      {/* TODO: button alignment should be on right */}
      {/* <button className="rounded-full px-5 py-5 sticky z-30 bottom-5 right-0 mr-5 ml-auto mb-2 bg-fuchsia-200 hover:bg-fuchsia-300 active:bg-fuchsia-400 active:text-white group hover:py-4 ">
        <Link
          to="/recipe/addRecipe"
          className="flex items-center gap-2 justify-between"
        >
          <p className="hidden group-hover:inline-block pb-2">Add recipe</p>
          <MdAdd className="text-xl" />
        </Link>
      </button> */}
    </div>
  );
}

export default Home;
