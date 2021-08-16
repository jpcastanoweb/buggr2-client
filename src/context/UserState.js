import React, { useReducer } from "react"
import UserContext from "./UserContext"
import UserReducer from "./UserReducer"

import axiosClient from "./../config/axios"

const UserState = (props) => {
  const initialState = {
    user: {
      username: "",
      email: "",
    },
    authStatus: null,
    token: null,
  }

  const [globalState, dispatch] = useReducer(UserReducer, initialState)

  const registerUser = async (dataForm) => {
    console.log(dataForm)

    try {
      const res = await axiosClient.post("/api/users/register", dataForm)

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      })
    } catch (error) {
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
      // dispatch({
      //   type: "CLEAN_USER_TOKEN",
      // })
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
    console.log(dataForm)

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

  return (
    <UserContext.Provider
      value={{
        user: globalState.user,
        authStatus: globalState.authStatus,
        token: globalState.token,
        registerUser,
        verifyingToken,
        loginUser,
        signout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
