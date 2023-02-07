const fs = require('fs')

const EventEmitter = require('events')

class MyReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 438 // rw 权限
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.readOffset = 0

    this.open()
    this.on('newListener', (type) => {
      if (type === 'data') {
        // 监听到订阅了 data 事件，就会触发并执行 read 方法
        this.read()
      }
    })
  }
  open() {
    // 原生 open 方法来打开指定位置上的文件
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit('error', err)
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }
  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }
    // 读取文件数据
    let buf = Buffer.alloc(this.highWaterMark)
    const howMuchToRead = this.end ? Math.min(this.end - this.readOffset + 1, this.highWaterMark) : this.highWaterMark
    fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        this.readOffset += readBytes
        this.emit('data', buf.slice(0, readBytes))
        this.read()
      } else {
        this.emit('end')
        this.close()
      }
    })
  }
  close() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
  pipe(ws) {
    // 监听到的数据
    this.on('data', (data) => {
      const flag = ws.write(data)
      if (!flag) {
        this.pause() // 暂停
      }
    })
    // 监听一下 文件可写流的 drain 事件
    ws.on('drain', () => {
      this.resume() // 接着读
    })
  }
  pause() {
    console.log('pause ...')
  }
  resume() {
    console.log('resume ...')
  }
}

module.exports = MyReadStream
