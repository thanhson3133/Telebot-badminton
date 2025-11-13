exports.showCommands = (ctx) => {
  const commands = [
    { stt: 1, cmd: "/gohome", desc: "Giờ phút còn lại tới 17:30" },
    { stt: 2, cmd: "/chicken", desc: "Danh sách XH những con gà" },
    { stt: 3, cmd: "/countdown", desc: "Đếm ngày đến Tết 2026 🎉" },
    { stt: 4, cmd: "/addloan", desc: "Tính tiền cầu lông" },
    { stt: 5, cmd: "/deleteloan", desc: "Xoá tiền cầu lông theo ngày" },
    { stt: 6, cmd: "/addnonplayer", desc: "Thêm người không chơi" },
    { stt: 6, cmd: "/addmember", desc: "Thêm thành viên" },
    { stt: 6, cmd: "/listplayer", desc: "Danh sách người chơi" },
    { stt: 6, cmd: "/thanhtoan", desc: "Thanh toán tiền cầu lông" },
    { stt: 6, cmd: "/monthlyreport", desc: "Báo cáo tổng tiền tháng" },
    { stt: 6, cmd: "/yearlyreport", desc: "Báo cáo tổng tiền năm" },
    { stt: 6, cmd: "/xinque", desc: "Xin quẻ" },
    { stt: 4, cmd: "/chucnang", desc: "Hiển thị danh sách các lệnh" },
  ];

  const colSTT = Math.max(...commands.map((i) => i.stt.toString().length), 3);
  const colCmd = Math.max(...commands.map((i) => i.cmd.length), 7);
  const colDesc = Math.max(...commands.map((i) => i.desc.length), 10);

  let msg = "Danh sách chức năng của bot:\n";
  msg += "STT | Lệnh           | Mô tả\n";
  msg += "--- | -------------- | ----------------------------\n";

  commands.forEach((item) => {
    const stt = item.stt.toString().padEnd(colSTT, " ");
    const cmd = item.cmd.padEnd(colCmd, " ");
    const desc = item.desc.padEnd(colDesc, " ");
    msg += `${stt} | ${cmd} | ${desc}\n`;
  });

  ctx.replyWithMarkdown("```\n" + msg + "\n```", {
    reply_to_message_id: ctx.message.message_id,
  });
};
