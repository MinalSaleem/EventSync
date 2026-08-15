import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
});

// Ensure that a user can register for an event only once (an additional safety layer to prevent duplicates).
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;