const reducer = (state = {}, action) => {
  switch (action.type) {
    case "selectedCompanies":
      return {
        ...state,
        companies: action.data,
      };

    case "selectedPage":
      return {
        ...state,
        page: action.data,
      };

    case "setCustomerBranchChoice":
      return {
        ...state,
        customerBranchChoice: action.data,
      };

      
    case "setCustomerOptions":
      return {
        ...state,
        customerOptions: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
