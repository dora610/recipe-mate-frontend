import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { API } from '../backend';
import useAuth from '../hooks/useAuth';
import useSearchQuery from '../hooks/useSearchQuery';
import handleHttpErrorResp from '../utils/handleErrorResponse';
import Loader from './Loader';

function SearchBar() {
  const {
    keyUpHandler,
    searchInput,
    inputHandler,
    submithandler,
    searchResults,
    showRecipe,
    isLoading,
    selectedResultIndex,
  } = useSearchQuery();

  return (
    <div
      className="flex flex-col justify-start items-center my-4 relative"
      onKeyUp={keyUpHandler}
    >
      <div className="flex items-center text-lg font-light text-slate-700 border-4 border-white/50 backdrop-blur-lg rounded-lg shadow-lg lg:w-2/5 md:w-2/3 w-full">
        <input
          type="search"
          name="content"
          id="content"
          className="border-2 border-white/50 h-full rounded-l-md w-full focus:outline-none focus:ring-0 focus:ring-fuchsia-500 focus:border-fuchsia-500"
          value={searchInput}
          onChange={inputHandler}
        />
        <button
          onClick={submithandler}
          type="submit"
          className=" bg-fuchsia-600 text-white font-semibold px-3 py-3 rounded-r-md flex justify-center items-center active:bg-fuchsia-700"
        >
          <MdSearch />
        </button>
      </div>

      <Loader isLoading={isLoading} />
      {!isLoading && (
        <ul className="absolute z-10 lg:w-2/5 md:w-2/3 w-full top-12 rounded-sm shadow-xl bg-white flex flex-col">
          {searchResults.map((searchresult, index) => (
            <li
              key={index}
              onClick={() => showRecipe(searchresult._id)}
              className={`px-4 py-2 text-left text-slate-700 hover:bg-slate-300 ${
                selectedResultIndex === index ? 'bg-slate-300' : ''
              }`}
            >
              {searchresult.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
