import React from "react"
import { Redirect } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <Redirect to="/app"></Redirect>
    </div>
  )
}
