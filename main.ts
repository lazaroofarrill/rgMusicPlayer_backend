import express from 'express'
import {db, Song} from "./logic/database";
import {SongType} from "./logic/models";

const Sequelize = require('sequelize')

const fs = require('fs')

const app = express()

app.get('/', (req, res) => {
    res.send('Well done!');
})
app.get('/songs', db.allSongs)
app.get('/songs/search', function (req, res) {
    const Op = Sequelize.Op
    Song.findAll({
        where: {
            [Op.or]: {
                title: {[Op.like]: '%' + req.query.q + '%'},
                author: {[Op.like]: '%' + req.query.q + '%'},
            }
        }
    }).then((songs: SongType[]) => res.json(songs))
})

app.get('/songs/:id', function (req, res) {
    Song.findAll({where: {id: req.params.id}}).then((song: SongType[]) => res.json(song))
})

app.get('/play/:id', function (req, res) {
    Song.findAll({where: {id: req.params.id}}).then((song: SongType[]) => {
        if (song.length !== 0) {
            const stat = fs.statSync(song[0].path)
            res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            })
            const readStream = fs.createReadStream(song[0].path)
            readStream.pipe(res)
        }
    })
})


app.listen(3000, () => {
    console.log('The application is listening on port 3000!')
})

// crawler.withPromise()
// db.connect()
console.log()
// Promise.all([crawler.withPromise(), db.init(), db.connect()]).then((value) => {
//     (async () => {
//         // @ts-ignore
//         let result: any = await Promise.all(value[0].filter(x => x.endsWith('.mp3')).map(async function (x: string) {
//             const metadata = await getFileMetadata(x.toString())
//             return {
//                 title: metadata.common.title,
//                 author: metadata.common.artist,
//                 path: x
//             }
//         }))
//         await Song.bulkCreate(
//             result
//         )
//     })()
// })

