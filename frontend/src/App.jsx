import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyEvents from "./pages/MyEvents";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import AddEvent from "./pages/admin/AddEvent";
import EditEvent from "./pages/admin/EditEvent";
import EventRegistrations from "./pages/admin/EventRegistrations";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/my-events" element={<PrivateRoute><MyEvents /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="events/add" element={<AddEvent />} />
          <Route path="events/edit/:id" element={<EditEvent />} />
          <Route path="events/registrations/:eventId" element={<EventRegistrations />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;