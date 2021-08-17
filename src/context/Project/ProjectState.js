import React, { useReducer } from "react"
import ProjectContext from "./ProjectContext"
import ProjectReducer from "./ProjectReducer"

import axiosClient from "../../config/axios"

const ProjectState = (props) => {
  const initialState = {
    project: {},
    projectid: "",
  }

  const [globalState, dispatch] = useReducer(ProjectReducer, initialState)

  const loadProject = async (projectid) => {
    try {
      const res = await axiosClient.get(`/api/projects/${projectid}`)
      dispatch({
        type: "UPDATE_PROJECT",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitEditProject = async (data) => {
    try {
      const res = await axiosClient.post(`api/projects/${data._id}/edit`, data)
      dispatch({
        type: "UPDATE_PROJECT",
        payload: res.data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        project: globalState.project,
        projectid: globalState.projectid,
        loadProject,
        submitEditProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  )
}

export default ProjectState
