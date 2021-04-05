// Import Redux Tools
import { combineReducers } from "redux";

// Import files, functions or constans
import specificAccountReducer from "./specificAccountReducer";
import getSpotsReducer from "./getSpotsReducer";
import getFavouritesReducer from "./getFavouritesReducer";

const rootReducers = combineReducers({
  user: specificAccountReducer,
  spots: getSpotsReducer,
  favourites: getFavouritesReducer,
});

export default rootReducers;
