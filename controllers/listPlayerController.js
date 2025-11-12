const playerModel = require("../models/playerModel");

exports.listPlayer = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);
    if (args.length !== 1) {
      return ctx.reply("❌ Cú pháp: /listplayer <dd/mm/yyyy>", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const date = args[0];
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      return ctx.reply("❌ Ngày không hợp lệ! Định dạng: dd/mm/yyyy", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const players = await playerModel.find({ date });

    if (!players.length) {
      return ctx.reply(`⚠️ Không tìm thấy người chơi ngày ${date}`);
    }

    const colUsername = Math.max(...players.map((p) => p.username.length), 9);
    const colFee = Math.max(
      ...players.map(
        (p) =>
          (p.isPaid || !p.isPlaying ? 0 : p.remainingFee).toLocaleString()
            .length
      ),
      7
    );

    let msg = `Danh sách người chơi ngày ${date}:\n`;
    msg +=
      "Username".padEnd(colUsername, " ") +
      " | " +
      "Số tiền".padEnd(colFee, " ") +
      " | " +
      "Thanh toán\n";

    msg +=
      "-".repeat(colUsername + 1) +
      "|" +
      "-".repeat(colFee + 2) +
      "|" +
      "-".repeat(10) +
      "\n";

    players.forEach((p, index) => {
      const username = p.username.padEnd(colUsername, " ");
      const fee = (p.isPaid || !p.isPlaying ? 0 : p.remainingFee)
        .toLocaleString()
        .padEnd(colFee, " ");
      const paidStatus = p.isPaid ? "✅" : "❌";

      msg += `${username} | ${fee} | ${paidStatus}\n`;
    });

    ctx.replyWithMarkdownV2("```\n" + msg + "\n```", {
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (err) {
    console.error("❌ listPlayer error:", err);
    ctx.reply("❌ Có lỗi xảy ra khi lấy danh sách người chơi.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};
