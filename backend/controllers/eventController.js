import Event from "../models/Event.js";

// @desc    Create new event (Admin only)
// @route   POST /api/events
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      location,
      organizer,
      maxParticipants,
      image,
    } = req.body;

    if (!title || !description || !category || !date || !time || !location || !organizer || !maxParticipants) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      location,
      organizer,
      maxParticipants,
      availableSeats: maxParticipants, 
      image: image || "",
    });

    res.status(201).json({ success: true, message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all events (with search + category filter)
// @route   GET /api/events?search=...&category=...
export const getEvents = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Apply the category filter if it is not "All" or empty.
    if (category && category !== "All") {
      query.category = category;
    }

    const events = await Event.find(query).sort({ date: 1 }); // Show upcoming events first.

    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update event (Admin only)
// @route   PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const {
      title,
      description,
      category,
      date,
      time,
      location,
      organizer,
      maxParticipants,
      image,
    } = req.body;

    // Update only the fields that were provided.
    event.title = title || event.title;
    event.description = description || event.description;
    event.category = category || event.category;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.organizer = organizer || event.organizer;
    event.image = image !== undefined ? image : event.image;

    // If maxParticipants has changed, adjust availableSeats accordingly.
    if (maxParticipants && maxParticipants !== event.maxParticipants) {
      const registeredCount = event.maxParticipants - event.availableSeats;
      event.maxParticipants = maxParticipants;
      event.availableSeats = maxParticipants - registeredCount;
    }

    const updatedEvent = await event.save();

    res.status(200).json({ success: true, message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete event (Admin only)
// @route   DELETE /api/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    await event.deleteOne();

    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};