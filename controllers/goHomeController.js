const moment = require("moment-timezone");

exports.timeToGoHome = (ctx) => {
  const now = moment.tz("Asia/Ho_Chi_Minh");
  const target = now.clone().hour(17).minute(30).second(0);

  let diff = target.diff(now);
  if (diff <= 0) {
    ctx.reply("Hết giờ làm ✅", { reply_to_message_id: ctx.message.message_id });
    return;
  }

  const duration = moment.duration(diff);
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  const msg = hours > 0 ? `${hours}h ${minutes} phút để tới 17:30 ⏳` : `${minutes} phút để tới 17:30 ⏳`;
  ctx.reply(msg, { reply_to_message_id: ctx.message.message_id });
};
