const net = require('net')

const client = net.createConnection({
  port: 1234,
  host: 'localhost'
})

const dataArr = [
  '天天向上2',
  '天天向上3',
  '天天向上4',
  '天天向上5',
]

client.on('connect', () => {
  client.write('天天向上')
  // 较low的解决 数据粘包 的问题
  for (let i=0; i<dataArr.length; i++) {
    (function(val, index) {
      setTimeout(() => {
        client.write(val)
      }, 1000 * (index + 1))
    })(dataArr[i], i)
  }
})

client.on('data', (chunk) => {
  console.log(chunk.toString())
})

client.on('error', (err) => {
  console.log(err)
})

client.on('close', () => {
  console.log('客户端断开连接')
})
