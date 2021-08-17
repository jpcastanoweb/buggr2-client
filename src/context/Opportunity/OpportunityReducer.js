const reducers = (globalState, action) => {
  switch (action.type) {
    case "UPDATE_OPPORTUNITY":
      return {
        ...globalState,
        opportunity: action.payload,
        opportunityid: action.payload._id,
      }
    default:
      return globalState
  }
}

export default reducers
