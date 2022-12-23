const mongoose = require("mongoose");

const weekSchema = new mongoose.Schema({
    type: String
})

const Week = mongoose.model('Week', weekSchema)

const createWeek = async (type) => {
    try {
        const docs = await Week.find()
        if (docs.length > 0) return false
        await Week.create({
            type: type
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = { Week, createWeek }
