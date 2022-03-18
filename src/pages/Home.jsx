import React from 'react';
import { Outlet } from 'react-router-dom';
import Hero from '../components/Hero';

function Home() {
  return (
    <div className='relative'>
      <Hero />

      <Outlet />

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
