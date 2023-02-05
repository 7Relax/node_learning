const { Readable } = require('stream')

// 模拟底层数据
const source = ['red', 'green', 'blue']

// 自定义类继承 Readable - 可读流：用于生产数据
class MyReadable extends Readable {
  constructor(data) {
    super()
    this.data = data
  }
  // 重写 _read()
  _read() {
    let data = this.data.shift() || null
    this.push(data)
  }
}

const mr = new MyReadable(source)

// mr.on('readable', () => {
//   let data = null
//   while((data = mr.read()) !== null) {
//     // 数据未读完
//     console.log(data.toString())
//   }
// })

mr.on('data', (chunk) => {
  console.log(chunk.toString())
})
