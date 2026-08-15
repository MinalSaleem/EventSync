import { useState, useEffect } from "react";

const CATEGORIES = ["Technology", "Workshop", "Business", "Career", "Coding"];

const EventForm = ({ initialData, onSubmit, submitLabel = "Save Event" }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Technology",
    date: "",
    time: "",
    location: "",
    organizer: "",
    maxParticipants: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If in edit mode (initialData is provided), pre-fill the form.
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "Technology",
        date: initialData.date ? initialData.date.slice(0, 10) : "", // For the yyyy-mm-dd format.
        time: initialData.time || "",
        location: initialData.location || "",
        organizer: initialData.organizer || "",
        maxParticipants: initialData.maxParticipants || "",
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-2xl">
      {error && <div className="bg-red-100 text-red-600 p-3 rounded text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
        <input
          type="text" name="title" value={formData.title} onChange={handleChange} required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description" value={formData.description} onChange={handleChange} required rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category" value={formData.category} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
          <input
            type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} required min={1}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date" name="date" value={formData.date} onChange={handleChange} required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="text" name="time" value={formData.time} onChange={handleChange} required placeholder="e.g. 10:00 AM"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text" name="location" value={formData.location} onChange={handleChange} required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
        <input
          type="text" name="organizer" value={formData.organizer} onChange={handleChange} required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
        <input
          type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default EventForm;