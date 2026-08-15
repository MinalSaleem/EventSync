import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUpcoming: 0,
    totalRegistrations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Our backend does not have a separate "stats" API, so we fetch the events and calculate the statistics on the frontend.
        const res = await api.get("/events");
        const events = res.data.events;

        const now = new Date();
        const upcoming = events.filter((e) => new Date(e.date) >= now);

        // To get the total number of registrations, we need to count the registrations for each event.
        let totalRegistrations = 0;
        for (const event of events) {
          const seatsUsed = event.maxParticipants - event.availableSeats;
          totalRegistrations += seatsUsed;
        }

        setStats({
          totalEvents: events.length,
          totalUpcoming: upcoming.length,
          totalRegistrations,
        });
      } catch (err) {
        setError("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const cards = [
    { label: "Total Events", value: stats.totalEvents, color: "bg-blue-500" },
    { label: "Upcoming Events", value: stats.totalUpcoming, color: "bg-green-500" },
    { label: "Total Registrations", value: stats.totalRegistrations, color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white shadow-md rounded-lg p-6">
            <div className={`w-10 h-10 ${card.color} rounded-full mb-3`}></div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;