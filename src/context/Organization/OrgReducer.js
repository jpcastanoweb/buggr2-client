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

    case "UPDATE_PROJECTS":
      return {
        ...globalState,
        projects: action.payload,
      }

    case "UPDATE_OPPORTUNITIES":
      return {
        ...globalState,
        opportunities: action.payload,
      }

    default:
      return globalState
  }
}

export default reducers
