const moment = require("moment-timezone");

const lunarYearDate = moment.tz("2026-02-17 00:00:00", "Asia/Ho_Chi_Minh");
const imagesNewYear = "https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/12/10/dia-diem-ban-phao-hoa-tet-duong-lich-2026-cua-ca-nuoc.jpg";
const imageLunarYear = "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQIX-dLxON3wU4NJryXhSkeVWKQxVTmJ3BUG8x6xVCvX2QOuoOsQOrpMX7is_fY5RwiIrDUXp3tCoprPxKY";
const newYearDate = moment.tz("2026-01-01 00:00:00", "Asia/Ho_Chi_Minh");

exports.countdownToTet = (ctx) => {
  const now = moment.tz("Asia/Ho_Chi_Minh");

  let diff = lunarYearDate.diff(now);
  if (diff <= 0) {
    const caption = `🎉 *Happy New Year* 🎉`;

    ctx.replyWithPhoto(
      { url: imagesNewYear },
      {
        caption,
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message.message_id,
      }
    );
    return;
  }

  const duration = moment.duration(diff);
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const caption = `🎉 *Lunar New Year Countdown* 🎉

*In ${days} days*
Tue, Feb 17, 2026

⏳ Còn *${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây* nữa là tới năm mới! 🎉🎉🎉`;

  ctx.replyWithPhoto(
    { url: imageLunarYear },
    {
      caption,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.message.message_id,
    }
  );
};

exports.countdownToTetTay = (ctx) => {
  const now = moment.tz("Asia/Ho_Chi_Minh");

  let diff = newYearDate.diff(now);
  if (diff <= 0) {
    const caption = `🎉 *Happy New Year* 🎉`;

    ctx.replyWithPhoto(
      { url: imagesNewYear },
      {
        caption,
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message.message_id,
      }
    );
    return;
  }

  const duration = moment.duration(diff);
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const caption = `🎉 *New Year Countdown* 🎉

*In ${days} days*
Thu, January 1, 2026

⏳ Còn *${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây* nữa là tới năm mới! 🎉🎉🎉`;

  ctx.replyWithPhoto(
    { url: imagesNewYear },
    {
      caption,
      parse_mode: "Markdown",
      reply_to_message_id: ctx.message.message_id,
    }
  );
};
