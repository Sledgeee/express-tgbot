const parseIsu1 = require("../parseIsu1");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 1;
rule.hour = 1;
rule.minute = 0;
rule.tz = "Europe/Kiev";

const job = () => {
  console.log(`[CRON] [${swapWeek.name}]: job is working`);
  try {
    parseIsu1(null, false);
  } catch (err) {
    console.log(err);
  }
  console.log(`[CRON] [${swapWeek.name}]: job is done`);
};

const swapWeek = () => {
  schedule.scheduleJob(swapWeek.name, rule, job);
  console.log(`[CRON] [${swapWeek.name}]: job has scheduled`);
  job();
};

module.exports = swapWeek;
