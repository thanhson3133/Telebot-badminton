const mongoose = require("./database");
const { Telegraf } = require("telegraf");
const botRoutes = require("./routes/botRoutes");

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected, starting bot...");
  const bot = new Telegraf("8562082576:AAHlOG5tZwHBo4dA-DE8j6C-sB6AGtsYv8Y");
  botRoutes(bot);
  bot.launch();
  console.log("✅ Bot launched");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
