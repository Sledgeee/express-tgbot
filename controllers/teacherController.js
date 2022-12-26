const TeacherModel = require("../models/teacherModel");

class TeacherController {
  static async findById(id) {
    return await TeacherModel.findById(id);
  }

  static async findOne(data) {
    return await TeacherModel.findOne(data);
  }

  static async createTeacher(teacher) {
    try {
      await TeacherModel.create({
        name: teacher,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = TeacherController;
