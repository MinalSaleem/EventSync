import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data.event);
    } catch (err) {
      setError("Event not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setRegistering(true);
    setMessage({ type: "", text: "" });

    try {
      await api.post("/registrations", { eventId: id });
      setMessage({ type: "success", text: "You have successfully registered for this event!" });
      fetchEvent(); // To refresh the seat count.
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Registration failed. Please try again.",
      });
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading event details...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!event) return null;

  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <img
        src={event.image || "https://placehold.co/800x300?text=Event"}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded mb-3">
        {event.category}
      </span>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>

      <p className="text-gray-600 mb-6">{event.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
        <p>📅 <strong>Date:</strong> {eventDate}</p>
        <p>🕒 <strong>Time:</strong> {event.time}</p>
        <p>📍 <strong>Location:</strong> {event.location}</p>
        <p>👤 <strong>Organizer:</strong> {event.organizer}</p>
        <p>🎟️ <strong>Total Seats:</strong> {event.maxParticipants}</p>
        <p className={event.availableSeats > 0 ? "text-green-600" : "text-red-500"}>
          🪑 <strong>Available Seats:</strong> {event.availableSeats}
        </p>
      </div>

      {message.text && (
        <div
          className={`p-3 rounded mb-4 text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        onClick={handleRegister}
        disabled={registering || event.availableSeats <= 0}
        className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {event.availableSeats <= 0
          ? "Fully Booked"
          : registering
          ? "Registering..."
          : "Register Now"}
      </button>
    </div>
  );
};

export default EventDetails;