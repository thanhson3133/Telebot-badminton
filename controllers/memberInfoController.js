const memberModel = require("../models/memberModel");
exports.setPhotoCommand = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);
    if (!args.length) {
      return ctx.reply(
        "❌ Cú pháp: /setphoto <username> hoặc /setphoto _ để set ảnh chính mình",
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    }

    let username;
    if (args[0] === "_") {
      const user = ctx.message.from;
      username = user.username || `id${user.id}`;
    } else {
      username = args[0];
    }

    const member = await memberModel.findOne({ username });
    if (!member) {
      return ctx.reply(
        `❌ Không tìm thấy user @${username} trong danh sách member`,
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    }

    let fileId;

    // Nếu reply ảnh
    if (ctx.message.reply_to_message?.photo?.length) {
      const photos = ctx.message.reply_to_message.photo;
      fileId = photos[photos.length - 1].file_id;
    }
    // Nếu ảnh đi kèm lệnh
    else if (ctx.message.photo?.length) {
      fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    } else {
      return ctx.reply(
        "❌ Không tìm thấy ảnh. Hãy reply ảnh hoặc gửi ảnh trước lệnh.",
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    }

    member.photoId = fileId;
    await member.save();

    ctx.reply(`✅ Ảnh của *@${username}* đã được cập nhật.`, {
      parse_mode: "Markdown",
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (err) {
    console.error("setPhotoCommand error:", err);
    ctx.reply("❌ Có lỗi khi cập nhật ảnh.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};

exports.memberInfo = async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);
    if (!args.length)
      return ctx.reply("❌ Cú pháp: /member <username>", {
        reply_to_message_id: ctx.message.message_id,
      });

    const username = args[0];
    const member = await memberModel.findOne({ username });
    if (!member)
      return ctx.reply(`❌ Không tìm thấy user @${username}`, {
        reply_to_message_id: ctx.message.message_id,
      });

    const caption =
      `👤 *${member.fullName}*\n` +
      `🧩 Username: @${member.username}\n` +
      `🏸 Kinh nghiệm: ${member.experience || "Không có"}\n` +
      `📋 Mô tả: ${member.description || "Không có"}`;

    if (member.photoId) {
      ctx.replyWithPhoto(member.photoId, {
        caption,
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message.message_id,
      });
    } else {
      ctx.reply(caption, {
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } catch (err) {
    console.error("memberInfo error:", err);
    ctx.reply("❌ Có lỗi khi hiển thị thông tin member.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};
