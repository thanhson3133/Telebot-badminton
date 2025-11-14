const Daily = require("../models/dailyModel");

const validDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const today = () => validDays[new Date().getDay() - 1]; // Thứ 2 = 1

async function isChatAdmin(ctx) {
  try {
    const member = await ctx.telegram.getChatMember(
      ctx.chat.id,
      ctx.message.from.id
    );
    return ["administrator", "creator"].includes(member.status);
  } catch (err) {
    console.error("Admin check error:", err);
    return false;
  }
}

// ============================
// 📌 SET PHOTO DAILY
// ============================
async function setPhotoDaily(ctx) {
  if (!ctx.message.reply_to_message?.photo) {
    return ctx.reply("❌ Hãy reply vào 1 tấm hình để set photo!");
  }

  const args = ctx.message.text.split(" ");
  const dayArg = args[1]?.toLowerCase();
  let day = validDays.includes(dayArg) ? dayArg : today();
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

  await Daily.findOneAndUpdate(
    { day },
    {
      day,
      photoId: fileId,
      updated_at: new Date(),
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  ctx.reply(`✅ Đã đặt hình cho *${day.toUpperCase()}*!`, {
    parse_mode: "Markdown",
  });
}

async function getPhotoDailyByDay(ctx, day) {
  const data = await Daily.findOne({ day });

  if (!data) {
    return ctx.reply(`⚠️ Chưa có hình cho ngày *${day.toUpperCase()}*!`, {
      parse_mode: "Markdown",
    });
  }

  return ctx.replyWithPhoto(data.photoId, {
    caption: `📅 *${day.toUpperCase()}*\n🙂 *${data.mood}*`,
    parse_mode: "Markdown",
  });
}

// ============================
// 📌 LIST ALL PHOTOS
// ============================
async function listPhotoDaily(ctx) {
  const data = await Daily.find({});

  if (!data.length) return ctx.reply("⚠️ Chưa có hình nào trong tuần.");

  for (const item of data) {
    await ctx.replyWithPhoto(item.photoId, {
      caption: `📅 *${item.day.toUpperCase()}*`,
      parse_mode: "Markdown",
    });
  }
}

// ============================
// 📌 DELETE PHOTO DAILY
// ============================
async function deletePhotoDaily(ctx) {
  const args = ctx.message.text.split(" ");
  const day = args[1]?.toLowerCase();

  if (!validDays.includes(day)) {
    return ctx.reply("❌ Ngày không hợp lệ! Dùng: monday – friday");
  }

  const deleted = await Daily.findOneAndDelete({ day });

  if (!deleted) {
    return ctx.reply(`⚠️ Không tìm thấy hình của ${day.toUpperCase()}.`);
  }

  ctx.reply(`🗑️ Đã xoá hình của *${day.toUpperCase()}*!`, {
    parse_mode: "Markdown",
  });
}

module.exports = {
  setPhotoDaily,
  listPhotoDaily,
  deletePhotoDaily,
  getPhotoDailyByDay,
  validDays,
  today,
  isChatAdmin,
};
