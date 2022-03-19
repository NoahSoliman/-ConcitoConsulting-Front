const reducer = (state = {}, action) => {
  switch (action.type) {

    case "loginIn":
      return {
        ...state,
            logginState: action.data,
        }

  
    default:
      return state;
  }
};

export default reducer;
