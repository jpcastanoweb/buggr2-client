import React, { useReducer } from "react"
import CustomerContext from "./CustomerContext"
import CustomerReducer from "./CustomerReducer"

import axiosClient from "./../../config/axios"

const CustomerState = (props) => {
  const initialState = {
    customer: {},
    customerid: "",
  }

  const [globalState, dispatch] = useReducer(CustomerReducer, initialState)

  const loadCustomer = async (customerid) => {
    try {
      const res = await axiosClient.get(`/api/customers/${customerid}`)
      dispatch({
        type: "UPDATE_CUSTOMER",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitEditCustomer = async (data) => {
    try {
      const res = await axiosClient.post(
        `/api/customers/${data._id}/edit`,
        data
      )
      dispatch({
        type: "UPDATE_CUSTOMER",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitCreateCustomer = async (data) => {
    try {
      const res = await axiosClient.post("api/customers/create", data)
      dispatch({
        type: "UPDATE_CUSTOMER",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <CustomerContext.Provider
      value={{
        customer: globalState.customer,
        customerid: globalState.customerid,
        loadCustomer,
        submitEditCustomer,
        submitCreateCustomer,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  )
}

export default CustomerState
