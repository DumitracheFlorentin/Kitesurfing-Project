// REDUX Setup
import { combineReducers } from "redux";

// Import files
import specificAccountReducer from "./specificAccountReducer";

const rootReducers = combineReducers({
  user: specificAccountReducer,
});

export default rootReducers;
