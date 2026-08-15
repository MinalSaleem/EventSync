import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import EventForm from "../../components/EventForm";

const AddEvent = () => {
  const navigate = useNavigate();

  const handleAddEvent = async (formData) => {
    await api.post("/events", formData);
    navigate("/admin/events");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Event</h1>
      <EventForm onSubmit={handleAddEvent} submitLabel="Create Event" />
    </div>
  );
};

export default AddEvent;