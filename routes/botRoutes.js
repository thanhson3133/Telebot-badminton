const { countdownToTet } = require("../controllers/countdownController");
const { timeToGoHome } = require("../controllers/goHomeController");
const { showChickenList } = require("../controllers/chickenController");
const { showCommands } = require("../controllers/functionsController");
const { addLoan, deleteLoan } = require("../controllers/addLoanController");
const { addNonPlayer } = require("../controllers/addNonPlayerController");
const { listPlayer } = require("../controllers/listPlayerController");
const {
  addMember,
  updateMember,
} = require("../controllers/addMemberController");
const { payment } = require("../controllers/paymentController");
const { monthlyReport } = require("../controllers/monthlyReport");
const { yearlyReport } = require("../controllers/yearlyReportController");
const {
  memberInfo,
  setPhotoCommand,
} = require("../controllers/memberInfoController");
const { xamQue } = require("../controllers/xinqueController");

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
  bot.command("member", memberInfo);
  bot.command("xinque", xamQue);
  bot.command("minhnguyen", async (ctx) => {
    ctx.replyWithMarkdown("for shit", {
      reply_to_message_id: ctx.message.message_id,
    });
  });

  bot.command("chucnang", showCommands);
  bot.command("setphoto", async (ctx) => {
    try {
      await setPhotoCommand(ctx);
    } catch (err) {
      console.error("setphoto command error:", err);
    }
  });

  bot.on("photo", async (ctx) => {
    if (ctx.message.reply_to_message?.text?.startsWith("/setphoto")) {
      try {
        await setPhotoCommand(ctx);
      } catch (err) {
        console.error("Photo handler error:", err);
      }
    }
  });
  bot.on("text", (ctx) => {
    const text = ctx.message.text;
    if (text.startsWith("/")) {
      const validCommands = [
        "countdown",
        "gohome",
        "chicken",
        "addloan",
        "deleteloan",
        "addnonplayer",
        "addmember",
        "listplayer",
        "thanhtoan",
        "monthlyreport",
        "yearlyreport",
        "updatemember",
        "member",
        "setphoto",
        "chucnang",
      ];

      const cmd = text.split(" ")[0].replace("/", "");
      if (!validCommands.includes(cmd)) {
        ctx.reply(
          `❌ Lệnh không hợp lệ.\nBạn có thể xem danh sách lệnh bằng /chucnang`
        );
      }
    }
  });
};
