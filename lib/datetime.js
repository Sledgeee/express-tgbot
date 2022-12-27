const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

class DateTime {
  static make(date) {
    return dayjs(date).tz("Europe/Kiev");
  }

  static makeUtc(date) {
    return dayjs(date).utc();
  }

  static now() {
    return dayjs().tz("Europe/Kiev");
  }

  static nowFormatted() {
    return dayjs().tz("Europe/Kiev").format("DD.MM");
  }

  static nowUtc() {
    return dayjs().utc();
  }

  static nowUtcFormatted() {
    return dayjs().utc().format("DD.MM.YYYY");
  }
}

module.exports = DateTime;
