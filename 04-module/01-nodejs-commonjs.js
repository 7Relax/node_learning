// 一、导入
const obj = require('./m')
console.log(obj)

// 二、module
const obj = require('./m')

// 三、exports
const obj = require('./m')
console.log(obj)

// 四、同步加载
const obj = require('./m')
console.log('01.js代码执行了')

const obj = require('./m')
console.log(require.main === module)


