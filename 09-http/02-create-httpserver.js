const http = require('http')

// 创建服务端
const server = http.createServer((req, res) => {
  // 针对于请求和响应完成各自的操作
  console.log('1111')
})

server.listen(7788, () => {
  console.log('server is running ...')
})