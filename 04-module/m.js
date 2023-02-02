// 一、模块的导入与导出
// const age = 18
// const addFn = (x, y) => {
//     return x + y
// }
// module.exports = {
//     age,
//     addFn
// }

// 二、module
// console.log(module)

// 三、exports
// exports.name = 'lxw'

// 四、同步加载
// module.exports = 'lxw'
// let time = new Date()
// while(new Date() - time < 4000) {}
// console.log('m.js被加载导入了')

// require.main 返回的是它的 parent
// console.log(require.main === module)

module.exports = 'lxw'
