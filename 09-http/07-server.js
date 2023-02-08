// 服务器

const http = require('http')

const server = http.createServer((req, res) => {
  const arr = []
  req.on('data', (data) => {
    arr.push(data)
  })
  req.on('end', () => {
    const d = Buffer.concat(arr).toString()
    res.end('拿到了客户端的数据：' + d)
  })
})

server.listen(1234, () => {
  console.log('server is start...')
})
