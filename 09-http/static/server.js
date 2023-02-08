// 静态服务器

const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
  // 1 路径处理
  let { pathname, query } = url.parse(req.url)
  // 处理中文路径
  pathname = decodeURIComponent(pathname)
  console.log(pathname)
  const absPath = path.join(__dirname, pathname)
  console.log(absPath)
  // 2 目标资源状态处理
  fs.stat(absPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }
    if (statObj.isFile()) {
      const type = mime.getType(absPath)
      // 此时说明路径对应的目标是一个文件，
      // 可以直接读取然后回写
      fs.readFile(absPath, (err, data) => {
        res.setHeader('Content-type', `${type};charset=utf-8`)
        res.end(data)
      })
    } else {
      // 目录
      const aPath = path.join(absPath, 'index.html')
      const type = mime.getType(aPath)
      fs.readFile(aPath, (err, data) => {
        res.setHeader('Content-type', `${type};charset=utf-8`)
        res.end(data)
      })
    }
  })
})

server.listen(1234, () => {
  console.log('server is start...')
})
