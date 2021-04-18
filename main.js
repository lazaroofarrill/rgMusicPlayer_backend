"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = require("./logic/database");
var Sequelize = require('sequelize');
var fs = require('fs');
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('Well done!');
});
app.get('/songs', database_1.db.allSongs);
app.get('/songs/search', function (req, res) {
    var _a, _b, _c;
    var Op = Sequelize.Op;
    database_1.Song.findAll({
        where: (_a = {},
            _a[Op.or] = {
                title: (_b = {}, _b[Op.like] = '%' + req.query.q + '%', _b),
                author: (_c = {}, _c[Op.like] = '%' + req.query.q + '%', _c),
            },
            _a)
    }).then(function (songs) { return res.json(songs); });
});
app.get('/songs/:id', function (req, res) {
    database_1.Song.findAll({ where: { id: req.params.id } }).then(function (song) { return res.json(song); });
});
app.get('/play/:id', function (req, res) {
    database_1.Song.findAll({ where: { id: req.params.id } }).then(function (song) {
        if (song.length !== 0) {
            var stat = fs.statSync(song[0].path);
            res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
            var readStream = fs.createReadStream(song[0].path);
            readStream.pipe(res);
        }
    });
});
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
