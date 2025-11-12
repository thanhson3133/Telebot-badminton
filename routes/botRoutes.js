const { countdownToTet } = require("../controllers/countdownController");
const { timeToGoHome } = require("../controllers/goHomeController");
const { showChickenList } = require("../controllers/chickenController");
const { showCommands } = require("../controllers/functionsController");
const { addLoan, deleteLoan } = require("../controllers/addLoanController");
const { addNonPlayer } = require("../controllers/addNonPlayerController");
const { listPlayer } = require("../controllers/listPlayerController");
const { addMember, updateMember } = require("../controllers/addMemberController");
const { payment } = require("../controllers/paymentController");
const { monthlyReport } = require("../controllers/monthlyReport");
const { yearlyReport } = require("../controllers/yearlyReportController");

module.exports = (bot) => {
  bot.command("countdown", countdownToTet);
  bot.command("gohome", timeToGoHome);
  bot.command("chicken", showChickenList);
  bot.command("addloan", addLoan);
  bot.command("deleteloan", deleteLoan);
  bot.command("addnonplayer", addNonPlayer);
  bot.command("addmember", addMember);
  bot.command("listplayer", listPlayer);
  bot.command("thanhtoan", payment);
  bot.command("monthlyreport", monthlyReport);
  bot.command("yearlyreport", yearlyReport);
  bot.command("updatemember", updateMember);
  bot.command("chucnang", showCommands);

  bot.on("text", (ctx) => {
    const text = ctx.message.text;
    if (text.startsWith("/")) {
      ctx.reply(
        `❌ Lệnh không hợp lệ.\nBạn có thể xem danh sách lệnh bằng /chucnang`
      );
    }
  });
};
