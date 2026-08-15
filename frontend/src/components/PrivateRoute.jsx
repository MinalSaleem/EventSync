import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// For logged-in users only — redirect to the login page if the user is not authenticated.
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;