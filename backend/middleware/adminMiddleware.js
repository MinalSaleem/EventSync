import User from "../models/User.js";

const admin = async (req, res, next) => {
  try {
    // req.user has already been set by the authMiddleware.
    const user = await User.findById(req.user.id);

    if (user && user.role === "admin") {
      next(); // Check if the user is an admin and proceed.
    } else {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default admin;