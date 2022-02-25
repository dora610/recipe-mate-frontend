import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const navigate = useNavigate();

  const submithandler = (e) => {
    e.preventDefault();
    console.log('search clicked');
  };

  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const keyUpHandler = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (
        selectedResultIndex < 0 ||
        selectedResultIndex === searchResult.length - 1
      ) {
        setSelectedResultIndex(0);
      } else {
        setSelectedResultIndex(selectedResultIndex + 1);
      }
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (selectedResultIndex <= 0) {
        setSelectedResultIndex(searchResult.length - 1);
      } else {
        setSelectedResultIndex(selectedResultIndex - 1);
      }
    }

    if (e.key === 'Enter') {
      console.log(searchResult[selectedResultIndex]);
      // showRecipe() <= pass recipe id here
    }

    if (e.key === 'Escape') {
      setSearchResult([]);
    }
  };

  const clickhandler = (id) => {
    // showRecipe(id) <= pass recipe id here
  };

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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={submithandler}
          type="submit"
          className=" bg-fuchsia-600 text-white font-semibold px-3 py-3 rounded-r-md flex justify-center items-center active:bg-fuchsia-700"
        >
          <MdSearch />
        </button>
      </div>
      <ul className="absolute z-10 w-3/5 top-12 rounded-sm shadow-xl bg-white flex flex-col">
        {searchResult.length > 0 &&
          searchResult.map((res, index) => (
            <li
              key={index}
              onClick={() => clickhandler(index)}
              className={`px-4 py-2 text-left text-slate-700 hover:bg-slate-300 ${
                selectedResultIndex === index ? 'bg-slate-300' : ''
              }`}
            >
              {res}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchBar;
