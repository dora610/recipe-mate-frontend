import { MODIFY_RECIPE, SHOW_RECIPE } from './actions.types';

const recipeDataReducer = (state, action) => {
  switch (action.type) {
    case MODIFY_RECIPE:
      return { ...state, recipe: action.payload };
    case SHOW_RECIPE:
      return state.recipe;
    case FETCH_INIT:
      return { ...state, isLoading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case FETCH_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      break;
  }
};

export default recipeDataReducer;
