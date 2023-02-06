/**
 * 需求：将 “天天向上” 写入指定文件
 * 01 一次性写入
 * 02 分批写入
 */

const fs = require('fs')

const ws = fs.createWriteStream('output.txt', {
  highWaterMark: 3
})

const source = '天龙八部-真好看'

// 一次性写入
// ws.write(source)

// 分批写入
const array = source.split('')
let num = 0
let flag = true

const exeWrite = () => {
  flag = true
  while(flag && num < array.length) {
    flag = ws.write(array[num])
    num ++
  }
}

exeWrite()

ws.on('drain', () => {
  // 在这里控制写入速度
  console.log('drain ...')
  setTimeout(() => {
    exeWrite()
  }, 1000)
})