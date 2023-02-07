const fs = require('fs')
const EventEmitter = require('events')
const Queue = require('./linked-list')

class MyWriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'w' // 默认 写
    this.mode = options.mode || 438   // 操作权限 rw
    this.autoClose = options.autoClose || true // 自动关闭
    this.start = options.start || 0
    this.encoding = options.encoding || 'utf8'
    this.highWaterMark = options.highWaterMark || 16 * 1024
    this.writeOffset = this.start // 偏移量
    this.writing = false // 当前是否正在执行写操作
    this.writeLen = 0    // 累计写入量
    this.needDrain = false
    this.cache = new Queue()

    this.open()
  }
  open() {
    // 原生 open 方法来打开指定位置上的文件
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.emit('error', err)
      }
      // 正常打开文件，拿到 fd
      this.fd = fd
      this.emit('open', fd)
    })
  }
  write(chunk, encoding, cb) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.writeLen += chunk.length
    let flag = this.writeLen < this.highWaterMark
    this.needDrain = !flag
    if (this.writing) {
      // 当前正在执行写入，所以内容应该排队
      this.cache.enQueue({ chunk, encoding, cb })
    } else {
      this.writing = true
      // 当前不是正在写入那么就执行写入
      this._write(chunk, encoding, () => {
        // 切片思想：第一部分执行回调，第二部分执行清空队列
        cb && cb()
        // 清空排队的内容
        this._clearBuffer()
      })
    }
    return flag
  }
  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => {
        this._write(chunk, encoding, cb)
      })
    }
    fs.write(this.fd, chunk, this.start, chunk.length, this.writeOffset, (err, written) => {
      this.writeOffset += written
      this.writeLen -= written
      cb && cb()
    })
  }
  _clearBuffer() {
    // 从队列中取数据
    let data = this.cache.deQueue()
    if (data) {
      const ele = data.element || {}
      this._write(ele.chunk, ele.encoding, () => {
        ele.cb && ele.cb()
        // 并不能保证写完了，再继续调用 _clearBuffer 来清空缓存
        this._clearBuffer()
      })
    } else {
      // 缓存中内容全部写完了，再看看是否要触发 drain 事件
      if (this.needDrain) {
        this.needDrain = false
        this.emit('drain')
      }
    }
  }
}

const ws = new MyWriteStream('output.txt')

ws.on('open', (fd) => {
  console.log('open --->', fd)
})

ws.write('111', 'utf8', () => {
  console.log('ok1')
})
ws.write('222', 'utf8', () => {
  console.log('ok2')
})
ws.write('天天向上', 'utf8', () => {
  console.log('ok3')
})
