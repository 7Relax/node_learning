const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url)
  console.log(pathname, '----', query)

  // post
  const arr = []
  // req 相当于一个可读流
  req.on('data', (data) => {
    arr.push(data)
  })
  req.on('end', () => {
    const data = Buffer.concat(arr).toString()
    const ctype = req.headers['content-type']
    if (ctype === 'application/json') {
      const json = JSON.parse(data)
      json.add = '是个好同志'
      // 可写流
      res.end(JSON.stringify(json))
    } else if (ctype === 'application/x-www-form-urlencoded') {
      console.log(data)
      const ret = querystring.parse(data)
      res.end(JSON.stringify(ret))
    }
  })
})

server.listen(1234, () => {
  console.log('server is running...')
})
