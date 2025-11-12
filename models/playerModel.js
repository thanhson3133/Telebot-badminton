const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  date: { type: String, required: true },
  isPlaying: { type: Boolean, default: true },
  remainingFee: { type: Number, default: 0 },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Player", playerSchema);
