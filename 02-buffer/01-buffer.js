const b1 = Buffer.alloc(10) // 申请 10字节 的空间
console.log(b1) // 00 00 00 00 00 00 00 00 00 00

const b2 = Buffer.allocUnsafe(10) // 不安全的创建方式
console.log(b2) // 00 00 00 00 00 00 00 00 00 00

// from 把数据加载到 Buffer 中，从而占据一片空间
const b3 = Buffer.from('1')
console.log(b3) // 31 十六进制 占了 1个字节 = 8 bit

const b4 = Buffer.from('a', 'utf-8') // 第二个参数（编码）不写的话，默认是utf-8
console.log(b4) // 61

const one = Buffer.from('一')
console.log(one) // e4 b8 80（在utf-8编码中，一个汉字占3个字节）

const b5 = Buffer.from([1, 2, 3])
console.log(b5) // 01 02 03

console.log(Buffer.from([1, 2, '一'])) // 01 02 00 -> why ?
// 原因是：数组中的非数字字符，先要将其转成对应编码的 十六进制，如：
const b6 = Buffer.from([0xe4, 0xb8, 0x80]).toString()
console.log(b6) // 一  -> 但这种方式并不好，如果想把汉字存入Buffer中，直接用from('一')

const b7 = Buffer.alloc(3)
const b8 = Buffer.from(b7)
console.log(b7) // 00 00 00
console.log(b8) // 00 00 00
b7[0] = 1
console.log(b7) // 01 00 00
console.log(b8) // 00 00 00
// b7 和 b8 并不是指向同一片内存空间
