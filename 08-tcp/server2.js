const net = require('net')
const MyTransform = require('./myTransform')

// 创建服务端实例
const server = net.createServer()

let overageBuffer = null
const ts = new MyTransform()

const PORT = 1234
const HOST = 'localhost'

server.listen(PORT, HOST)

server.on('listening', () => {
  console.log(`服务端已开启:${HOST}:${PORT}`)
})

// 接收消息 回写消息
server.on('connection', (socket) => {
  socket.on('data', (chunk) => {
    if (overageBuffer) {
      chunk = Buffer.concat([overageBuffer, chunk])
    }
    let packageLen = 0
    while(packageLen = ts.getPackageLen(chunk)) {
      const packageContent = chunk.slice(0, packageLen)
      chunk = chunk.slice(packageLen)
      const ret = ts.decode(packageContent)
      console.log(ret)
      // 回写数据
      socket.write(ts.encode(ret.body, ret.serialNum))
    }
    overageBuffer = chunk
  })
})

server.on('close', () => {
  console.log('服务端关闭了')
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('地址正在被使用')
  } else {
    console.log(err)
  }
})
