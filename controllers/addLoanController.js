const Badminton = require("../models/badmintonModel");
const memberModel = require("../models/memberModel");
const playerModel = require("../models/playerModel");

exports.addLoan = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);
    if (args.length < 5) {
      return ctx.reply(
        "❌ Cú pháp: /addloan <số cầu> <tiền/trái (nghìn)> <tiền sân (nghìn)> <số người chơi> <dd/mm/yyyy>",
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    }

    const [
      shuttlecockCountRaw,
      pricePerShuttlecockRaw,
      courtFeeRaw,
      playerCountRaw,
      date,
    ] = args;

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      return ctx.reply("❌ Ngày không hợp lệ! Định dạng đúng: dd/mm/yyyy", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const shuttlecockCount = Number(shuttlecockCountRaw);
    const pricePerShuttlecock = Number(pricePerShuttlecockRaw) * 1000;
    const courtFee = Number(courtFeeRaw) * 1000;
    const playerCount = Number(playerCountRaw);

    if (
      isNaN(shuttlecockCount) ||
      isNaN(pricePerShuttlecock) ||
      isNaN(courtFee) ||
      isNaN(playerCount)
    ) {
      return ctx.reply("❌ Các giá trị phải là số!", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    if (playerCount <= 0) {
      return ctx.reply("❌ Số người chơi phải lớn hơn 0!", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const existed = await Badminton.findOne({ date });
    if (existed) {
      return ctx.reply(`⚠️ Buổi chơi ngày ${date} đã tồn tại!`, {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const members = await memberModel.find({});
    if (!members.length) {
      return ctx.reply("⚠️ Không có thành viên nào trong danh sách member!", {
        reply_to_message_id: ctx.message.message_id,
      });
    }

    const remainingFee = Math.floor(
      (shuttlecockCount * pricePerShuttlecock + courtFee) / playerCount
    );

    const badminton = new Badminton({
      shuttlecockCount,
      pricePerShuttlecock,
      courtFee,
      playerCount,
      remainingFee,
      date,
    });

    await badminton.save();

    const players = members.map((m) => ({
      username: m.username,
      fullName: m.fullName,
      date,
      isPlaying: true,
      remainingFee,
      isPaid: false,
    }));

    await playerModel.insertMany(players);

    ctx.reply(
      `✅ Đã thêm buổi chơi ngày ${date}\n` +
        `- Cầu: ${shuttlecockCount}\n` +
        `- Tiền/trái: ${pricePerShuttlecock.toLocaleString()} VNĐ\n` +
        `- Tiền sân: ${courtFee.toLocaleString()} VNĐ\n` +
        `- Số người chơi: ${playerCount}\n` +
        `- Mỗi người: ${remainingFee.toLocaleString()} VNĐ\n` +
        `👥 Đã tạo danh sách ${players.length} người chơi mặc định.`
    );
  } catch (err) {
    console.error("❌ addLoan error:", err);
    ctx.reply("❌ Có lỗi xảy ra khi thêm dữ liệu.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};

exports.deleteLoan = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);
    if (args.length !== 1) {
      return ctx.reply("❌ Nhập đúng cú pháp: /deleteloan <ngày(dd/mm/yyyy)>");
    }

    const date = args[0];
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      return ctx.reply("❌ Ngày không hợp lệ! Dạng đúng: dd/mm/yyyy");
    }

    const deleted = await Badminton.findOneAndDelete({ date });

    if (!deleted) {
      return ctx.reply(`⚠️ Không tìm thấy buổi chơi ngày ${date}.`);
    }

    ctx.reply(`🗑️ Đã xoá thành công buổi chơi ngày ${date}.`);
  } catch (err) {
    console.error(err);
    ctx.reply("❌ Có lỗi xảy ra khi xoá dữ liệu.");
  }
};
