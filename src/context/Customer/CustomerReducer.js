const reducers = (globalState, action) => {
  switch (action.type) {
    case "UPDATE_CUSTOMER":
      return {
        ...globalState,
        customer: action.payload,
        customerid: action.payload._id,
      }
    default:
      return globalState
  }
}

export default reducers
