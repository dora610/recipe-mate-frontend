import { useEffect, useReducer, useState } from 'react';
import {
  FETCH_FAILURE,
  FETCH_INIT,
  FETCH_SUCCESS,
} from '../context/actions.types';
import dataFetchReducer from '../context/dataFetchReducer';
import useAuth from './useAuth';
import { API } from '../backend';
import { toast } from 'react-toastify';
import axios from 'axios';
import handleHttpErrorResp from '../utils/handleErrorResponse';

const useFetchData = (initialUrl = '', initialData = []) => {
  const [url, setUrl] = useState(`${API}/${initialUrl}`);

  const initialState = {
    isLoading: false,
    error: null,
    data: initialData,
  };

  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const { user, isUserAuthenticated } = useAuth();

  useEffect(() => {
    const source = axios.CancelToken.source();
    let didCancel = false;

    const getDataFromApi = async (url) => {
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
          cancelToken: source.cancel(),
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
            toast.error(handleHttpErrorResp(err));
          }
        }
      }
    };

    if (isUserAuthenticated()) {
      getDataFromApi(url);
    } else {
      dispatch({ type: FETCH_FAILURE, payload: 'User is not authenticated' });
    }

    return () => {
      didCancel = true;
      source.cancel('Operation canceled by the user.');
    };
  }, [url]);

  return [state, setUrl];
};

export default useFetchData;
