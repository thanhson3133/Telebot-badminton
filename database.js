const mongoose = require("mongoose");
const uri = "mongodb+srv://thanhson123123:thanhson123123@cluster0.zvnobsd.mongodb.net/badmintonDB?retryWrites=true&w=majority"

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;
