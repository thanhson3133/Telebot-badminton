const playerModel = require("../models/playerModel");

exports.yearlyReport = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);

    if (args.length !== 1) {
      return ctx.reply("❌ Cú pháp: /yearlyreport <YYYY>", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const [yearStr] = args;
    const year = Number(yearStr);

    if (!year || yearStr.length !== 4) {
      return ctx.reply("❌ Năm không hợp lệ. Format YYYY", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const regex = new RegExp(`^[0-9]{1,2}/[0-9]{1,2}/${year}$`);

    const result = await playerModel.aggregate([
      {
        $match: { date: { $regex: regex } },
      },
      {
        $group: {
          _id: "$username",
          totalFee: { $sum: "$remainingFee" },
        },
      },
      { $sort: { totalFee: -1 } },
    ]);

    if (!result.length) {
      return ctx.reply(`⚠️ Không có dữ liệu cho năm ${year}.`);
    }

    let msg = `Tổng hợp năm ${year}:\n`;
    msg += "Username       | Tổng tiền (VNĐ)\n";
    msg += "---------------|----------------\n";

    result.forEach((item) => {
      const username = item._id.padEnd(15, " ");
      const totalFee = item.totalFee.toLocaleString().padStart(15, " ");
      msg += `${username} | ${totalFee}\n`;
    });

    ctx.replyWithMarkdown("```\n" + msg + "\n```", {
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (err) {
    console.error("❌ Yearly report error:", err);
    ctx.reply("❌ Có lỗi xảy ra khi lấy báo cáo năm.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};
