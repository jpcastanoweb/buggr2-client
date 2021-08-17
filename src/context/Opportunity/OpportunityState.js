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
  return (
    <OpportunityContext.Provider
      value={{
        opportunity: globalState.opportunity,
        opportunityid: globalState.opportunityid,
        loadOpportunity,
      }}
    >
      {props.children}
    </OpportunityContext.Provider>
  )
}

export default OpportunityState
