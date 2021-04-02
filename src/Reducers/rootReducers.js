// REDUX Setup
import { combineReducers } from "redux";

// Import files
import specificAccountReducer from "./specificAccountReducer";
import getSpotsReducer from "./getSpotsReducer";

const rootReducers = combineReducers({
  user: specificAccountReducer,
  spots: getSpotsReducer,
});

export default rootReducers;
