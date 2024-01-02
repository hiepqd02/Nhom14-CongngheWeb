import React from "react";
import { Navigate } from "react-router-dom";
const FreeRoute = ({ children }) => {
    if (localStorage.getItem("token")) return <Navigate to='/boards' />
    return children
};

export default FreeRoute;
