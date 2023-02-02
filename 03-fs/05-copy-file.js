const fs = require('fs')

/**
 * 打开 a 文件，利用 read 将数据保存到 buffer 中
 * 打开 b 文件，利用 write 将 buffer 中的数据写入到 b 文件中
 */
let buf = Buffer.alloc(10)
const BUF_SIZE = buf.length
let readOffset = 0
fs.open('a.txt', 'r', (err, rfd) => {
    fs.open('b.txt', 'w', (err, wfd) => {
        function next() {
            fs.read(rfd, buf, 0, BUF_SIZE, readOffset, (err, readBytes) => {
                if (!readBytes) {
                    // 如果条件成立 说明内容已经读取完毕
                    fs.close(rfd, () => {})
                    fs.close(wfd, () => {})
                    console.log('拷贝完成')
                    return
                }
                // 设置下次文件开始读取的位置（以每次读到的位置累加）
                readOffset += readBytes
                // 每次读多少就写多少
                fs.write(wfd, buf, 0, readBytes, (err, written) => {
                    next()
                })
            })
        }
        next()
    })
})
 