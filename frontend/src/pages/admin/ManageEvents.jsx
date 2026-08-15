import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/events");
      setEvents(res.data.events);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This cannot be undone."
    );
    if (!confirmDelete) return;

    setDeletingId(eventId);
    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="text-gray-500">Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
        <Link
          to="/admin/events/add"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Add Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500">No events created yet.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Seats</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{event.title}</td>
                  <td className="px-4 py-3 text-gray-600">{event.category}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {event.availableSeats} / {event.maxParticipants}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/events/registrations/${event._id}`}
                        className="text-purple-600 hover:underline"
                      >
                        Registrations
                      </Link>
                      <Link
                        to={`/admin/events/edit/${event._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={deletingId === event._id}
                        className="text-red-500 hover:underline disabled:opacity-50"
                      >
                        {deletingId === event._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;