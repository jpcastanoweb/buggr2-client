const reducers = (globalState, action) => {
  switch (action.type) {
    case "UPDATE_PROJECT":
      return {
        ...globalState,
        project: action.payload,
        projectid: action.payload._id,
      }
    default:
      return globalState
  }
}

export default reducers
