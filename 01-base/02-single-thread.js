const http = require('http')

const sleepTime = (time) => {
  const sleep = Date.now() + time * 1000
  while (Date.now() < sleep) {}
}

sleepTime(4)

const server = http.createServer((req, res) => {
  res.end('Server Starting ...')
})

server.listen(8080, () => {
  console.log('服务启动了...')
})
