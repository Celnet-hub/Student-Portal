import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = () => {
  
  let { user } = useContext(AuthContext);
  
  return (
    user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  );
}



export default PrivateRoute;