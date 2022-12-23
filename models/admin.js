const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: String,
    superRights: Boolean
})

const Admin = mongoose.model('Admin', adminSchema)

const addAdmin = async (username) => {
    try {
        await Admin.create({
            username: username,
            superRights: false,
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

const checkRights = async (username) => {
    const admin = await Admin.findOne({username: username})
    if (admin) {
        if (admin.superRights == true) {
            return { isOwner: true, isAdmin: true }
        } else {
            return { isOwner: false, isAdmin: true }
        }
    }
    return { isOwner: false, isAdmin: false }
}

module.exports = { Admin, checkRights, addAdmin }
