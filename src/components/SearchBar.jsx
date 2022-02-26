import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { API } from '../backend';
import useAuth from '../hooks/useAuth';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function SearchBar() {
  const [searchInput, setSearchInput] = useState(''); // for input field
  const [searchtext, setSearchtext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const navigate = useNavigate();
  const { user } = useAuth();
  const setTimeoutIdRef = useRef();
  const controllerRef = useRef();

  useEffect(() => {
    if (searchtext) {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      fetchQuery(searchtext);
    }
  }, [searchtext]);

  const fetchQuery = async (param) => {
    try {
      controllerRef.current = new AbortController();
      setIsLoading(true);
      const response = await axios.get(`${API}/search/recipe?name=${param}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          auth: user.userId,
          'Content-Type': 'application/json',
        },
        signal: controllerRef.current.signal,
      });
      setSearchResults(response.data);
    } catch (err) {
      console.error(handleHttpErrorResp(err));
    } finally {
      setIsLoading(false);
    }
  };

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
    if (setTimeoutIdRef.current) {
      clearTimeout(setTimeoutIdRef.current);
    }
    setTimeoutIdRef.current = setTimeout(() => {
      setSearchtext(e.target.value);
    }, 1500);
  };

  const submithandler = () => {
    setSearchtext(searchInput);
  };

  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const keyUpHandler = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (
        selectedResultIndex < 0 ||
        selectedResultIndex === searchResults.length - 1
      ) {
        setSelectedResultIndex(0);
      } else {
        setSelectedResultIndex(selectedResultIndex + 1);
      }
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (selectedResultIndex <= 0) {
        setSelectedResultIndex(searchResults.length - 1);
      } else {
        setSelectedResultIndex(selectedResultIndex - 1);
      }
      return;
    }

    if (e.key === 'Enter') {
      if (selectedResultIndex < 0) {
        setSearchtext(searchInput);
      } else {
        showRecipe(searchResults[selectedResultIndex]._id);
      }
      return;
    }

    if (e.key === 'Escape') {
      setSearchtext('');
    }
    setSelectedResultIndex(-1);
    setSearchResults([]);
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
      <ul className="absolute z-10 lg:w-2/5 md:w-2/3 w-full top-12 rounded-sm shadow-xl bg-white flex flex-col">
        {isLoading ? (
          <li>loading results...</li>
        ) : (
          searchResults.map((searchresult, index) => (
            <li
              key={index}
              onClick={() => showRecipe(searchresult._id)}
              className={`px-4 py-2 text-left text-slate-700 hover:bg-slate-300 ${
                selectedResultIndex === index ? 'bg-slate-300' : ''
              }`}
            >
              {searchresult.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default SearchBar;
