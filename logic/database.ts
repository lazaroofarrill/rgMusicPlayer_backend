const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite3'
})

import {SongType} from "./models";

async function connect() {
    await sequelize.authenticate()
        .then(() => {
            console.log("connection established")
        })
        .catch((err: any) => {
            console.log('Unable to connect to database', err)
        })
}

const db = {
    connect,
    init,
    allSongs
}

export {db, Song}

const Song = sequelize.define('song', {title: Sequelize.STRING, author: Sequelize.STRING, path: Sequelize.STRING})

async function init() {
    await sequelize.sync({
        force: true
    }).then(() => {
        console.log('Database & tables created!')

        // Song.bulkCreate([
        //     {title: 'Heart Attack', author: 'Demi Lovato'},
        //     {title: 'Skyscraper', author: 'Demi Lovato'},
        //     {title: 'Give me love', author: 'Ed Sheeran'},
        // ]).then(function () {
        //     return Song.findAll()
        // }).then(function (songs: any[]) {
        //     console.log(songs)
        // })
    })
}

async function allSongs(req: any, res: any) {
    Song.findAll().then((response: SongType[]) => {
        res.send(response)
    })
}
