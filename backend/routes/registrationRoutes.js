import express from "express";
import {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  cancelRegistration,
} from "../controllers/registrationController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// All routes are protected and require authentication.
router.post("/", protect, registerForEvent);
router.get("/my-events", protect, getMyRegistrations);
router.get("/event/:eventId", protect, admin, getEventRegistrations); // admin only
router.delete("/:id", protect, cancelRegistration);

export default router;