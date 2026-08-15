import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        EventSync
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/events" className="text-gray-700 hover:text-blue-600">
          Events
        </Link>

        {user ? (
          <>
            <Link to="/my-events" className="text-gray-700 hover:text-blue-600">
              My Events
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>

            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/register"
              className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;