import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  ADD_SEARCH_RESULT,
} from "../actions/movieActions";

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        movies: action.payload,
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialSeacrhState = {
  result: [],
  showSearchResults: false,
};
export const searchReducer = (state = initialSeacrhState, action) => {
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movies,
        showSearchResults: true,
      };
    default:
      return state;
  }
};
