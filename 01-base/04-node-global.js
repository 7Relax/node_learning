// console.log(global)

console.log(__filename) // /Users/seven/Documents/Personal/Learning/front/code/node-20221205/04-node-global.js

console.log(__dirname) // /Users/seven/Documents/Personal/Learning/front/code/node-20221205

console.log(this) // {}

console.log(this === global); // false

(function() {
    console.log(this === global) // true
})()
