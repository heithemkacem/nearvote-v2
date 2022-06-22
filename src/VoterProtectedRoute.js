import React from "react";
import { Navigate} from "react-router-dom";

function VoterProtectedRoute({ component: Component }) {
  const isVoterAuthenticated = localStorage.getItem("isVoterAuthenticated");
  if(!isVoterAuthenticated){
    return <Navigate to="/voter-login" replace />
  }else{
    return <Component />
  }
}
export default VoterProtectedRoute;