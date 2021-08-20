import React, { useContext, useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"

import UserContext from "./../context/User/UserContext"

export default function AuthRoute({ component: Component, ...props }) {
  const userCtx = useContext(UserContext)

  const { authStatus, verifyingToken } = userCtx

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyingAuthStatus = async () => {
      await verifyingToken()
      return setLoading(false)
    }

    verifyingAuthStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus])

  return (
    <Route
      {...props}
      render={() => {
        if (loading) return null
        return authStatus ? (
          <Redirect to="/app/customers" {...props} />
        ) : (
          <Component {...props} />
        )
      }}
    />
  )
}
