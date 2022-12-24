const PlaylistModel = require('../models/playlistModel')

class PlaylistController {
    static async getPlaylist(mode) {
        const docs = await PlaylistModel.find()
        if (docs.length > 0) {
            switch (mode) {
                case 'all':
                    let playlists = ''
                        docs.forEach((doc, i) => {
                        playlists += `Плейліст №${i+1}: ${doc.link}\n`
                    })
                    return playlists
                default:
                    return docs.pop().link
            }
        }
        return 'Ні одного плейліста ще не додано'
    }

    static async addNewPlaylist(link) {
        try {
            await PlaylistModel.create({
                link: link
            })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

module.exports = PlaylistController
