const playerModel = require("../models/playerModel");

exports.payment = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);

    if (args.length !== 2) {
      return ctx.reply(
        "❌ Cú pháp: /thanhtoan <username hoặc _> <dd/mm/yyyy>",
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    }

    let [username, dateStr] = args;

    if (username === "_") {
      if (!ctx.from || !ctx.from.username) {
        return ctx.reply("❌ Không tìm thấy username người nhắn lệnh.", {
          reply_to_message_id: ctx.message.message_id,
        });
      }
      username = ctx.from.username;
    }

    const dateParts = dateStr.split("/");
    if (dateParts.length !== 3) {
      return ctx.reply("❌ Ngày không hợp lệ. Format dd/mm/yyyy", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const players = await playerModel.find({
      username,
      date: dateStr,
      isPaid: false,
    });

    if (!players.length) {
      return ctx.reply(
        `⚠️ Không tìm thấy người chơi ${username} ngày ${dateStr} hoặc đã thanh toán.`
      );
    }

    await playerModel.updateMany(
      { username, date: dateStr, isPaid: false },
      { $set: { isPaid: true } }
    );

    ctx.reply(`✅ Người chơi ${username} đã thanh toán cho ngày ${dateStr}.`, {
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (err) {
    console.error("❌ Payment error:", err);
    ctx.reply("❌ Có lỗi xảy ra khi cập nhật thanh toán.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};
