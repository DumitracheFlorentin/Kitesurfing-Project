import Axios from "axios";

// Import files, functions or constants
import { API_SPECIFIC_REQ } from "../API/Functions";
import { USER } from "../Constants/API";

export const specificAccount = (id) => async (dispatch) => {
  // GET DATA
  const AccountData = await Axios.get(API_SPECIFIC_REQ(USER, id));

  dispatch({
    type: "GET_SPECIFIC_USER",
    payload: {
      user: AccountData.data,
    },
  });
};
