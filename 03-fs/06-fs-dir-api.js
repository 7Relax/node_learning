const fs = require('fs')
// access 判断当前用户对于此文件或目录是否具有操作权限
fs.access('a.txt', (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('有操作权限')
})

// stat 获取目录及文件信息
fs.stat('a.txt', (err, statObj) => {
    console.log(statObj.size)
    console.log(statObj.isFile())
    console.log(statObj.isDirectory())
})

// mkdir 创建目录
fs.mkdir('a/b/c', {recursive: true}, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('创建成功')
})

// rmdir -> rm 删除目录
fs.rm('a', {recursive: true}, (err) => {
    if (!err) {
        console.log('删除成功')
    }
})

// readdir 读取目录中的内容
fs.readdir('a', (err, files) => {
    if (!err) {
        console.log(files)
    }
})

// unlink 删除指定文件
fs.unlink('a/a.txt', (err) => {
    if (!err) {
        console.log('删除成功')
    }
})

