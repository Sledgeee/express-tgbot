const { LessonModel, types } = require("../models/lessonModel");
const TeacherController = require("./teacherController");

class LessonController {
  static async findLessonById(id) {
    return await LessonModel.findById(id);
  }

  static async findOneLesson(data) {
    return await LessonModel.findOne(data);
  }

  static async createLesson(name, shortName, typesStr, teachersStr) {
    try {
      const typesArr = typesStr.split(", ");
      const teachersArr = teachersStr.split(", ");
      const lessons = [];
      for (let i = 0; i < typesArr.length; i++) {
        const teacher = await TeacherController.findOne({
          name: teachersArr[i],
        });
        if (!teacher || !types.includes(typesArr[i])) return false;
        lessons.push({
          name: name,
          shortName: shortName,
          type: typesArr[i],
          teacher: teacher.id,
        });
      }
      await LessonModel.create(lessons);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = LessonController;
