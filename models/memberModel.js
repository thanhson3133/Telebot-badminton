const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  experience: { type: String, default: "" },
  photoId: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);
