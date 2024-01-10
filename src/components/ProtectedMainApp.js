import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import UserContext from "../context/User/UserContext";
import MainApp from "./Layout/MainApp";

export default function ProtectedMainApp({ children }) {
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

  return loading ? null : authStatus ? (
    user.subscriptionStatus === "active" ? (
      <MainApp>
        <Outlet />
      </MainApp>
    ) : (
      <Navigate to="/subscribe" />
    )
  ) : (
    <Navigate to="/login" />
  );
}
