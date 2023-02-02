const fs = require('fs')
const path = require('path')

function makeDirSync(dirPath) {
    const items = dirPath.split(path.sep)
    for (let index=1; i<=items.length; index++) {
        let dir = items.slice(0, index).join(path.sep)
        try {
            fs.accessSync(dir)
            console.log('有访问权限: ', dir)
        } catch (e) {
            fs.mkdirSync(dir)
            console.log('创建目录: ', dir)
        }
    }
}
makeDirSync('a/b/c')

