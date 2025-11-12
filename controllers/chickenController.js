const memberModel = require("../models/memberModel");

exports.showChickenList = async (ctx) => {
  try {
    const chickenList = await memberModel.find({}).sort({ _id: 1 }).lean();

    if (!chickenList.length) {
      return ctx.reply("⚠️ Chưa có dữ liệu member nào trong danh sách Chicken.",  {
        reply_to_message_id: ctx.message.message_id
      });
    }

    let msg = "Danh sách Chicken:\n";
    msg += "STT | Tên             | Kinh Nghiệm    | Mô tả.    \n";
    msg += "----| -------------   |----------------|---------- \n";

    chickenList.forEach((item, idx) => {
      const index = (idx + 1).toString().padEnd(3, " ");
      const name = item.username.padEnd(15, " ");
      const exp = (item.experience || "").padEnd(14, " ");
      const des = (item.description || "").padEnd(12, " ");
      msg += `${index} | ${name} | ${exp} | ${des}\n`;
    });

    ctx.replyWithMarkdown("```\n" + msg + "\n```",  {
        reply_to_message_id: ctx.message.message_id
      });
  } catch (err) {
    console.error("❌ Error fetching chicken list:", err);
    ctx.reply("❌ Có lỗi xảy ra khi lấy danh sách Chicken.",  {
        reply_to_message_id: ctx.message.message_id
      });
  }
};
