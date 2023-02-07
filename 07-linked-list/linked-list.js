class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor(head, size) {
    this.head = null
    this.size = 0
  }
  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('_getNode >> 越界了')
    }
    let currentNode = this.head
    for (let i=0; i<index; i++) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  add(index, element) {
    if (arguments.length === 1) {
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) {
      throw new Error('cross the border')
    }
    if (index === 0) {
      const head = this.head
      this.head = new Node(element, head)
    } else {
      const prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size ++
  }
  remove(index) {
    let rmNode = null // 被删除的节点
    if (index === 0) {
      rmNode = this.head
      if (!rmNode) {
        return undefined
      }
      this.head = rmNode.next
    } else {
      const prevNode = this._getNode(index - 1)
      if (index === this.size - 1) {
        // 末尾节点
        prevNode.next = null
      } else {
        // 在中间位置的节点
        const nextNode = this._getNode(index + 1)
        prevNode.next = nextNode
      }
    }
    this.size --
    return rmNode
  }
  // 修改
  set(index, element) {
    const curNode = this._getNode(index)
    curNode.element = element
  }
  // 获取
  get(index) {
    return this._getNode(index)
  }
  // 清空
  clear() {
    this.head = null
    this.size = 0
  }
}

class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }
  // 进队列
  enQueue(data) {
    this.linkedList.add(data)
  }
  // 出队列（先进先出）
  deQueue() {
    return this.linkedList.remove(0)
  }
}

module.exports = Queue
