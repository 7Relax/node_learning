/**
 * 单向链表
 */

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
  // 根据 index 下标获取 Node 节点
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
      // 只有一个参数的情况，则将其作为element
      element = index
      index = this.size // 用当前 size 作为 index 的值
    }
    if (index < 0 || index > this.size) {
      throw new Error('cross the border')
    }
    if (index === 0) {
      // 添加至首位
      const head = this.head // 保存原有 head 的指向
      this.head = new Node(element, head)
    } else {
      // 非首位
      const prevNode = this._getNode(index - 1) // 获取 index 前一个节点
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size ++
  }
  remove(index) {
    if (index < 0 || index > this.size) {
      throw new Error('remove >> 越界了')
    }
    if (index === 0) {
      this.head = this.head.next
      // 判断是否有下个节点
      if (index < this.size - 1) {
        this.head.next = this._getNode(index + 1)
      }
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

const l1 = new LinkedList()
l1.add('node1')
l1.add('node2')
l1.add('node3')
l1.set(2, 'node3-3')
// console.log(l1)
// console.log(l1.head.next)
console.log(l1.get(1))
