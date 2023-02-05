const { Duplex } = require('stream')

class MyDuplex extends Duplex {
  constructor(source) {
    super()
    this.source = source
  }
  // 可读流
  _read() {
    // 模拟从底层读取数据
    let data = this.source.shift() || null
    this.push(data)
  }
  // 可写流
  _write(chunk, en, next) {
    process.stdout.write(chunk.toString())
    process.nextTick(next)
  }
}

const source = ['red', 'green', 'blue']
const myDuplex = new MyDuplex(source)

myDuplex.on('data', (chunk) => {
  console.log(chunk.toString())
})

myDuplex.write('好好学习', () => {
  console.log('111')
})
