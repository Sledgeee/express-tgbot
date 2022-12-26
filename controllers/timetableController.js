const TimetableModel = require("../models/timetableModel");
const ft = require("../lib/ft");

class TimetableController {
  static async createPlainTimetable() {
    try {
      const docs = await TimetableModel.find({}, null, { sort: { number: 1 } });
      let plainText = "";
      if (docs.length > 0) {
        docs.forEach((doc) => {
          const lesson = `№${doc.number}:`;
          const start = `${ft(doc.startHour)}:${ft(doc.startMinute)}-${ft(
            doc.endHour
          )}:${ft(doc.endMinute)}`;
          const breakStr = doc.break > 0 ? `(перерва ${doc.break} хв)` : "";
          plainText += `${lesson} ${start} ${breakStr}\n`;
        });
        return plainText;
      }
      return "Графік пар ще не додано ⚠️";
    } catch (err) {
      console.log(err);
      return "Під час генерації графіку пар сталась помилка ❌";
    }
  }

  static async getTimetable() {
    try {
      return await TimetableModel.find({}, null, { sort: { number: 1 } });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TimetableController;
