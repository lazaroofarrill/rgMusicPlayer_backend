const mm = require('music-metadata')
const util = require('util')

async function getFileMetadata(file: string) {
    const metadata = await mm.parseFile(file)
    // console.log(util.inspect(metadata), {showHidden: false, depth: null})
    return metadata
}

export {getFileMetadata}
