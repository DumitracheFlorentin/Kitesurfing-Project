// Import Redux Tools
import { combineReducers } from "redux";

// Import files, functions or constans
import specificAccountReducer from "./specificAccountReducer";
import getSpotsReducer from "./getSpotsReducer";

const rootReducers = combineReducers({
  user: specificAccountReducer,
  spots: getSpotsReducer,
});

export default rootReducers;
