import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const MyEvents = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const fetchMyEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/registrations/my-events");
      setRegistrations(res.data.registrations);
    } catch (err) {
      setError("Failed to load your registered events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleCancel = async (registrationId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this registration?");
    if (!confirmCancel) return;

    setCancellingId(registrationId);
    try {
      await api.delete(`/registrations/${registrationId}`);
      // Immediately remove it from the list without refreshing the page.
      setRegistrations((prev) => prev.filter((r) => r._id !== registrationId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel registration.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading your events...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Registered Events</h1>

      {registrations.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You haven't registered for any events yet.</p>
          <Link to="/events" className="text-blue-600 hover:underline">
            Browse Events →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {registrations.map((reg) => (
            <div
              key={reg._id}
              className="bg-white shadow-md rounded-lg p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {reg.event?.title || "Event no longer available"}
                </h3>
                {reg.event && (
                  <p className="text-sm text-gray-500 mt-1">
                    📅 {new Date(reg.event.date).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })} | 🕒 {reg.event.time} | 📍 {reg.event.location}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Registered on {new Date(reg.registrationDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3">
                {reg.event && (
                  <Link
                    to={`/events/${reg.event._id}`}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200"
                  >
                    View Event
                  </Link>
                )}
                <button
                  onClick={() => handleCancel(reg._id)}
                  disabled={cancellingId === reg._id}
                  className="text-sm bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {cancellingId === reg._id ? "Cancelling..." : "Cancel"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;