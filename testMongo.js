const mongoose = require("mongoose");

const uri = "mongodb+srv://thanhson123123:thanhson123123@cluster0.zvnobsd.mongodb.net/?appName=Cluster0"

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const badmintonSchema = new mongoose.Schema({
  shuttlecockCount: { type: Number, required: true },
  pricePerShuttlecock: { type: Number, required: true },
  courtFee: { type: Number, required: true },
  playerCount: { type: Number, required: true },
  playerName: { type: String, required: true },
  remainingFee: { type: Number, required: true },
}, { timestamps: true });

const Badminton = mongoose.model("Badminton", badmintonSchema);

// Tạo 1 record thử
async function testInsert() {
  try {
    const record = new Badminton({
      shuttlecockCount: 10,
      pricePerShuttlecock: 20000,
      courtFee: 100000,
      playerCount: 4,
      playerName: "Nguyen Van A",
      remainingFee: 0
    });

    const result = await record.save();
    console.log("✅ Record saved:", result);
  } catch (err) {
    console.error("❌ Error saving record:", err);
  } finally {
    mongoose.connection.close();
  }
}

testInsert();
