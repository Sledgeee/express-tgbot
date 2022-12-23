const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    link: String,
})

const Playlist = mongoose.model('Playlist', playlistSchema)

const getLatestPlaylist = async (number) => {
    const docs = await Playlist.find()
    if (docs.length > 0) {
        if (number === 0) {
            return { msg: docs.pop().link, status: true }
        }
        if (number < 0) {
            let playlists = ''
            docs.forEach((doc, i) => {
                playlists += `Плейліст №${i+1}: ${doc.link}\n`
            })
            return { msg: playlists, status: true }
        }
        if (docs.length > number - 1) {
            return { msg: docs[number - 1].link, status: true }
        }
        return { msg: 'Номер плейліста більший за їх кількість в базі даних.\nПоказати всі плейлісти?', status: false }
    }
    return { msg: 'Ні одного плейліста ще не додано', status: null }
}

const addNewPlaylist = async (link) => {
    try {
        await Playlist.create({
            link: link
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = { Playlist, getLatestPlaylist, addNewPlaylist }
