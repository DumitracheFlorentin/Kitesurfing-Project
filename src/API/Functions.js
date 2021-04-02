// Import files, functions or constants
import { LOGIN } from "../Constants/API";

export const API_REQ = (tableName) => {
  const API_REQUEST = process.env.REACT_APP_API_KEY + "/" + tableName;
  return API_REQUEST;
};

export const API_SPECIFIC_REQ = (tableName, id) => {
  const API_SPECIFIC_REQUEST =
    process.env.REACT_APP_API_KEY + "/" + tableName + "/" + id;
  return API_SPECIFIC_REQUEST;
};

export const POST_LOGIN_API = () => {
  const POST_LOGIN_REQUEST = process.env.REACT_APP_API_KEY + "/" + LOGIN;
  return POST_LOGIN_REQUEST;
};
