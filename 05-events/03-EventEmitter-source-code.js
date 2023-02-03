const EventEmitter = require('events')

const ev = new EventEmitter()

ev.on('event1', () => {
  console.log('event1 执行了')
})

ev.emit('event1')
