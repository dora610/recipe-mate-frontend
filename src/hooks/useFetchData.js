import { useEffect, useReducer, useState } from 'react';
import {
  FETCH_FAILURE,
  FETCH_INIT,
  FETCH_SUCCESS,
} from '../context/actions.types';
import dataFetchReducer from '../context/dataFetchReducer';
import useAuth from './useAuth';
import axios from 'axios';
import handleHttpErrorResp from '../utils/handleErrorResponse';

const useFetchData = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const initialState = {
    isLoading: false,
    error: null,
    data: initialData,
  };

  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const { user, isUserAuthenticated } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    let didCancel = false;

    const getDataFromApi = async () => {
      try {
        dispatch({ type: FETCH_INIT });

        const response = await axios({
          url,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['jwt']}`,
            auth: user.userId,
          },
          signal: controller.signal,
        });
        if (!didCancel) {
          dispatch({ type: FETCH_SUCCESS, payload: response.data });
        }
      } catch (err) {
        if (!didCancel) {
          if (axios.isCancel(err)) {
            dispatch({
              type: FETCH_FAILURE,
              payload: `Request cancelled- ${err.message}`,
            });
          } else {
            dispatch({
              type: FETCH_FAILURE,
              payload: handleHttpErrorResp(err),
            });
          }
        }
      }
    };

    if (isUserAuthenticated() && url) {
      getDataFromApi();
    } else {
      dispatch({ type: FETCH_FAILURE, payload: 'User is not authenticated' });
    }

    return () => {
      didCancel = true;
      controller.abort();
    };
  }, [url]);

  return [state, setUrl];
};

export default useFetchData;
