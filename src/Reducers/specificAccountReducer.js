const specificAccountReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SPECIFIC_USER":
      return {
        data: action.payload.user,
      };
    default:
      return state;
  }
};

export default specificAccountReducer;
