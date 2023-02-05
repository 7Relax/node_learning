const fs = require('fs')

const rs = fs.createReadStream('./test.txt')
const ws = fs.createWriteStream('./test_copy.txt')

// 这样拷贝文件优点：不用考虑内存的消耗问题，逻辑也会非常清晰
rs.pipe(ws)
