const { Transform } = require('stream')

class MyTransform extends Transform {
  constructor() {
    super()
  }
  _transform(chunk, en, cb) {
    this.push(chunk.toString().toUpperCase())
    cb(null)
  }
}

const t = new MyTransform()

// 调用 write 代表着是 可写流
t.write('lxw')

// 通过 on 来监听事件，消耗数据，这里就是可读流
t.on('data', (chunk) => {
  console.log(chunk.toString()) // LXW
})
