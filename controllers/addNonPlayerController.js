const Member = require("../models/memberModel");
const Badminton = require("../models/badmintonModel");
const Player = require("../models/playerModel");

exports.addNonPlayer = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);
    if (args.length !== 2) {
      return ctx.reply("❌ Cú pháp: /addnonplayer <username> <dd/mm/yyyy>", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const [username, date] = args;
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      return ctx.reply("❌ Ngày không hợp lệ! Dạng đúng: dd/mm/yyyy", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const member = await Member.findOne({ username });
    if (!member) {
      return ctx.reply(
        `❌ Không tìm thấy thành viên "${username}" trong danh sách.`,
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    }

    const badminton = await Badminton.findOne({ date });
    if (!badminton) {
      return ctx.reply(`❌ Không tìm thấy buổi chơi ngày ${date}.`, {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const player = await Player.findOne({ username, date });
    if (!player) {
      return ctx.reply(
        `❌ Người chơi "${username}" không có trong danh sách ngày ${date}.`,
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    }

    player.isPlaying = false;
    player.remainingFee = 0;
    player.isPaid = true;
    await player.save();

    ctx.reply(
      `✅ Đã cập nhật: "${username}" KHÔNG chơi ngày ${date} (đã miễn phí).`
    );
  } catch (err) {
    console.error("❌ addNonPlayer error:", err);
    ctx.reply("❌ Có lỗi xảy ra khi cập nhật dữ liệu.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};
