import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Event description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
  },
  time: {
    type: String,
    required: [true, "Event time is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  organizer: {
    type: String,
    required: [true, "Organizer name is required"],
  },
  maxParticipants: {
    type: Number,
    required: [true, "Maximum participants is required"],
    min: 1,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "", // If the user doesn't provide an image, keep it empty and display a default image on the frontend.
  },
}, {
  timestamps: true,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;