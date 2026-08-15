import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // The token will remain valid for 7 days.
  });
};

export default generateToken;