import { AdminUser } from "./../model/admin.user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import _ from "lodash";
const { JWT_SECRET } = process.env; // Secret key for JWT

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Sign-Up Controller
const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (isValidEmail(email) === false)
      return next(createError.BadRequest("Invalid email id"));

    if (_.isEmpty(password))
      return next(createError.BadRequest("Password cannot be empty"));

    if (password.length < 8)
      return next(
        createError.BadRequest(
          "Password should be greater than or equal to 8 characters"
        )
      );

    let user = await AdminUser.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new AdminUser({
      email,
      password,
    });

    await user.save();

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await AdminUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

export { signup, login };
