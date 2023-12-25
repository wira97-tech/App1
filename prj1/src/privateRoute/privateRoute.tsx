import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const token = localStorage.getItem("token");
export const PrivateRoute: React.FC = () => {
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};