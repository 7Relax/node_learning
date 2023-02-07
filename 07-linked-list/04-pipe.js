const fs = require('fs')
const MyReadStream = require('./readStream')

// const rs = fs.createReadStream('./data.txt', {
//   highWaterMark: 4 // 默认是：64KB
// })

// 用自己实现的 文件可读流
const rs = new MyReadStream('./data.txt')

const ws = fs.createWriteStream('./output.txt', {
  highWaterMark: 1 // 默认是：16KB
})

rs.pipe(ws)

