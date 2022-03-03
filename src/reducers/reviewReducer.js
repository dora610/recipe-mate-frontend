const reviewReducer = (state, action) => {
  switch (action.type) {
    case 'set_rating':
      return { ...state, rating: action.payload };
    case 'set_comments':
      return { ...state, comments: action.payload };
    case 'submit_init':
      return { ...state, isLoading: true, error: null, success: null };
    case 'submit_success':
      return {
        ...state,
        isLoading: false,
        success: action.payload,
        rating: 0,
        comments: '',
      };
    case 'submit_failure':
      return { ...state, isLoading: false, error: action.payload };
    case 'fetch_success':
      return {
        ...state,
        isLoading: false,
        ratingsCount: action.payload.ratingsCount,
        reviews: action.payload.reviews,
      };
    default:
      throw new Error('Incorrect action');
  }
};

export default reviewReducer;
