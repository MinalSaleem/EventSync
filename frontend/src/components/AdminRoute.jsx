import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// For admins only — redirect if the user is not logged in or is not an admin.
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-10">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;