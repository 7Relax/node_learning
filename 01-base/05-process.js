// 1 资源
console.log(process.memoryUsage())
console.log(process.cpuUsage())

// 2 运行环境
console.log(process.cwd())          // /Users/seven/Documents/Personal/Learning/front/code/node-20221205
console.log(process.version)        // v18.12.1
console.log(process.versions)
console.log(process.arch)           // x64
console.log(process.env.NODE_ENV)   // undefined
console.log(process.env.HOME)       // /Users/seven
console.log(process.platform)       // darwin

// 3 运行状态
// 启动参数
console.log(process.argv)           // 第一个是node目录 第二个是当前文件所在的路径
console.log(process.argv0)          // node
console.log(process.pid)            // 36036
console.log(process.uptime())       // 0.050597209

// 4 事件
process.on('exit', (code) => {
  console.log('exit ', code)
  // 这个方法体中的异步api不会执行
  setTimeout(() => {
    console.log('123')
  }, 200)
})

process.on('beforeExit', (code) => {
  console.log('beforeExit ', code)
})

主动退出程序执行
process.exit()

console.log('执行完毕...')

// 5 标准输出流 输入流 错误
console.log = function (data) {
  // 标准输出流
  process.stdout.write('---' + data + '\n')
}
console.log('11') // ---11
console.log('22') // ---22

const fs = require('fs')
// 创建一个可读流并通过pipe管道交给下一个处理环节（输出流）
fs.createReadStream('./test.txt')
  .pipe(process.stdout)

// 标准输入流 -> 标准输出流
// process.stdin.pipe(process.stdout)

process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  // 读标准输入的内容
  const chunk = process.stdin.read()
  if (chunk) {
    process.stdout.write('data ' + chunk)
  }
})