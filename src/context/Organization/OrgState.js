import React, { useReducer } from "react"
import OrgContext from "./OrgContext"
import OrgReducer from "./OrgReducer"

import axiosClient from "./../../config/axios"

const OrgState = (props) => {
  const initialState = {
    orgId: null,
    org: {},
    customers: [],
    projects: [],
    opportunities: [],
  }

  const [globalState, dispatch] = useReducer(OrgReducer, initialState)

  const loadOrg = async (orgId) => {
    try {
      const res = await axiosClient.get(`/api/orgs/${orgId}`)

      dispatch({
        type: "UPDATE_ORG_INFO",
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const loadCustomers = async () => {
    console.log("trying to load customers")
    try {
      console.log("Orgid in globalstate", globalState.orgId)
      const res = await axiosClient.post(`/api/customers`, {
        belongsTo: globalState.orgId,
      })
      console.log(res)

      dispatch({
        type: "UPDATE_CUSTOMERS",
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <OrgContext.Provider
      value={{
        org: globalState.org,
        orgId: globalState.orgId,
        customers: globalState.customers,
        loadOrg,
        loadCustomers,
      }}
    >
      {props.children}
    </OrgContext.Provider>
  )
}

export default OrgState
