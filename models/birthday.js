const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema({
    studentName: String,
    date: String
})

const Birthday = mongoose.model('Birthday', birthdaySchema)

module.exports = Birthday
