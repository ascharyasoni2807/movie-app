import { combineReducers } from "redux";
import { movieReducer, searchReducer } from "./movieReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  search: searchReducer,
});

export default rootReducer;
