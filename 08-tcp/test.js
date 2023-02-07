const MyTransformCode = require('./myTransform')

const ts = new MyTransformCode()

const str1 = '天天向上'

const encodeBuf = ts.encode(str1, 1)
const val = ts.decode(encodeBuf)
console.log(val)

const len = ts.getPackageLen(encodeBuf)
console.log(len) // 16
