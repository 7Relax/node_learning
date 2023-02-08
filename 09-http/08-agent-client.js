// 代理服务器 - 充当 服务端 和 客户端

const http = require('http')

const options = {
  host: '127.0.0.1',
  port: 1234,
  path: '/',
  method: 'POST'
}

// 服务端（浏览器访问的是这个代理服务器）
const server = http.createServer((request, response) => {

  // req 作为 客户端
  const req = http.request(options, (res) => {
    const arr = []
    res.on('data', (data) => {
      arr.push(data)
    })
    res.on('end', () => {
      // 拿到 真正的服务端 返回的数据
      const ret = Buffer.concat(arr).toString()
      // 代理服务器 向 浏览器 回消息
      response.setHeader('Content-type',
        'text/html;charset=utf-8')
      response.end(ret)
    })
  })
  // 客户端 向 真正的服务端 发送数据
  req.end('天天向上')
})

server.listen(7788, () => {
  console.log('agent server is start...')
})
