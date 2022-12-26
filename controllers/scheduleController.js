const { ScheduleModel, weeks } = require("../models/scheduleModel");
const LessonController = require("./lessonController");
const days = require("../data/days");
const TeacherController = require("./teacherController");
const DateTime = require("../lib/datetime");
const TimetableController = require("./timetableController");
const ft = require("../lib/ft");
const ZoomController = require("./zoomController");

class ScheduleController {
  static async addLessonToSchedule(day, number, lesson, type, week) {
    try {
      const lsson = await LessonController.findOneLesson({
        shortName: lesson,
        type: type,
      });
      if (!lsson || !weeks.includes(week)) return false;
      await ScheduleModel.create({
        day: day,
        dayNumber: days[day],
        number: number,
        week: week,
        lesson: lsson.id,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  static async generateFullPlainSchedule() {
    try {
      const docs = await ScheduleModel.find({}, null, {
        sort: { dayNumber: 1, number: 1 },
      }).populate("lesson");
      if (docs.length > 0) {
        const timetableDocs = await TimetableController.getTimetable();
        let day = docs[0].day;
        let plainText = day + ":\n";
        for (const doc of docs) {
          const teacher = await TeacherController.findById(doc.lesson.teacher);
          if (day != doc.day) {
            day = doc.day;
            plainText += "\n" + day + ":\n";
          }
          plainText += `№${doc.number} (${ft(
            timetableDocs[doc.number - 1].startHour
          )}:${ft(timetableDocs[doc.number - 1].startMinute)}): ${
            doc.lesson.type
          } ${doc.lesson.name}, ${teacher.name}\n`;
        }
        return plainText;
      }
      return "Розклад пар ще не додано ⚠️";
    } catch (err) {
      console.log(err);
      return "Під час генерації розкладу щось пішло не так ❌";
    }
  }

  static async getNearestLesson() {
    try {
      const docs = await ScheduleModel.find({}, null, {
        sort: { dayNumber: 1, number: 1 },
      }).populate("lesson");
      if (docs.length > 0) {
        const date = DateTime.now();
        const timetableDocs = await TimetableController.getTimetable();
        const scheduleDocs = docs.sort((x) => x.dayNumber > date.day());
        const nearestLesson = scheduleDocs[0];
        const nearestStartTime = timetableDocs.filter(
          (x) => x.number === nearestLesson.number
        )[0];
        const time = `${ft(nearestStartTime.startHour)}:${ft(
          nearestStartTime.startMinute
        )}`;
        const dayDiff = nearestLesson.dayNumber - date.day();
        const startDate = DateTime.make(
          date.add(dayDiff, "day").format("YYYY-MM-DD") + ` ${time}`
        );
        const ms = startDate.diff(date, "milliseconds");
        const timeToStart = new Date(ms).toISOString().substring(11, 19);
        const li = {
          number: nearestLesson.number,
          startTime: `${ft(
            timetableDocs[nearestLesson.number - 1].startHour
          )}:${ft(timetableDocs[nearestLesson.number - 1].startMinute)}`,
          ltype: nearestLesson.lesson.type,
          name: nearestLesson.lesson.name,
          teacher: (
            await TeacherController.findById(nearestLesson.lesson.teacher)
          ).name,
        };
        return `Найближка пара:
        №${li.number} (${li.startTime}): ${li.ltype} ${li.name}, ${li.teacher}
        Початок через: ${timeToStart}`;
      }
      return "Розклад пар ще не додано ⚠️";
    } catch (err) {
      console.log(err);
      return "Під час обробки розкладу сталась помилка ❌";
    }
  }

  static async generateTodaysPlainSchedule() {
    try {
      const docs = await ScheduleModel.find({}, null, {
        sort: { dayNumber: 1, number: 1 },
      }).populate("lesson");
      if (docs.length > 0) {
        const timetableDocs = await TimetableController.getTimetable();
        const todaysSchedule = docs.filter(
          (x) => x.dayNumber == DateTime.now().day()
        );
        if (todaysSchedule.length > 0) {
          let plainText = "";
          for (const doc of todaysSchedule) {
            const teacher = await TeacherController.findById(
              doc.lesson.teacher
            );
            plainText += `№${doc.number} (${ft(
              timetableDocs[doc.number - 1].startHour
            )}:${ft(timetableDocs[doc.number - 1].startMinute)}): ${
              doc.lesson.type
            } ${doc.lesson.name}, ${teacher.name}\n`;
          }
          return plainText;
        }
        return "Сьогодні немає пар 🤩";
      }
      return "Розклад пар ще не додано ⚠️";
    } catch (err) {
      console.log(err);
      return "Під час генерації розкладу щось пішло не так ❌";
    }
  }

  static async checkSchedule() {
    try {
      const docs = await ScheduleModel.find({}, null, {
        sort: { dayNumber: 1, number: 1 },
      }).populate("lesson");
      if (docs.length > 0) {
        const now = DateTime.now();
        const td = await TimetableController.getTimetable();
        const todaysSchedule = docs.filter((x) => x.dayNumber === now.day());
        for (const item of todaysSchedule) {
          let hour = td[item.number - 1].startHour;
          let minute = td[item.number - 1].startMinute - 5;
          if (minute < 0) {
            hour -= 1;
            minute += 60;
          }
          if (hour === now.hour() && minute === now.minute()) {
            const teacher = await TeacherController.findById(
              item.lesson.teacher
            );
            const zoom = await ZoomController.findZoom(item.lesson);
            return `⚡️⚡️⚡️ Через 5 хв розпочинається ${item.lesson.type} ${item.lesson.name}, ${teacher.name}\nПосилання: ${zoom}`;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ScheduleController;
