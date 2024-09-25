import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true, match: /^[a-z_]{1,35}$/, unique:true },
});

export const Label = mongoose.model("Label", schema);
