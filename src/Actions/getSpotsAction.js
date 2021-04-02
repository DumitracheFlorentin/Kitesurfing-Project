import Axios from "axios";

// Import files, functions or constants
import { API_REQ } from "../API/Functions";
import { SPOT } from "../Constants/API";

export const GetSpots = () => async (dispatch) => {
  // GET DATA
  const SpotsData = await Axios.get(API_REQ(SPOT));

  dispatch({
    type: "GET_ALL_SPOTS",
    payload: {
      spots: SpotsData.data,
    },
  });
};
