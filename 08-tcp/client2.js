const net = require('net')
const MyTransform = require('./myTransform')

const client = net.createConnection({
  port: 1234,
  host: 'localhost'
})

let overageBuffer = null
const ts = new MyTransform()

client.write(ts.encode('天天向上1'))
client.write(ts.encode('天天向上2'))
client.write(ts.encode('天天向上3'))
client.write(ts.encode('天天向上4'))
client.write(ts.encode('天天向上5'))

client.on('data', (chunk) => {
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk])
  }
  let packageLen = 0
  while(packageLen = ts.getPackageLen(chunk)) {
    const packageContent = chunk.slice(0, packageLen)
    chunk = chunk.slice(packageLen)
    const ret = ts.decode(packageContent)
    console.log(ret)
  }
  overageBuffer = chunk
})
