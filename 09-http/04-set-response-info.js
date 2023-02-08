const http = require('http')

const server = http.createServer((req, res) => {
  console.log('有请求进来了...')

  // res 可写流
  // res.write('ok')
  // res.end()

  // res.end('test ok')

  // 设置响应头
  res.setHeader('Content-type', 'text/html;charset=utf-8')
  // 设置状态码
  res.statusCode = 302
  // 响应数据
  res.end('天天向上')
})

server.listen(1234, () => {
  console.log('server is start...')
})

