const mongoose = require("mongoose");

const badmintonSchema = new mongoose.Schema({
  shuttlecockCount: { type: Number, required: true },   // số trái cầu
  pricePerShuttlecock: { type: Number, required: true }, // số tiền trên trái
  courtFee: { type: Number, required: true },           // số tiền sân
  playerCount: { type: Number, required: true }, // số người chơi
  remainingFee: { type: Number, required: true },
  date: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Badminton", badmintonSchema);