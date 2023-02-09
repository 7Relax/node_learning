const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises // fs 可以用 promise 写法
const { createReadStream } = require('fs')
const mime = require('mime')
const ejs = require('ejs')
const { promisify } = require('util')


function mergeConfig(config) {
  return {
    port: 1234,
    directory: process.cwd(), // 当前工作目录
    ...config,
    ...config._optionValues
  }
}

class Server {
  constructor(config) {
    this.config = mergeConfig(config)
    // console.log('---->', this.config)
  }
  start() {
    // 这里要通过 bind 将 Server 实例 this 传给 serverHandle 方法
    // 这样 serverHandle 方法中就可以拿到 Server 实例了
    const server = http.createServer(this.serverHandle.bind(this))
    server.listen(this.config.port, () => {
      console.log('服务端已经启动了...')
    })
  }
  async serverHandle(req, res) {
    console.log('有请求进来了')
    let { pathname } = url.parse(req.url)
    pathname = decodeURIComponent(pathname)
    // 拿到绝对路径
    const absPath = path.join(this.config.directory, pathname)
    console.log(absPath)
    try {
      // 获取目录及文件信息
      const statObj = await fs.stat(absPath)
      if (statObj.isFile()) {
        this.fileHandle(req, res, absPath)
      } else {
        // 目录下所有资源
        let dirs = await fs.readdir(absPath)
        // 处理 dirs
        dirs = dirs.map((item) => {
          return {
            path: path.join(pathname, item),
            dirs: item
          }
        })
        // 将方法处理成 promise 风格
        const renderFile = promisify(ejs.renderFile)
        // 处理 上一层
        let parentPath = path.dirname(pathname) // 当前请求路径的 dirname
        // 把数据交给 html模板
        const ret = await renderFile(path.resolve(__dirname, 'template.html'), {
          arr: dirs,
          parent: pathname === '/' ? false : true,
          parentPath,
          title: path.basename(absPath)
        })
        // 将结果回写给客户端
        res.end(ret)
      }
    } catch (error) {
      this.errorHandle(req, res, error)
    }
  }
  errorHandle(req, res, error) {
    console.log(error)
    res.statusCode = 404
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end('Not Found')
  }
  fileHandle(req, res, absPath) {
    res.statusCode = 200
    const type = mime.getType(absPath)
    res.setHeader('Content-type', type+';charset=utf-8')
    createReadStream(absPath).pipe(res)
  }
}

module.exports = Server
