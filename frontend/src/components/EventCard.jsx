import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={event.image || "https://placehold.co/400x200?text=Event"}
        alt={event.title}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded mb-2">
          {event.category}
        </span>

        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {event.title}
        </h3>

        <p className="text-sm text-gray-500 mb-1">📅 {eventDate} | 🕒 {event.time}</p>
        <p className="text-sm text-gray-500 mb-3">📍 {event.location}</p>

        <div className="flex justify-between items-center">
          <span
            className={`text-sm font-medium ${
              event.availableSeats > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {event.availableSeats > 0
              ? `${event.availableSeats} seats left`
              : "Fully booked"}
          </span>

          <Link
            to={`/events/${event._id}`}
            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;