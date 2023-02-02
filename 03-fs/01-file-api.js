const fs = require('fs')
const path = require('path')

// 获取绝对路径
const p = path.resolve('data.txt')

// readFile
fs.readFile(p, 'utf8', (err, data) => {
    console.log(err)
    if (!err) {
        console.log(data)
    }
})

// writeFile
// 这里为了方便使用相对路径，最好用绝对路径
fs.writeFile('data.txt', 'Hello Node.js', {
    mode: 438,         // 设置操作权限 可读可写不可执行
    flag: 'r+',        // 设置写入的方式 默认是 w+
    encoding: 'utf-8', // 设置编码集
}, (err) => {
    if (!err) {
        fs.readFile('data.txt', 'utf8', (error, data) => {
            if (!error) {
                console.log(data)
            }
        })
    }
})
 
// appendFile
fs.appendFile('data.txt', '天龙八部', (err) => {
    if (!err) {
        console.log('追加成功！')
    }
})

// copyFile
fs.copyFile('data.txt', 'text.txt', (err) => {
    if (!err) {
        console.log('拷贝成功！')
    }
})

// watchFile
fs.watchFile('data.txt', { interval: 20 }, (cur, prev) => {
    if (cur.mtime !== prev.mtime) {
        console.log('文件被修改了')
        fs.unwatchFile('data.txt')
    }
})

