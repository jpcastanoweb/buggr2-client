import React, { useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";

import UserContext from "./../context/User/UserContext";

export default function AuthRoute({ children }) {
  const userCtx = useContext(UserContext);

  const { authStatus, verifyingToken } = userCtx;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyingAuthStatus = async () => {
      await verifyingToken();
      return setLoading(false);
    };

    verifyingAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  return loading ? null : authStatus ? (
    <Navigate to="/app/customers" />
  ) : (
    children
  );
}
