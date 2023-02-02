const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('event_1', () => {
  setTimeout(() => {
    console.log('event_1 执行了')
  }, 500)
})
myEvent.on('event_2', () => {
  setTimeout(() => {
    console.log('event_2 执行了')
  }, 1000)
})
myEvent.on('event_3', () => {
  setTimeout(() => {
    console.log('event_3 执行了')
  }, 1500)
})

myEvent.emit('event_1')
myEvent.emit('event_2')
myEvent.emit('event_3')
