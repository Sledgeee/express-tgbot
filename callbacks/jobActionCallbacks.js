const { bot } = require("../lib/bot");
const { startCron, restartCron, stopCron } = require("../lib/cron");

bot.on("callback_query", async (callback) => {
  try {
    const containsJob = callback.data.includes("jobaction_");
    if (containsJob) {
      const data = callback.data.split("_");
      const action = data[1];
      const jobName = data[2];
      await bot.deleteMessage(
        callback.message.chat.id,
        callback.message.message_id
      );
      switch (action) {
        case "start":
          await bot.sendMessage(callback.message.chat.id, startCron(jobName));
          break;
        case "restart":
          await bot.sendMessage(callback.message.chat.id, restartCron(jobName));
          break;
        case "stop":
          await bot.sendMessage(callback.message.chat.id, stopCron(jobName));
          break;
      }
    }
  } catch (err) {
    console.log(err);
  }
});
