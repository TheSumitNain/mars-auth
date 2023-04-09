import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute2 = ({ children }) => {
  const { user } = useUserAuth();

  if (user) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRoute2;
