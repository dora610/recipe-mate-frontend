import {
  DELETE_CONTENT,
  FETCH_FAILURE,
  FETCH_INIT,
  FETCH_SUCCESS,
  SELECT_CONTENT,
  UPDATE_CONTENT,
} from '../context/actions.types';

const adminContentReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case FETCH_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SELECT_CONTENT:
      let selectedContent = state.data.filter(
        (content) => content._id !== action.id
      );
      return { ...state, selectedContent, tobeUpdated: true };
    case UPDATE_CONTENT:
      return fetchContentList(action.payload);
    case DELETE_CONTENT:
      return fetchContentList(action.payload);
    default:
      return state;
  }
};

export default adminContentReducer;
