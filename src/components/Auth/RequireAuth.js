import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";

const RequireAuth = () => {
  const location = useLocation();

  const { token } = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;
