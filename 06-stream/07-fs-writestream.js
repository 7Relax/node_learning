const fs = require('fs')

const ws = fs.createWriteStream('output.txt', {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 3
})

// 消费数据
// ws.write('好好学习', () => {
//   console.log('ok2')
// })

// ws.write('天天向上', () => {
//   console.log('ok1')
// })

// 事件
ws.on('open', (fd) => {
  console.log(fd, '文件打开了')
})

ws.write('1')

// close 是在数据写入操作全部完成之后再触发的
ws.on('close', () => {
  console.log('文件关闭了')
})

// end 执行之后就意味着数据全部写入完成
ws.end('天龙八部')

// 模拟出错：end 关闭之后，是不允许执行写入了，会报错
// ws.write('2')

// error
ws.on('error', (err) => {
  console.log('出错了')
})