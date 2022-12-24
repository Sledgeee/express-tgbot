const TeacherModel = require('../models/teacherModel')

class TeacherController {
    static async findOne(name) {
        console.log(name)
        return await TeacherModel.findOne({name: name})
    }

    static async createTeacher(teacher) {
        try {
            await TeacherModel.create({
                name: teacher
            })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

module.exports = TeacherController
