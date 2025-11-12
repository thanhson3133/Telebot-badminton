const memberModel = require("../models/memberModel");

exports.addMember = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1); 

    if (args.length === 0) {
      return ctx.reply("❌ Cú pháp:`/addmember _` hoặc `/addmember username kinhnghiem mota`",  {
        reply_to_message_id: ctx.message.message_id
      });
    }

    let username;
    let fullName;
    let experience = "";
    let description = "";

    if (args[0] === "_") {
      const user = ctx.message.from;
      username = user.username || `id${user.id}`;
      fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
      experience = args[1] || "";
      description = args.slice(2).join(" ") || "";
    } else {
      username = args[0];
      experience = args[1] || "";
      description = args.slice(2).join(" ") || "";
      fullName = username; 
    }

    const existed = await memberModel.findOne({ username });
    if (existed) {
      return ctx.reply(`⚠️ Thành viên @${username} đã tồn tại trong danh sách!`,  {
        reply_to_message_id: ctx.message.message_id
      });
    }

    const newMember = await memberModel.create({
      username,
      fullName,
      experience,
      description,
    });

    ctx.reply(
      `✅ Đã thêm thành viên:\n` +
      `👤 *${newMember.fullName}*\n` +
      `🧩 Username: @${newMember.username}\n` +
      `🏸 Kinh nghiệm: ${newMember.experience || "Không có"}\n` +
      `📋 Mô tả: ${newMember.description || "Không có"}`
    );
  } catch (err) {
    console.error("❌ Error adding member:", err);
    ctx.reply("❌ Lỗi khi thêm thành viên.",  {
        reply_to_message_id: ctx.message.message_id
      });
  }
};

exports.updateMember = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);
    if (args.length < 2) {
      return ctx.reply("❌ Cú pháp: `/update username kinhnghiem mota`",  {
        reply_to_message_id: ctx.message.message_id
      });
    }

    const username = args[0];
    const experience = args[1] || "";
    const description = args.slice(2).join(" ") || "";

    const member = await memberModel.findOne({ username });
    if (!member) {
      return ctx.reply(`❌ Không tìm thấy thành viên @${username} trong danh sách.`,  {
        reply_to_message_id: ctx.message.message_id
      });
    }

    member.experience = experience;
    member.description = description;

    await member.save();

    ctx.reply(
      `✅ Đã cập nhật thành viên @${username}:\n` +
      `🏸 Kinh nghiệm: ${member.experience || "Không có"}\n` +
      `📋 Mô tả: ${member.description || "Không có"}`
    );
  } catch (err) {
    console.error("❌ Error updating member:", err);
    ctx.reply("❌ Lỗi khi cập nhật thành viên.",  {
        reply_to_message_id: ctx.message.message_id
      });
  }
};