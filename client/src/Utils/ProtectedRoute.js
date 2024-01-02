import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  if (!user.isAuthenticated && !user.pending) {
    return (
      <Navigate to='/' />
    );
  }
  if (user.isAuthenticated && !user.pending) { return children }
  else { return <Loading /> }
};

export default ProtectedRoute;
