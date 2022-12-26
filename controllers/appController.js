const { jobNames } = require("../lib/cron");
const AppModel = require("../models/appModel");

class AppController {
  static async applyDefaultSettings() {
    try {
      await AppModel.create({
        cron: {
          startOnStartup: true,
          jobs: [
            {
              name: jobNames.checkBirthday,
              startOnStartup: true,
            },
            {
              name: jobNames.checkSchedule,
              startOnStartup: false,
            },
            {
              name: jobNames.notifySchedule,
              startOnStartup: false,
            },
            {
              name: jobNames.swapWeek,
              startOnStartup: true,
            },
          ],
        },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = AppController;
