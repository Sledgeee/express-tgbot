const BirthdayModel = require("../../models/birthdayModel");
const { bot, CHAT_ID } = require("../bot");
const DateTime = require("../datetime");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = "Europe/Kiev";

const job = async () => {
  console.log(`[CRON] [${checkBirthday.name}]: job is working`);
  try {
    const birthdays = await BirthdayModel.find();
    const today = DateTime.nowFormatted();
    for (const birthday of birthdays) {
      if (birthday.date === today) {
        await bot.sendMessage(
          CHAT_ID,
          `${birthday.studentName} сьогодні святкує <b>День Народження!</b>`,
          {
            parse_mode: "HTML",
          }
        );
        await bot.sendSticker(
          CHAT_ID,
          "CAACAgIAAxkBAAEG9LhjpKhQ2FUi31gbecql2Kr89xrLBQAChQIAAkGa3Q37oxVj75ZDnywE"
        );
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log(`[CRON] [${checkBirthday.name}]: job is done`);
  }
};

const checkBirthday = () => {
  schedule.scheduleJob(checkBirthday.name, rule, job);
  console.log(`[CRON] [${checkBirthday.name}]: job has scheduled`);
  job();
};

module.exports = checkBirthday;
