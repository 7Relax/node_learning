// concat
const b1 = Buffer.from('天龙')
const b2 = Buffer.from('八部')
let b = Buffer.concat([b1, b2])
console.log(b)
console.log(b.toString())      // 天龙八部
b = Buffer.concat([b1, b2], 9) // 指定Buffer长度
console.log(b.toString())      // 天龙八

// isBuffer
const b3 = Buffer.alloc(3)
console.log(Buffer.isBuffer(b3)) // true

