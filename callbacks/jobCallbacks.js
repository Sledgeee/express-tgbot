const { bot } = require("../lib/bot");
const { jobStatus } = require("../lib/cron");
const jobActionsMarkup = require("../markups/jobActionsMarkup");

bot.on("callback_query", async (callback) => {
  try {
    const containsJob = callback.data.includes("job_");
    if (containsJob) {
      const jName = callback.data.split("_")[1];
      const jStatus = jobStatus(jName);
      await bot.deleteMessage(
        callback.message.chat.id,
        callback.message.message_id
      );
      await bot.sendMessage(
        callback.message.chat.id,
        `[CRON] [${jName}]: ${jStatus}\nОберідь дію: `,
        jobActionsMarkup(jName, jStatus)
      );
    }
  } catch (err) {
    console.log(err);
  }
});
