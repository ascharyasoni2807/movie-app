import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import { thunk } from "redux-thunk";

const store = createStore(
  rootReducer, // Your root reducer
  applyMiddleware(thunk)
);

export default store;
