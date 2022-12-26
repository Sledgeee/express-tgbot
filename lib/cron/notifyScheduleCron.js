const BotController = require("../../controllers/botController");
const { CHAT_ID } = require("../bot");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(1, 6, 1);
rule.hour = 7;
rule.minute = 30;
rule.tz = "Europe/Kiev";

const notifySchedule = () => {
  schedule.scheduleJob(notifySchedule.name, rule, async () => {
    console.log(`[CRON] [${notifySchedule.name}]: job working`);
    try {
      await BotController.sendTodaysSchedule(CHAT_ID, false);
    } catch (err) {
      console.log(err);
    }
    console.log(`[CRON] [${notifySchedule.name}]: job done`);
  });
  console.log(`[CRON] [${notifySchedule.name}]: job has scheduled`);
};

module.exports = notifySchedule;
