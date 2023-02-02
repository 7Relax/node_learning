let buf = Buffer.alloc(6)

// fill
// buf.fill('123')
// console.log(buf)            // <Buffer 31 32 33 31 32 33>
// console.log(buf.toString()) // 123123

// buf.fill('123', 1, 3)       // 从第几位开始填充
// console.log(buf)            // <Buffer 00 31 32 00 00 00>
// console.log(buf.toString()) // 12

// write
// buf.write('123')
// console.log(buf)            // <Buffer 00 31 32 00 00 00>
// console.log(buf.toString()) // 12

// toString
// buf = Buffer.from('天龙八部')
// console.log(buf)            // <Buffer e5 a4 a9 e9 be 99 e5 85 ab e9 83 a8>
// console.log(buf.toString()) // 天龙八部 - 默认是utf-8编码
// console.log(buf.toString('utf-8', 3, 9)) // 龙八 - 指定长度提取

// slice
// buf = Buffer.from('天龙八部')
// let b1 = buf.slice()       // 这样就是从头截到尾
// console.log(b1)            // <Buffer e5 a4 a9 e9 be 99 e5 85 ab e9 83 a8>
// console.log(b1.toString()) // 天龙八部
// b1 = buf.slice(3, 9)
// console.log(b1.toString()) // 龙八
// b1 = buf.slice(-3)
// console.log(b1.toString()) // 部

// indexOf
// buf = Buffer.from('lxw爱前端、爱生活')
// console.log(buf.indexOf('爱')) // 3: 表示从第3个字节开始
// console.log(buf.indexOf('爱', 4)) // 15
// console.log(buf.indexOf('爱Q')) // -1: 表示未找到

// copy
let b1 = Buffer.alloc(6)
let b2 = Buffer.from('教育')
console.log(b1)            // <Buffer 00 00 00 00 00 00> 初始容器
// b1: 被拷贝的容器
// b2: 拷贝的数据源
// 整体意思：把 b2 拷贝给 b1
// copy的第2个参数：从容器的哪个位置开始执行写入
// copy的第3个参数：从数据源的哪个位置开始读取
// copy的第4个参数：从数据源的哪个位置结束读取
b2.copy(b1, 2, 3, 6)
console.log(b1)            // <Buffer 00 00 e8 82 b2 00>
console.log(b2)            // <Buffer e6 95 99 e8 82 b2>
console.log(b1.toString()) // 育
console.log(b2.toString()) // 教育
