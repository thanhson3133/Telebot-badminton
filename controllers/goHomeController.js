exports.timeToGoHome = (ctx) => {
  const now = new Date();
  const target = new Date();
  target.setHours(17, 30, 0, 0);

  let diff = target - now;
  if (diff <= 0) {
    ctx.reply("Hết giờ làm ✅", {
      reply_to_message_id: ctx.message.message_id,
    });
    return;
  }

  const totalMinutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const msg =
    hours > 0
      ? `${hours}h ${minutes} phút để tới 17:30 ⏳`
      : `${minutes} phút để tới 17:30 ⏳`;
  ctx.reply(msg, {
    reply_to_message_id: ctx.message.message_id,
  });
};
