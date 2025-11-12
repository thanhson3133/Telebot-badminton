const moment = require("moment-timezone");

const tetDate = moment.tz("2026-02-17 00:00:00", "Asia/Ho_Chi_Minh");

exports.countdownToTet = (ctx) => {
  const now = moment.tz("Asia/Ho_Chi_Minh");

  let diff = tetDate.diff(now);
  if (diff <= 0) {
    ctx.reply("Đã tới Tết 🎉🥳", { reply_to_message_id: ctx.message.message_id });
    return;
  }

  const duration = moment.duration(diff);
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const msg = `Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây sẽ tới Tết 🎉`;
  ctx.reply(msg, { reply_to_message_id: ctx.message.message_id });
};
