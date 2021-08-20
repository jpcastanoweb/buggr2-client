import React, { useReducer, useEffect } from "react"
import UserContext from "./UserContext"
import UserReducer from "./UserReducer"

import axiosClient from "./../../config/axios"

const UserState = (props) => {
  const initialState = {
    user: {
      email: "",
      firstName: "",
      lastName: "",
    },
    authStatus: null,
    activeSubscription: null,
    token: null,
    sessionUrl: null,
  }

  const [globalState, dispatch] = useReducer(UserReducer, initialState)

  const registerUser = async (dataForm) => {
    try {
      const res = await axiosClient.post("/api/users/register", dataForm)
      // sendCustomerToStripe(dataForm)

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.msg)
      dispatch({
        type: "REGISTER_ERROR",
        payload: error,
      })
    }
  }

  const verifyingToken = async () => {
    const token = localStorage.getItem("token")

    // prepare petition
    if (token) {
      axiosClient.defaults.headers.common["x-auth-token"] = token
    } else {
      delete axiosClient.defaults.headers.common["x-auth-token"]
    }

    //send petition
    try {
      const res = await axiosClient.get("/api/auth")

      dispatch({
        type: "GET_USER_INFO",
        payload: res.data.userFound,
      })
    } catch (error) {}
  }

  const loginUser = async (dataForm) => {
    try {
      const res = await axiosClient.post("/api/auth/login", dataForm)

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      })
    } catch (error) {}
  }

  const signout = async () => {
    dispatch({
      type: "SIGNOUT_USER",
    })
  }

  const startMonthlyCheckoutSession = async (userid) => {
    const price = "price_1JQLyrCbz9l6kb32ZSrziHE4"

    try {
      const res = await axiosClient.post("/api/stripe/create-session", {
        price,
        userid,
      })
      dispatch({
        type: "PURCHASE_SESSION_CREATED",
        payload: res,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const startYearlyCheckoutSession = async (userid) => {
    const price = "price_1JQ16gCbz9l6kb32KPC9c2oc"

    try {
      const res = await axiosClient.post("/api/stripe/create-session", {
        price,
        userid,
      })

      dispatch({
        type: "PURCHASE_SESSION_CREATED",
        payload: res,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const submitEditAccount = async (dataForm) => {
    try {
      const res = await axiosClient.post(
        `/api/users/${dataForm.userid}/update-email`,
        {
          email: dataForm.email,
        }
      )

      dispatch({
        type: "GET_USER_INFO",
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const submitEditProfile = async (dataForm) => {
    try {
      const res = await axiosClient.post(
        `/api/users/${dataForm.userid}/update-profile`,
        {
          firstName: dataForm.firstName,
          lastName: dataForm.lastName,
          pictureURL: dataForm.pictureUrl,
        }
      )

      dispatch({
        type: "GET_USER_INFO",
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const eraseRedirect = () => {
    dispatch({
      type: "ERASE_REDIRECT",
    })
  }

  const requestSessionFromStripe = async (session_id) => {
    try {
      const response = await axiosClient.get(
        `/api/stripe/request-session/${session_id}`
      )
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const requestSubscriptionFromStripe = async (subscription_id) => {
    try {
      const response = await axiosClient.get(
        `/api/stripe/request-subscription/${subscription_id}`
      )
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const setUserSubscriptionStatus = async (subscription, userid) => {
    console.log("Subscription in state", subscription)
    console.log("User id in state", userid)
    try {
      const response = await axiosClient.post(
        `/api/users/${userid}/update-subscription-status`,
        {
          subscription,
        }
      )
      dispatch({
        type: "GET_USER_INFO",
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: globalState.user,
        authStatus: globalState.authStatus,
        token: globalState.token,
        sessionUrl: globalState.sessionUrl,
        registerUser,
        verifyingToken,
        loginUser,
        signout,
        submitEditAccount,
        submitEditProfile,
        startMonthlyCheckoutSession,
        startYearlyCheckoutSession,
        eraseRedirect,
        requestSessionFromStripe,
        requestSubscriptionFromStripe,
        setUserSubscriptionStatus,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
