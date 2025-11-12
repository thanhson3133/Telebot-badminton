const tetDate = new Date("2026-01-31T00:00:00");

exports.countdownToTet = (ctx) => {
  const now = new Date();
  let diff = tetDate - now;

  if (diff <= 0) {
    ctx.reply("Đã tới Tết 🎉🥳", {
      reply_to_message_id: ctx.message.message_id,
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const msg = `Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây sẽ tới Tết 🎉`;
  ctx.reply(msg, {
    reply_to_message_id: ctx.message.message_id,
  });
};
