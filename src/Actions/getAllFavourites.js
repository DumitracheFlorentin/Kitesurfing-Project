import Axios from "axios";

// Import files, functions or constants
import { API_REQ } from "../API/Functions";
import { FAVOURITES } from "../Constants/API";

export const GetFavourites = () => async (dispatch) => {
  // GET DATA
  const FavouritesData = await Axios.get(API_REQ(FAVOURITES));

  dispatch({
    type: "GET_ALL_FAVOURITES",
    payload: {
      favourites: FavouritesData.data,
    },
  });
};
