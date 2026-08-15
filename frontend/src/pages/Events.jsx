import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

const CATEGORIES = ["All", "Technology", "Workshop", "Business", "Career", "Coding"];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/events", {
        params: { search, category },
      });
      setEvents(res.data.events);
    } catch (err) {
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the data after a short delay whenever the search or category changes (debounce).
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchEvents();
    }, 400);

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Events</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search events by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-gray-500">Loading events...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p className="text-center text-gray-500">No events found matching your criteria.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;