const { bot, CHAT_ID } = require("../bot");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.date = 1;
rule.month = 1;
rule.hour = 0;
rule.minute = 0;
rule.tz = "Europe/Kiev";

const job = async () => {
  console.log(`[CRON] [${newYear.name}]: job is working`);
  try {
    await bot.sendAudio(CHAT_ID, "static/van.mp3");
  } catch (err) {
    console.log(err);
  }
  console.log(`[CRON] [${newYear.name}]: job is done`);
};

const newYear = () => {
  schedule.scheduleJob(newYear.name, rule, job);
  console.log(`[CRON] [${newYear.name}]: job has scheduled`);
};

module.exports = newYear;
