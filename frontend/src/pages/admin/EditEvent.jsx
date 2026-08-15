import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import EventForm from "../../components/EventForm";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data.event);
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdateEvent = async (formData) => {
    await api.put(`/events/${id}`, formData);
    navigate("/admin/events");
  };

  if (loading) return <p className="text-gray-500">Loading event...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Event</h1>
      <EventForm initialData={event} onSubmit={handleUpdateEvent} submitLabel="Update Event" />
    </div>
  );
};

export default EditEvent;