// 有问题
Buffer.prototype.split = function(sep) {
    let len = Buffer.from(sep).length
    console.log('len = ', len)
    let res = []
    let start = 0
    let offset = 0

    while(offset = this.indexOf(sep, start) !== -1) {
        res.push(this.slice(start, offset))
        start = offset + len
    }
    res.push(this.slice(start))
    return res
}

let buf = Buffer.from('我爱吃梨，吃雪糕，吃西瓜，吃很多东西')
let bufArr = buf.split('吃')
console.log(bufArr)