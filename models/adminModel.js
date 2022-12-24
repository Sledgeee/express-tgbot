const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: String,
    superRights: Boolean
})

module.exports = mongoose.model('Admin', adminSchema)
