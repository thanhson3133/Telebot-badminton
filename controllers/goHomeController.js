const moment = require("moment-timezone");

exports.timeToGoHome = (ctx) => {
  const user = ctx.message.text?.split(" ")?.[1];
  const now = moment.tz("Asia/Ho_Chi_Minh");

  // Mặc định 17:30
  let targetHour = 17;
  let targetMinute = 30;

  if (user?.toLowerCase() === "cuocthien") {
    targetHour = 18;
    targetMinute = 15;
  }

  const target = now.clone().hour(targetHour).minute(targetMinute).second(0);

  let diff = target.diff(now);

  if (diff <= 0) {
    const msg = `
    🎉🚪 Go away! 🚪🎉
   +------------------+
   |   VUA THUC AN    |
   +------------------+
   |                  |
   |   [    ][    ]   |
   |   [    ][    ]   |
   |                  |
   +------------------+
       O
      /|\\\\  <- Get out!
      / \\\\
    `;
    ctx.replyWithMarkdownV2("```\n" + msg + "\n```");
    return
  }

  const duration = moment.duration(diff);
  const hours = duration.hours();
  const minutes = duration.minutes();

  const msg =
    hours > 0
      ? `${hours}h ${minutes} phút để tới ${targetHour}:${targetMinute} ⏳`
      : `${minutes} phút để tới ${targetHour}:${targetMinute} ⏳`;

  ctx.reply(msg, { reply_to_message_id: ctx.message.message_id });
};
