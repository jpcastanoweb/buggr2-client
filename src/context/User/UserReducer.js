const reducers = (globalState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token)

      return {
        ...globalState,
        authStatus: true,
        token: action.payload.token,
      }

    case "GET_USER_INFO":
      return {
        ...globalState,
        authStatus: true,
        user: action.payload,
        activeSubscription: action.payload.activeSubscription,
      }

    case "SIGNOUT_USER":
      localStorage.removeItem("token")
      return {
        ...globalState,
        token: null,
        user: null,
        authStatus: null,
        activeSubscription: null,
        sessionUrl: null,
      }

    case "PURCHASE_SESSION_CREATED":
      return {
        ...globalState,
        sessionUrl: action.payload.data,
      }

    case "ERASE_REDIRECT":
      return {
        ...globalState,
        redirect_url: null,
      }

    default:
      return globalState
  }
}

export default reducers
