const { ScheduleModel, weeks } = require("../models/scheduleModel");
const LessonController = require("./lessonController");
const days = require("../data/days");
const TeacherController = require("./teacherController");
const DateTime = require("../lib/datetime");
const TimetableController = require("./timetableController");
const ft = require("../lib/ft");
const ZoomController = require("./zoomController");
const WeekController = require("./weekController");

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
        const week = await WeekController.getWeek();
        const timetableDocs = await TimetableController.getTimetable();
        let day = docs[0].day;
        let plainText = `<b>Цього тижня пари по ${week}у\n${day}:</b>\n`;
        for (const doc of docs) {
          const teacher = await TeacherController.findById(doc.lesson.teacher);
          if (day != doc.day) {
            day = doc.day;
            plainText += `\n<b>${day}</b>:\n`;
          }
          if (doc.week === week || doc.week === "-") {
            plainText += `№${doc.number} (${ft(
              timetableDocs[doc.number - 1].startHour
            )}:${ft(timetableDocs[doc.number - 1].startMinute)}): ${
              doc.lesson.type
            } ${doc.lesson.name}, ${teacher.name}\n`;
          }
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
        const week = await WeekController.getWeek();
        const nearestLesson = docs
          .filter((x) => x.week === week || x.week === "-")
          .filter(
            (x) => x.dayNumber === date.day() || x.dayNumber > date.day()
          )[0];
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
        const total = Date.parse(startDate) - Date.parse(date);
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const timeToStart = `${ft(hours)}:${ft(minutes)}:${ft(seconds)}`;
        const li = {
          number: nearestLesson.number,
          startTime: `${ft(
            timetableDocs[nearestLesson.number - 1].startHour
          )}:${ft(timetableDocs[nearestLesson.number - 1].startMinute)}`,
          type: nearestLesson.lesson.type,
          name: nearestLesson.lesson.name,
          teacher: (
            await TeacherController.findById(nearestLesson.lesson.teacher)
          ).name,
        };
        return (
          "Найближка пара:\n" +
          `№${li.number} (${li.startTime}): ${li.type} ${li.name}, ${li.teacher}\n\n` +
          `Початок через: ${timeToStart}`
        );
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
        const week = await WeekController.getWeek();
        const todaysSchedule = docs.filter(
          (x) => x.dayNumber == DateTime.now().day()
        );
        if (todaysSchedule.length > 0) {
          let plainText = `Сьогодні пари по ${week}у:\n`;
          for (const doc of todaysSchedule) {
            if (doc.week !== week && doc.week !== "") continue;
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
        const week = await WeekController.getWeek();
        const td = await TimetableController.getTimetable();
        const todaysSchedule = docs
          .filter((x) => x.dayNumber === now.day())
          .filter((x) => x.week === week || x.week === "-");
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
