import React, { useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";

import UserContext from "./../context/User/UserContext";

export default function PrivateRoute({ component: Component, ...props }) {
  const userCtx = useContext(UserContext);

  const { user, authStatus, verifyingToken } = userCtx;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const verifyingAuthStatus = async () => {
        await verifyingToken();
        return setLoading(false);
      };

      verifyingAuthStatus();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  return (
    <Route
      {...props}
      render={() => {
        if (loading) return null;
        return authStatus && user.subscriptionStatus !== "active" ? (
          <Component {...props} />
        ) : (
          <Navigate {...props} to="/login" />
        );
      }}
    />
  );
}
