const schedule = require("node-schedule");
const dynamicMarkup = require("../../markups/dynamicMarkup");
const AppModel = require("../../models/appModel");

const jobNames = {
  checkBirthday: "checkBirthday",
  swapWeek: "swapWeek",
  checkSchedule: "checkSchedule",
  notifySchedule: "notifySchedule",
  newYear: "newYear",
};
const jobs = [
  [require(`./${jobNames.checkBirthday}Cron`), jobNames.checkBirthday],
  [require(`./${jobNames.swapWeek}Cron`), jobNames.swapWeek],
  [require(`./${jobNames.checkSchedule}Cron`), jobNames.checkSchedule],
  [require(`./${jobNames.notifySchedule}Cron`), jobNames.notifySchedule],
  [require(`./${jobNames.newYear}Cron`), jobNames.newYear],
];

const setupCron = async () => {
  const config = (await AppModel.find()).pop().cron;
  if (config.startOnStartup) {
    for (const job of jobs) {
      for (const cfgJob of config.jobs) {
        if (job[1] === cfgJob.name && cfgJob.startOnStartup) {
          job[0]();
          break;
        }
      }
    }
  }
};

const startCron = (name) => {
  if (Object.keys(schedule.scheduledJobs)?.includes(name))
    return "Помилка запуску, задача вже працює ❌";
  for (const job of jobs) {
    if (job[1] === name) {
      job[0]();
      return "Задача запущена ✅";
    }
  }
  return "Такої задачі не існує ❌";
};

const restartCron = (name) => {
  const stopped = stopCron(name);
  if (stopped === "Задача зупинена ✅") {
    startCron(name);
    return "Задача перезапущена ✅";
  }
  return "Сталась помилка під час перезапуску задачі, спробуйте ще раз ❌";
};

const stopCron = (name) => {
  return schedule.scheduledJobs[name]?.cancel()
    ? "Задача зупинена ✅"
    : "Помилка зупинення, задача вже зупинена ❌";
};

const getJobsMenu = () => {
  const keyboardItems = [];
  for (const job of jobs) {
    keyboardItems.push([
      {
        text: `${job[1]}`,
        callback_data: `job_${job[1]}`,
      },
    ]);
  }
  return dynamicMarkup(keyboardItems);
};

const jobStatus = (name) => {
  return Object.keys(schedule.scheduledJobs).includes(name) ? "✅" : "❌";
};

const jobsStatus = () => {
  let statusText = "";
  const keys = Object.keys(schedule.scheduledJobs);
  for (const job of jobs) {
    statusText += `[CRON] [${job[1]}]: ${
      keys.includes(job[1]) ? "✅" : "❌"
    }\n`;
  }
  return statusText;
};

module.exports = {
  jobNames,
  setupCron,
  startCron,
  restartCron,
  stopCron,
  getJobsMenu,
  jobStatus,
  jobsStatus,
};
