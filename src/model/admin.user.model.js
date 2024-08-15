import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { MODEL_ADMIN_USER } from "../utils/constants.js";

const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the admin user
adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const AdminUser = mongoose.model(MODEL_ADMIN_USER, adminUserSchema);

export { AdminUser };
