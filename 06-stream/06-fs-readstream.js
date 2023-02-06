const fs = require('fs')

const rs = fs.createReadStream('data.txt', {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  // end: 3,
  highWaterMark: 4
})

// rs.on('data', (chunk) => {
//   console.log(chunk.toString())
//   rs.pause()
//   setTimeout(() => {
//     rs.resume()
//   }, 1000)
// })

// rs.on('readable', () => {
//   let data = null
//   while ((data = rs.read(1)) !== null) {
//     console.log(data.toString())
//     // 缓存区Buffer长度（字节数），若为0则会去触发 _read() 方法，
//     // 然后通过 push() 方法将读到的底层数据放入缓存区
//     console.log('--------' + rs._readableState.length)
//   }
// })

rs.on('open', (fd) => {
  console.log(fd, '文件打开了')
})

rs.on('close', () => {
  console.log('文件关闭了')
})

const bufferData = []
rs.on('data', (chunk) => {
  bufferData.push(chunk)
})

rs.on('end', () => {
  // 使用数据：得到完整的数据后，将其连接起来再使用
  const data = Buffer.concat(bufferData)
  console.log(data.toString())
  console.log('当数据被清空之后')
})

rs.on('error', (err) => {
  console.log('出错了')
})
