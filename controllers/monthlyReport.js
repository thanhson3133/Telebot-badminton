const playerModel = require("../models/playerModel");

exports.monthlyReport = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);

    if (args.length !== 1) {
      return ctx.reply("❌ Cú pháp: /monthlyreport <mm/yyyy>", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const [monthYear] = args;
    const [month, year] = monthYear.split("/").map(Number);

    if (!month || !year || month < 1 || month > 12) {
      return ctx.reply("❌ Tháng không hợp lệ. Format mm/yyyy", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const monthStr = month.toString().padStart(2, "0");
    const regex = new RegExp(`^[0-9]{1,2}/${monthStr}/${year}$`);

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
      return ctx.reply(`⚠️ Không có dữ liệu cho tháng ${monthYear}.`);
    }

    let msg = `Tổng hợp tháng ${monthYear}:\n`;
    msg += "Username       | Tổng tiền (VNĐ)\n";
    msg += "---------------|----------------\n";

    result.forEach((item) => {
      const username = item._id.padEnd(14, " ");
      const totalFee = item.totalFee.toLocaleString().padStart(15, " ");
      msg += `${username} | ${totalFee ? totalFee : 0}\n`;
    });

    ctx.replyWithMarkdown("```\n" + msg + "\n```", {
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (err) {
    console.error("❌ Monthly report error:", err);
    ctx.reply("❌ Có lỗi xảy ra khi lấy báo cáo tháng.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};
