"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = require("./logic/database");
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('Well done!');
});
app.get('/songs', database_1.db.allSongs);
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
// crawler.withPromise()
// db.connect()
console.log();
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
