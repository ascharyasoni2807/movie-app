import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  ADD_SEARCH_RESULT,
  START_SEARCH,
  END_SEARCH,
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
      const uniqueMovies = action.payload.filter(
        (newMovie) =>
          !state.movies.some(
            (existingMovie) => existingMovie.id === newMovie.id
          )
      );
      return {
        ...state,
        status: "succeeded",
        movies: [...state.movies, ...uniqueMovies],
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

const initialSearchState = {
  result: [],
  showSearchResults: false,
  isLoading: false,
};

export const searchReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case START_SEARCH:
      return {
        ...state,
        isLoading: true,
        showSearchResults: false,
      };
    case END_SEARCH:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movies,
        showSearchResults: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
