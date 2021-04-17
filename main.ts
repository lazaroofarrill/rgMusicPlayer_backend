import express from 'express'

import {crawler} from "./logic/crawler";
import {db, Song} from "./logic/database";
import {getFileMetadata} from "./logic/metadata";

const app = express()

app.get('/', (req, res) => {
    res.send('Well done!');
})
app.get('/songs', db.allSongs)


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

