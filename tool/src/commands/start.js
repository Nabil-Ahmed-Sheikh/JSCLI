const logger = require('../logger')('commands:start')
const fs = require('fs')
const path = require('path')
const extension = require('../extensions')

module.exports = function start(config) {
    fs.readdir(process.cwd(), (err, files) => {
        files.forEach(file => {
            const filePath = path.join(process.cwd(), file)
            // path.extname(filePath) === desiredExtension
            if (fs.statSync(filePath).isFile()) {
                
                if (extension['audio'].includes(path.extname(filePath))) {
                    logger.highlight('Audio')
                } else if (extension['image'].includes(path.extname(filePath))) {
                    logger.highlight('image')
                } else if (extension['doc'].includes(path.extname(filePath))) {
                    logger.highlight('Doc')
                } else {
                    logger.highlight(path.extname(filePath))
                }
                
                // console.log(`${file}`);
            }
        })
        
    })

    logger.highlight('  Starting the app  ')
    logger.debug('Received configuration', config)
}


function makeDirectory (dirName) {
    if(!fs.existsSync(dirName)) {
        logger.highlight(`${dirName} Directory created`)
    }
}