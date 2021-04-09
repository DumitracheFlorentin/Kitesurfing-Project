// Import React Tools
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Import files, functions or constants
import rootReducers from "./Reducers/rootReducers";

const middleware = [thunk];

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
