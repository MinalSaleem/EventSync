import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const EventRegistrations = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, regRes] = await Promise.all([
          api.get(`/events/${eventId}`),
          api.get(`/registrations/event/${eventId}`),
        ]);
        setEvent(eventRes.data.event);
        setRegistrations(regRes.data.registrations);
      } catch (err) {
        setError("Failed to load registrations.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  if (loading) return <p className="text-gray-500">Loading registrations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <Link to="/admin/events" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Manage Events
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Registrations for "{event?.title}"
      </h1>
      <p className="text-gray-500 mb-6">
        {registrations.length} user(s) registered · {event?.availableSeats} seats remaining
      </p>

      {registrations.length === 0 ? (
        <p className="text-gray-500">No one has registered for this event yet.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Registered On</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{reg.user?.name || "N/A"}</td>
                  <td className="px-4 py-3 text-gray-600">{reg.user?.email || "N/A"}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(reg.registrationDate).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
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

export default EventRegistrations;