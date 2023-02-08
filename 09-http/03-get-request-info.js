const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  // console.log('请求进来了...')

  // 请求路径
  const { pathname, query } = url.parse(req.url, true)
  console.log(pathname, '----', query)

  // 请求方式
  console.log(req.method)

  // 版本号
  console.log(req.httpVersion)

  // 请求头
  console.log(req.headers)

  // 请求体数据获取（POST请求）
  // req 相当于一个可读流
  const arr = []
  req.on('data', (data) => {
    arr.push(data)
  })
  req.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})

server.listen(1234, () => {
  console.log('server is start ...')
})
