// OrgReducer.js
const reducers = (globalState, action) => {
  switch (action.type) {
    case "UPDATE_ORG_INFO":
      return {
        ...globalState,
        org: action.payload,
        orgId: action.payload._id,
      }

    case "UPDATE_CUSTOMERS":
      return {
        ...globalState,
        customers: action.payload,
      }

    default:
      return globalState
  }
}

export default reducers
