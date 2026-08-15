import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

// @desc    Register logged-in user for an event
// @route   POST /api/registrations
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id; // This will be provided by the authMiddleware.

    if (!eventId) {
      return res.status(400).json({ success: false, message: "Event ID is required" });
    }

    // Check if the event exists.
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if seats are available.
    if (event.availableSeats <= 0) {
      return res.status(400).json({ success: false, message: "Sorry, this event is fully booked" });
    }

    // Check if the user is already registered.
    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId,
      status: "confirmed",
    });

    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: "You are already registered for this event" });
    }

    // Create the registration.
    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    // Decrease the available seat count.
    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: "Successfully registered for the event",
      registration,
    });
  } catch (error) {
    // Provide a user-friendly message if a unique index (duplicate) error occurs.
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "You are already registered for this event" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged-in user's registered events
// @route   GET /api/registrations/my-events
export const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;

    const registrations = await Registration.find({ user: userId, status: "confirmed" })
      .populate("event") // Include the complete event details.
      .sort({ registrationDate: -1 });

    res.status(200).json({ success: true, count: registrations.length, registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all registrations for a specific event (Admin only)
// @route   GET /api/registrations/event/:eventId
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({ event: eventId, status: "confirmed" })
      .populate("user", "name email") // Return the user's name and email, but exclude the password.
      .sort({ registrationDate: -1 });

    res.status(200).json({ success: true, count: registrations.length, registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel a registration
// @route   DELETE /api/registrations/:id
export const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    // Only allow users to cancel their own registration, while admins can cancel any registration.
    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this registration" });
    }

    // Restore the available seat count for the event.
    const event = await Event.findById(registration.event);
    if (event) {
      event.availableSeats += 1;
      await event.save();
    }

    await registration.deleteOne();

    res.status(200).json({ success: true, message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};