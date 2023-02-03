const fs = require('fs')
const vm = require('vm')

let age = 33
let content = fs.readFileSync('test.txt', 'utf-8')
console.log(content)

// eval
// eval(content)
// console.log(age) // 可以拿到变量age（前提：当前作用域中只有1个age变量，
// 否则会报错，则不符合 CommonJS 规范）

// new Function
// console.log(age)
// const fn = new Function('age', 'return age + 1')
// console.log(fn(age))

// node.js中没有采用 eval 和 Function 而是采用 vm 机制
vm.runInThisContext(content)
console.log(age)
