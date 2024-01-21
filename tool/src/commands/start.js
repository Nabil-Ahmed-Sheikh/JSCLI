const logger = require('../logger')('commands:start')
const fs = require('fs')
const path = require('path')
const extension = require('../extensions')

module.exports = function start(config) {
    fs.readdir(process.cwd(), (err, files) => {

        // Create Directories
        for (dir in extension){
            makeDirectory(dir)
        }

        // Move Files
        files.forEach(file => {
            const filePath = path.join(process.cwd(), file)
            if (fs.statSync(filePath).isFile()) {
                if (extension['audio'].includes(path.extname(filePath))) {
                    moveFile(filePath, path.join(process.cwd(),'audio',file))
                } else if (extension['image'].includes(path.extname(filePath))) {
                    moveFile(filePath, path.join(process.cwd(),'image',file))
                } else if (extension['doc'].includes(path.extname(filePath))) {
                    moveFile(filePath, path.join(process.cwd(),'doc',file))
                }
            }
        })
        
    })

    logger.highlight('  Files are successfully moved  ')
    logger.debug('Received configuration', config)
}


function makeDirectory (dirName) {
    if(!fs.existsSync(dirName)) {
        fs.mkdirSync(dir)
        logger.highlight(`${dirName} Directory created`)
    }
}

function moveFile (oldPath, newPath) {
    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
      })
}