const parseIsu1 = require("../parseIsu1");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 1;
rule.hour = 1;
rule.minute = 0;
rule.tz = "Europe/Kiev";

const swapWeek = () => {
  schedule.scheduleJob(swapWeek.name, rule, () => {
    console.log(`[CRON] [${swapWeek.name}]: job is working`);
    try {
      parseIsu1(null, false);
    } catch (err) {
      console.log(err);
    }
    console.log(`[CRON] [${swapWeek.name}]: job is done`);
  });
  console.log(`[CRON] [${swapWeek.name}]: job has scheduled`);
};

module.exports = swapWeek;
