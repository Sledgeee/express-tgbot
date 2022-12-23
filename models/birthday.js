const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema({
    studentName: String,
    date: String
})

const Birthday = mongoose.model('Birthday', birthdaySchema)

const addBirthday = async (studentName, date) => {
    try {
        await Birthday.create({
            studentName: studentName,
            date: date
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = { Birthday, addBirthday }
