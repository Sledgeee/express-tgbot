const BirthdayModel = require("../models/birthdayModel");

class BirthdayController {
  static async addBirthday(studentName, date) {
    try {
      await BirthdayModel.create({
        studentName: studentName,
        date: date,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = BirthdayController;
