console.log('start ...')

const p1 = new Promise((resolve, reject) => {
  console.log('promise ...')
  resolve('success')
})

console.log('p1 = ', p1)

// 每执行完一个宏任务之后，就会立刻去检查一次微任务队列
setTimeout(() => {
  console.log('s1 >>>') // 此行进入宏任务的消息队列
  Promise.resolve('long').then((data) => { // 进入微任务队列
    console.log('p1 >>> data = ', data)
  })
  Promise.resolve().then(() => {
    console.log('p2')
  })
})

Promise.resolve('first').then((data) => { // 进入微任务队列
  console.log('Promise >>> data = ', data)
})

console.log('AAAAAA')

setTimeout(() => {
  console.log('s2')
  Promise.resolve().then(() => {
    console.log('p3')
  })
  Promise.resolve().then(() => {
    console.log('p4')
  })
})

console.log('end ...')
