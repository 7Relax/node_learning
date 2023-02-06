const fs = require('fs')

const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {
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
    // 拿到 open() 操作得到的fd，从而定位文件（读数据）
    // open() 调用时机是在 constructor 中的（在 new 的时候）
    // open() 方法的调用肯定要先于 read() 方法
    // 但 fd 是在 open() 方法的异步回调中的
    // 而我们在绑定或者订阅事件的时候，采用的都是同步的做法
    // 所以 read() 方法是同步的代码，当同步代码执行完毕后，才会去执行异步代码的
    // 所以 read() 方法中拿不到 fd
    // 解决办法：在read() 方法中订阅一个 open 事件，监听 read 方法
    // 当 open 事件一触发才会执行 read 方法（非常妙！），这样可以保证获取到了 fd
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }
    // 读取文件数据
    let buf = Buffer.alloc(this.highWaterMark)
    const howMuchToRead = this.end ? Math.min(this.end - this.readOffset + 1, this.highWaterMark) : this.highWaterMark
    fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
      // 每次读到的字节数
      if (readBytes) {
        this.readOffset += readBytes // 修改偏移量
        this.emit('data', buf.slice(0, readBytes))
        // 因为 'data' 事件，默认是流动模式的，所以这里要再次调用read()不断地去读取
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
}

const rs = new MyFileReadStream('test.txt', {
  end: 7,
  highWaterMark: 3
})

// rs.on('open', (fd) => {
//   console.log('open', fd)
// })

// rs.on('error', (err) => {
//   console.log(err)
// })

// 流动模式读取数据
rs.on('data', (chunk) => {
  console.log(chunk)
})

// rs.on('end', () => {
//   console.log('end')
// })

// rs.on('close', () => {
//   console.log('close')
// })
