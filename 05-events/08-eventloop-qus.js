// setTimeout(() => {
//   console.log('setTimeout')
// })

// setImmediate(() => {
//   console.log('setImmediate')
// })

// ----------------
const fs = require('fs')

fs.readFile('./m1.js', () => {
  setTimeout(() => {
    console.log('setTimeout')
  })

  setImmediate(() => {
    console.log('setImmediate')
  })
})
