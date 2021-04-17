"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawler = void 0;
var fdir_1 = require("fdir");
var crawler = new fdir_1.fdir().withFullPaths().crawl("/media/lazt/Data2/Music");
exports.crawler = crawler;
