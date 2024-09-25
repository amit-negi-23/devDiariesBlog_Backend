import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z0-9_-]{3,25}$/,
  },
  name: { type: String, required: true, match: /^[a-zA-Z\s]{3,25}$/ },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    index: true,
  },
  password: {
    type: String,
    required: true,
    // match:
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // ,
  },
  // confirm_password: { type: String, required: true }
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

export const User = mongoose.model("User", schema);
