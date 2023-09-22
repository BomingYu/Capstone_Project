import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

// wrap around logged-in user only routes to protect them
function ProtectedRoute({ redirectPath = "/", children }) {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  // works for both nested and standalone routes
  return children ? children : <Outlet />;
}
export default ProtectedRoute;
