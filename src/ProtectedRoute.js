import React from "react";
import { Navigate} from "react-router-dom";

function ProtectedRoute({ component: Component }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }else{
    return <Component />
  }
}
export default ProtectedRoute;