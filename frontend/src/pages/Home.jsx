import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        // Show only the first 3 events on the home page (featured/upcoming).
        setEvents(res.data.events.slice(0, 3));
      } catch (err) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Discover & Join Amazing Events</h1>
        <p className="text-lg mb-6 text-blue-100">
          Conferences, workshops, competitions and more — all in one place.
        </p>
        <Link
          to="/events"
          className="bg-white text-blue-600 px-6 py-3 rounded font-medium hover:bg-blue-50"
        >
          Browse All Events
        </Link>
      </div>

      {/* Upcoming Events Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>

        {loading && <p className="text-center text-gray-500">Loading events...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p className="text-center text-gray-500">No events available right now.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;