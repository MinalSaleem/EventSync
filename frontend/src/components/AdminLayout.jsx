import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm font-medium ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex max-w-6xl mx-auto px-6 py-8 gap-8">
      {/* Sidebar */}
      <aside className="w-56 shrink-0">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Admin Panel</h2>
        <nav className="space-y-1">
          <NavLink to="/admin/dashboard" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/events" className={linkClass}>
            Manage Events
          </NavLink>
          <NavLink to="/admin/events/add" className={linkClass}>
            Add Event
          </NavLink>
        </nav>
      </aside>

      {/* Page content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;