function MyEvent() {
  // 准备一个数据结构用于缓存订阅者信息
  this._events = Object.create(null)
}

MyEvent.prototype.on = function(type, cb) {
  // 判断当前次的事件是否已经存在，然后再决定如何做缓存
  const eList = this._events[type]
  if (eList) {
    this._events[type].push(cb)
  } else {
    this._events[type] = [cb]
  }
}

MyEvent.prototype.emit = function(type, ...args) {
  const eList = this._events[type]
  if (eList && eList.length) {
    eList.forEach(function(cb) {
      cb.call(this, ...args)
    })
  }
}

MyEvent.prototype.off = function(type, cb) {
  // 判断当前type事件是否存在
  const eList = this._events[type]
  if (eList) {
    this._events[type] = this._events[type].filter(callback => {
      // callback: 已缓存的回调
      // cb: 当次传入的回调
      // link: 已缓存回调的回调
      return callback !== cb && callback.link !== cb
    })
  }
}

MyEvent.prototype.once = function(type, cb) {
  const foo = (...args) => {
    cb.call(this, ...args)
    // cb 执行完后 就将 foo 从缓存中移除，所以下次再 emit 就不会执行 type事件了
    this.off(type, foo)
  }
  // 将 foo 与 cb 建立联系，方便后续通过 foo 找到 cb
  foo.link = cb
  // 这里注册的是 foo 而不是 cb
  this.on(type, foo)
}

const ev = new MyEvent()

const cFn = (...data) => {
  console.log('事件1 执行了 ', ...data)
}
ev.on('事件1', cFn)
ev.on('事件1', (...data) => {
  console.log('事件1 执行了 --- 2', ...data)
})
ev.emit('事件1', '前')
ev.off('事件1', cFn)
ev.emit('事件1', '后')

// ---- once ----
const cFn2 = (...data) => {
  console.log('事件2 执行了 ', ...data)
}
ev.once('事件2', cFn2)
// ev.off('事件2', cFn2)
ev.emit('事件2', 'A')
