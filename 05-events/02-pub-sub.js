class PubSub {
  constructor() {
    this._events = {}
  }

  // 订阅
  subscribe(eName, cb) {
    const eList = this._events[eName]
    if (eList) {
      // 之前注册过此事件，则需往后添加当前次监听操作
      this._events[eName].push(cb)
    } else {
      // 之前未注册过
      this._events[eName] = [cb]
    }
  }

  // 发布
  publish(eName, ...args) {
    const eList = this._events[eName]
    if (eList && eList.length) {
      eList.forEach(function(eventFn) {
        eventFn.call(this, ...args)
      })
    }
  }
}

const ps = new PubSub()
ps.subscribe('e1', (data) => {
  console.log('e1 执行了, data = ', data)
})
ps.subscribe('e1', () => {
  console.log('e1 执行了 --- 2')
})
ps.publish('e1', { name: 'lxw' })

