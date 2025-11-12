const mongoose = require("./database");
const { Telegraf } = require("telegraf");
const botRoutes = require("./routes/botRoutes");

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected, starting bot...");
  const bot = new Telegraf("8208782632:AAHOYslILkZc5bhSIZxpyF0qBYIYtfONinE");
  botRoutes(bot);
  bot.launch();
  console.log("✅ Bot launched");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
