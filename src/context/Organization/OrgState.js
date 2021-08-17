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
    try {
      const res = await axiosClient.post(`/api/customers`, {
        belongsTo: globalState.orgId,
      })
      dispatch({
        type: "UPDATE_CUSTOMERS",
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const loadProjects = async () => {
    try {
      const res = await axiosClient.post(`/api/projects`, {
        belongsTo: globalState.orgId,
      })

      dispatch({
        type: "UPDATE_PROJECTS",
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const loadOpportunities = async () => {
    try {
      const res = await axiosClient.post(`/api/opportunities`, {
        belongsTo: globalState.orgId,
      })

      dispatch({
        type: "UPDATE_OPPORTUNITIES",
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
        projects: globalState.projects,
        opportunities: globalState.opportunities,
        loadOrg,
        loadCustomers,
        loadProjects,
        loadOpportunities,
      }}
    >
      {props.children}
    </OrgContext.Provider>
  )
}

export default OrgState
