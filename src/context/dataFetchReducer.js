import {
  FETCH_FAILURE,
  FETCH_INIT,
  FETCH_RECIPE_SUCCESS,
  FETCH_SUCCESS,
  FETCH_USER_SUCCESS,
} from './actions.types';

function dataReducer(state, action) {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case FETCH_USER_SUCCESS:
      return { ...state, isLoading: false, userData: action.payload };
    case FETCH_RECIPE_SUCCESS:
      return { ...state, isLoading: false, recipeData: action.payload };
    case FETCH_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export default dataReducer;
