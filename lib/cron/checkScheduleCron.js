const BotController = require("../../controllers/botController");
const { CHAT_ID } = require("../bot");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(1, 6, 1);
rule.hour = new schedule.Range(7, 20, 1);
rule.minute = new schedule.Range(0, 55, 5);
rule.tz = "Europe/Kiev";

const job = async () => {
  console.log(`[CRON] [${checkSchedule.name}]: job is working`);
  try {
    await BotController.sendLessonStarting(CHAT_ID);
  } catch (err) {
    console.log(err);
  }
  console.log(`[CRON] [${checkSchedule.name}]: job is done`);
};

const checkSchedule = () => {
  schedule.scheduleJob(checkSchedule.name, rule, job);
  console.log(`[CRON] [${checkSchedule.name}]: job has scheduled`);
  job();
};

module.exports = checkSchedule;
