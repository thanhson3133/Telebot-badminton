const queList = [
  "🌸 *Sáng ngủ dậy định làm người tử tế, mà đời không cho phép..*",
  "🌞 *Tôi đã tìm thấy lối thoát trong công việc: thoát vị đĩa đệm.*",
  "🌧 *Ở cái tuổi đáng ra phải đau khổ vì tình. Thì tôi lại đau lưng.*",
  "🌿 *Hãy luôn theo đuổi giấc mơ của bạn, bằng cách tắt báo thức và ngủ tiếp.*",
  "🌕 *Người ta hai bàn tay trắng làm giàu. Còn tôi cũng trắng tay mà làm ra đống nợ.*",
  "🔥 *Gọi em là dân thường, vì gặp em anh sẽ thương dần.*",
  "💎 *Ở nhà em ngoan lắm. Mỗi tội em ít ở nhà.*",
  "🌈 *Mới chơi nói nhẹ cười duyên. Chơi thân mới biết nó điên có nghề!*",
  "🔥 *Không làm đòi có ăn, chỉ có ăn c**.*",
  "🌈 *Sống phải chất, chết phải ngất.*",
  "💎 *Cuộc đời là bể khổ, qua hết bể khổ là đến bể khác!.*",
];

let quePool = [...queList];

const shakeGifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm5zNXg0aWpxMGk3aGV1bmxzeHp4eWxubHBueHQyYjc5YW03cXE0MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UVqyx9c4MAt9U4792j/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NTlreDJvNjkwZmUzY3UzbWtrMGxqZ2c3ZnY1OW15ZjliMXowcW8wMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UIWGwiqNx1C96K8Mx4/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm5zNXg0aWpxMGk3aGV1bmxzeHp4eWxubHBueHQyYjc5YW03cXE0MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT39D2UJcJ663GkPkY/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c2NlOWh1dGF4bDRwY2ptcjVndGJnY3g3dWoxNXRyZnN5bXkzZnNoNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TpesazdB86T2D3meFL/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2UyaW9xZnZvYjZ3OWVxc2s5cnM4aHdhd2xicHMyeDRxNGd2bzdoOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/RziFSD6rE3EhzrFNNt/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Zmk0cGI3amdsbm96NG45MWF6aWpzcG01dDNhaHo5NDJ2dmViaTFjNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nADyC0fEFwBO3hYYQh/giphy.gif"
];

const activeUsers = new Map();

exports.xamQue = async (ctx) => {
  try {
    const userId = ctx.from.id;
    const user = ctx.from.username || ctx.from.first_name;

    if (activeUsers.get(userId)) {
      return ctx.reply(`❌ @${user}, từ từ con đĩ!`);
    }

    activeUsers.set(userId, true);

    if (quePool.length === 0) {
      quePool = [...queList]; 
    }

    const randomIndex = Math.floor(Math.random() * quePool.length);
    const que = quePool.splice(randomIndex, 1)[0]; 

    const gif = shakeGifs[Math.floor(Math.random() * shakeGifs.length)];

    const msg1 = await ctx.replyWithAnimation(gif, {
      caption: `🔮 *${user}* đang lắc quẻ...`,
      parse_mode: "Markdown",
    });

    const loading = ["🔮", "✨", "🌀", "🌕", "🔔"];
    for (let i = 0; i < loading.length; i++) {
      await new Promise(r => setTimeout(r, 500));
      try {
        await ctx.telegram.editMessageCaption(
          msg1.chat.id,
          msg1.message_id,
          undefined,
          `${loading[i]} ${user} đang lắc quẻ ${".".repeat(i + 1)}`,
          { parse_mode: "Markdown" }
        );
      } catch (err) {
        if (err.response && err.response.error_code === 429) {
          const retryAfter = err.response.parameters.retry_after || 1;
          await new Promise(r => setTimeout(r, retryAfter * 1000));
          await ctx.telegram.editMessageCaption(
            msg1.chat.id,
            msg1.message_id,
            undefined,
            `${loading[i]} ${user} đang lắc quẻ ${".".repeat(i + 1)}`,
            { parse_mode: "Markdown" }
          );
        }
      }
    }

    await new Promise(r => setTimeout(r, 1000));

    // Tạo khung quẻ
    function buildFortuneFrame(que) {
      const cleanText = que.toUpperCase().trim();
      const maxWidth = 30;
      const words = cleanText.split(" ");
      const lines = [];
      let currentLine = "";

      for (const word of words) {
        if ((currentLine + word).length > maxWidth) {
          lines.push(currentLine.trim());
          currentLine = word + " ";
        } else {
          currentLine += word + " ";
        }
      }
      if (currentLine) lines.push(currentLine.trim());

      const maxLineLength = Math.max(...lines.map(l => l.length));
      const width = maxLineLength + 6;

      const top = "╔" + "═".repeat(width) + "╗";
      const bottom = "╚" + "═".repeat(width) + "╝";
      const middleLines = lines.map(line => {
        const padded = line
          .padStart(line.length + Math.floor((maxLineLength - line.length) / 2))
          .padEnd(maxLineLength);
        return `║ 🎴 ${padded} 🎴║`;
      });

      return [top, ...middleLines, bottom].join("\n");
    }

    const result = buildFortuneFrame(que);

    await ctx.reply("```\n" + result + "\n```", { parse_mode: "MarkdownV2" });

    activeUsers.delete(userId);
  } catch (err) {
    console.error("❌ Error in xamQue:", err);
    ctx.reply("❌ Có lỗi xảy ra khi rút quẻ.");
    activeUsers.delete(ctx.from.id);
  }
};
