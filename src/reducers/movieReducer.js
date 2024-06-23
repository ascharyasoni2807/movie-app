import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "../actions/movieActions";

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

const movieReducer = (state = initialState, action) => {
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

export default movieReducer;
