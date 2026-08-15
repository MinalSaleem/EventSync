import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  // Check the Authorization header: "Authorization: Bearer <token>".
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded data (user ID) to the request object so controllers can use it.
      req.user = decoded;

      next(); // Everything is valid, proceed to the next middleware.
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Not authorized, no token provided" });
  }
};

export default protect;