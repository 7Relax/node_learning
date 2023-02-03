const EventEmitter = require('events')

const ev = new EventEmitter()

// ---- on ---- 注册|订阅|监听
ev.on('event_on', () => {
  console.log('event_on执行了')
})
ev.on('event_on', () => {
  console.log('event_on执行了 --- 2')
})

// emit 发布
ev.emit('event_on')
ev.emit('event_on')

// ---- once ----
ev.once('event_once', () => {
  console.log('event_once执行了')
})
ev.once('event_once', () => {
  console.log('event_once执行了 --- 2')
})

// emit 发布
ev.emit('event_once')
ev.emit('event_once')

// ---- off ----
const cbFn = (...args) => {
  console.log('cbFn 执行了, args = ', args)
}
ev.on('event_off', cbFn)
ev.emit('event_off', 1, 2, 3)
ev.off('event_off', cbFn)
ev.emit('event_off')

// ---- this ----
ev.on('event_this', function(...args) {
  console.log(this, args)
})
ev.emit('event_this', 1, 6)

// ---- fs 等内置核心模块本身就继承自EventEmitter类 ----
const fs = require('fs')
const crs = fs.createReadStream()
crs.on('open')
