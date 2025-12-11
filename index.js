const mongoose = require("./database");
const { Telegraf } = require("telegraf");
const botRoutes = require("./routes/botRoutes");

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected, starting bot...");

  // const bot = new Telegraf("8208782632:AAHOYslILkZc5bhSIZxpyF0qBYIYtfONinE");
  const bot = new Telegraf("8004511736:AAFwcs8ry4XTf-awkUK2H8dqchgcH0_mr6Y");

  bot.telegram.setMyCommands([
    { command: "/gohome", description: "Giờ phút còn lại tới 17:30" },
    { command: "/chicken", description: "Danh sách XH những con gà" },
    { command: "/lunaryear", description: "Đếm ngày đến Tết Nguyên Đán 2026 🎉" },
    { command: "/newyear", description: "Đếm ngày đến Tết Tây 2026 🎉" },
    { command: "/addloan", description: "Tính tiền cầu lông" },
    { command: "/deleteloan", description: "Xoá tiền cầu lông theo ngày" },
    { command: "/addnonplayer", description: "Thêm người không chơi" },
    { command: "/addmember", description: "Thêm thành viên" },
    { command: "/listplayer", description: "Danh sách người chơi" },
    { command: "/thanhtoan", description: "Thanh toán tiền cầu lông" },
    { command: "/monthlyreport", description: "Báo cáo tổng tiền tháng" },
    { command: "/yearlyreport", description: "Báo cáo tổng tiền năm" },
    { command: "/member", description: "Thông tin thành viên" },
    { command: "/setphoto", description: "Thêm ảnh cho thành viên" },
    { command: "/chucnang", description: "Hiển thị danh sách các lệnh" },
  ]);

  botRoutes(bot);
  bot.launch();
  console.log("✅ Bot launched");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
