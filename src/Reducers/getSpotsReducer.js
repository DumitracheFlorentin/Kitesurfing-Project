const getSpotsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_SPOTS":
      return {
        data: action.payload.spots,
      };
    default:
      return state;
  }
};

export default getSpotsReducer;
