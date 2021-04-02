// REDUX Setup
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Import files
import rootReducers from "../Reducers/rootReducers";

const middleware = [thunk];

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
