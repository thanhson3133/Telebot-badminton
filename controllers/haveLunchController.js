const moment = require("moment-timezone");

exports.haveLunch = (ctx) => {
  const user = ctx.message.text?.split(" ")?.[1];
  const now = moment.tz("Asia/Ho_Chi_Minh");

  // Mặc định 17:30
  let targetHour = 12;
  let targetMinute = 0;

  const target = now.clone().hour(targetHour).minute(targetMinute).second(0);

  let diff = target.diff(now);

  if (diff <= 0) {
    const msg = `
    Dậy làm việc đi con đuỹ!
    `;
    ctx.replyWithMarkdownV2("```\n" + msg + "\n```");
    return;
  }

  const duration = moment.duration(diff);
  const hours = duration.hours();
  const minutes = duration.minutes();

  const msg = `Còn ${hours > 0 ? `${hours}h : ${minutes}p` : `${minutes} Phút`}
    `;
  // const msg =
  //   hours > 0
  //     ? `${hours}h ${minutes} phút để tới ${targetHour}:${targetMinute} ⏳`
  //     : `${minutes} phút để tới ${targetHour}:${targetMinute} ⏳`;
  ctx.replyWithMarkdownV2("```\n" + msg + "\n```", {
    reply_to_message_id: ctx.message.message_id,
  });
};
