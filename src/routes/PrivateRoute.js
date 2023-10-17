import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../apis/doctorApi";

function PrivateRoute() {
  return (
    isLoggedIn() ? <Outlet /> : <Navigate to='/' />
  )
}

export default PrivateRoute;
