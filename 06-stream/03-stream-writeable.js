const { Writable } = require('stream')

class MyWritable extends Writable {
  constructor() {
    super()
  }
  // chunk: 需要执行写入的数据
  // en: 编码集
  // done: 回调
  _write(chunk, en, done) {
    process.stdout.write(chunk.toString() + '<----')
    // 写操作完成后，再调用回调
    process.nextTick(done)
  }
}

const myWr = new MyWritable()
myWr.write('天天向上', 'utf-8', () => {
  console.log('end')
})

