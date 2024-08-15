import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

// Middleware to authenticate the token
const authMiddleware = (req, res, next) => {
  // Get the token from the header
  const token = req.header("Authorization");

  if (!token) {
    return next(createHttpError.Unauthorized("No token, authorization denied"));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user to the request object for later use
    req.user = decoded.user;
    next();
  } catch (err) {
    return next(createHttpError.Unauthorized("Token is not valid"));
  }
};

export { authMiddleware };
