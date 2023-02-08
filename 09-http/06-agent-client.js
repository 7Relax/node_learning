// 代理客户端

const http = require('http')

const options = {
  host: '127.0.0.1',
  port: 1234,
  path: '/?a=1',
  method: 'POST',
  headers: {
    // 'Content-type': 'application/json'
    'Content-type': 'application/x-www-form-urlencoded'
  }
}

// get 请求
// http.get({
//   host: '127.0.0.1',
//   port: 1234,
//   path: '/?a=1'
// }, (res) => {})

// post 请求
const req = http.request(options, (res) => {
  const arr = []
  res.on('data', (data) => {
    arr.push(data)
  })
  res.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})

// req.end('天天向上')

// 发送 json 格式数据
// req.end('{"name": "lxw"}')

// 发送 form 表单数据
req.end('a=1&b=2')
