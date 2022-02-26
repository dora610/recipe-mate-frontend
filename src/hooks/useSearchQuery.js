import axios from 'axios';
import { useEffect, useReducer, useRef, useState } from 'react';
import handleHttpErrorResp from '../utils/handleErrorResponse';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { API } from '../backend';

function useSearchQuery() {
  const [searchInput, setSearchInput] = useState('');
  const [searchtext, setSearchtext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const navigate = useNavigate();
  const { user } = useAuth();
  const setTimeoutIdRef = useRef(0);
  const controllerRef = useRef();

  useEffect(() => {
    let controller = new AbortController();
    const fetchQuery = async (param) => {
      try {
        setIsLoading(true);
        console.log('fetch started ', param);
        const response = await axios.get(`${API}/search/recipe?name=${param}`, {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            auth: user.userId,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });
        setSearchResults(response.data);
        setIsLoading(false);
        console.log('fetch success ', param);
      } catch (err) {
        console.error(handleHttpErrorResp(err));
        // setIsLoading(false); // once the fetch aborted, it's disabling loading of new fetch loading
        console.log('fetch err ', param);
      }
    };

    if (searchtext) {
      fetchQuery(searchtext);
    }

    return () => {
      clearTimeout(setTimeoutIdRef);
      controller.abort();
    };
  }, [searchtext]);

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
    clearTimeout(setTimeoutIdRef.current);
    setTimeoutIdRef.current = setTimeout(() => {
      setSearchtext(e.target.value);
    }, 1000);
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

  return {
    keyUpHandler,
    searchInput,
    inputHandler,
    submithandler,
    searchResults,
    showRecipe,
    isLoading,
    selectedResultIndex,
  };
}

export default useSearchQuery;
