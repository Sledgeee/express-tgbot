const AdminModel = require('../models/adminModel')

class AdminController {
    static async addAdmin(username) {
        try {
            await AdminModel.create({
                username: username.replace('@', ''),
                superRights: false,
            })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async checkRights(username) {
        const admin = await AdminModel.findOne({username: username})
        if (admin) {
            if (admin.superRights == true) {
                return { isOwner: true, isAdmin: true }
            } else {
                return { isOwner: false, isAdmin: true }
            }
        }
        return { isOwner: false, isAdmin: false }
    }

    static async getOwner() {
        return await AdminModel.findOne({superRights: true})
    }
}

module.exports = AdminController
