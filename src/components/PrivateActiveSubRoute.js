import React, { Children, useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";

import UserContext from "./../context/User/UserContext";

export default function PrivateActiveSubRoute({ children }) {
  const userCtx = useContext(UserContext);

  const { authStatus, verifyingToken, user } = userCtx;

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

  return loading ? null : authStatus || true ? ( // TODO: delete true
    user.subscriptionStatus === "active" || true ? ( //TODO: delete true
      children
    ) : (
      <Navigate to="/subscribe" />
    )
  ) : (
    <Navigate to="/login" />
  );
}
