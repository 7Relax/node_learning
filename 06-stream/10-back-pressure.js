const fs = require('fs')

const rs = fs.createReadStream('test.txt', {
  highWaterMark: 4 // 可读流 一次读4个字节（生产数据）
})

const ws = fs.createWriteStream('output.txt', {
  highWaterMark: 1 // 可写流（消费数据）
})

let flag = true
// 'data' 是流动模式
rs.on('data', (chunk) => {
  // 通过文件可写流去消费数据
  flag = ws.write(chunk, () => {
    // 可读流中的 水位线 是4个字节，而可写流中的 水位线 是1个字节，
    // 这样一来，数据的消费速度远远跟不上数据的生产速度（“吃不消了”）
    // 所以flag 值返回false
    console.log('写完了')
  })
  if (!flag) {
    // 流动模式改成暂停模式（使可写流暂停生产数据，直到可读流将数据消费完）
    rs.pause()
  }
})

ws.on('drain', () => {
  // 文件可写流的缓存队列中又有新的空间可以去接收数据了
  // 通知文件可读流，将模式改成流动模式就可以了，“开关”又打开了
  rs.resume()
})

// 直接将文件可读流里的数据交给文件可写流
// rs.pipe(ws)
