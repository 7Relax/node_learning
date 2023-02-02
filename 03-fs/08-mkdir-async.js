const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// 将 access 与 mkdir 处理成 async... 风格
const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

async function myMkdir(dirPath, cb) {
    const parts = dirPath.split(path.sep)
    for(let index=1; index<=parts.length; index++) {
        // 组装当前要创建的目录
        let current = parts.slice(0, index).join(path.sep)
        try {
            await access(current) 
        } catch (error) {
            await mkdir(current)
        }
    }
    cb && cb()
}
myMkdir('a/b/c/d')

