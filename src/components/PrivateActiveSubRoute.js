import React, { useContext, useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"

import UserContext from "./../context/User/UserContext"

export default function PrivateActiveSubRoute({
  component: Component,
  ...props
}) {
  const userCtx = useContext(UserContext)

  const { authStatus, verifyingToken, user } = userCtx

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const verifyingAuthStatus = async () => {
        await verifyingToken()
        return setLoading(false)
      }

      verifyingAuthStatus()
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus])

  return (
    <Route
      {...props}
      render={() => {
        if (loading) return null
        return authStatus ? (
          user.subscriptionStatus === "active" ? (
            <Component {...props} />
          ) : (
            <Redirect {...props} to="/subscribe" />
          )
        ) : (
          <Redirect {...props} to="/login" />
        )
      }}
    />
  )
}
