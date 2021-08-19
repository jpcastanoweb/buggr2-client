import React, { useReducer } from "react"
import OpportunityContext from "./OpportunityContext"
import OpportunityReducer from "./OpportunityReducer"

import axiosClient from "../../config/axios"

const OpportunityState = (props) => {
  const initialState = {
    opportunity: {},
    opportunityid: "",
  }

  const [globalState, dispatch] = useReducer(OpportunityReducer, initialState)

  const loadOpportunity = async (opportunityid) => {
    try {
      const res = await axiosClient.get(`/api/opportunities/${opportunityid}`)
      dispatch({
        type: "UPDATE_OPPORTUNITY",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitEditOpportunity = async (data) => {
    try {
      const res = await axiosClient.post(
        `api/opportunities/${data._id}/edit`,
        data
      )
      dispatch({
        type: "UPDATE_OPPORTUNITY",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitCreateOpportunity = async (data) => {
    try {
      const res = await axiosClient.post("/api/opportunities/create", data)
      dispatch({
        type: "UPDATE_OPPORTUNITY",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitDeleteOpportunity = async (id) => {
    try {
      await axiosClient.post(`/api/opportunities/${id}/delete`)
      dispatch({
        type: "UPDATE_OPPORTUNITY",
        payload: {
          opportunity: {},
          opportunityid: "",
        },
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitConvertOpportunity = async (id, dataForm) => {
    try {
      const res = await axiosClient.post(
        `/api/opportunities/${id}/convert`,
        dataForm
      )
      dispatch({
        type: "UPDATE_OPPORTUNITY",
        payload: res.data.opportunity,
      })
      return res.data.project
    } catch (error) {
      console.log(error)
    }
  }

  const submitAssignContact = async (data) => {
    try {
      const res = await axiosClient.post(
        `/api/opportunities/${data.opportunityid}/addcontact`,
        {
          contactid: data.contactid,
        }
      )
      dispatch({
        type: "UPDATE_OPPORTUNITY",
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <OpportunityContext.Provider
      value={{
        opportunity: globalState.opportunity,
        opportunityid: globalState.opportunityid,
        loadOpportunity,
        submitEditOpportunity,
        submitCreateOpportunity,
        submitDeleteOpportunity,
        submitConvertOpportunity,
        submitAssignContact,
      }}
    >
      {props.children}
    </OpportunityContext.Provider>
  )
}

export default OpportunityState
