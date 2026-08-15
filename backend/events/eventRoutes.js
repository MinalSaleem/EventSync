import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes (accessible to everyone).
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin-only routes
router.post("/", protect, admin, createEvent);
router.put("/:id", protect, admin, updateEvent);
router.delete("/:id", protect, admin, deleteEvent);

export default router;