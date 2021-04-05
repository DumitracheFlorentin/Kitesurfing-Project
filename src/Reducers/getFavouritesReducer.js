const getFavouritesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_FAVOURITES":
      return {
        data: action.payload.favourites,
      };
    default:
      return state;
  }
};

export default getFavouritesReducer;
