const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module (id) {
  this.id = id
  this.exports = {} // 导出的数据具体放哪
  console.log('执行一次')
}

Module._resolveFilename = function (filename) { 
  // 利用 path 将 filename 转成绝对路径
  const absPath = path.resolve(__dirname, filename)
  // 判断当前路径对应的内容是否存在
  if (fs.existsSync(absPath)) {
    // 条件成立 则路径对应的内容存在
    return absPath
  } else {
    // 文件定位 js json node 补足
    const suffix = Object.keys(Module._extensions)
    for (let i=0; i<suffix.length; i++) {
      const newPath = absPath + suffix[i]
      if (fs.existsSync(newPath)) {
        return newPath
      }
    }
  }
  throw new Error(`${filename} is not exists`)
}

Module._extensions = {
  '.js'(module) {
    // 读取模块内容
    let content = fs.readFileSync(module.id, 'utf-8')
    // node.js的模块中可以直接使用一些全局变量或全局属性，那它是怎么做到的呢？
    // 所以需要对读到的内容做一层包装，把它们放到了一个函数里面，然后在函数上设置一些行参
    // 将来通过 vm 来调用这些函数的时候再给它传参
    content = Module.wrapper[0] + content + Module.wrapper[1]
    // vm
    const compileFn = vm.runInThisContext(content)
    // 准备参数
    const exports = module.exports
    const dirname = path.dirname(module.id)
    const filename = module.id
    // 调用
    compileFn.call(exports, exports, myRequire, module, filename, dirname)
  },
  '.json'(module) {
    // 读取模块内容
    const content = JSON.parse(fs.readFileSync(module.id, 'utf-8'))
    module.exports = content
  }
}

Module.wrapper = [
  '(function(exports, require, module, __filename, __dirname) {',
  '})'
]

Module._cache = {}

Module.prototype.load = function () {
  const extname = path.extname(this.id)
  Module._extensions[extname](this)
}

function myRequire (filename) {
  // 1、获取绝对路径
  const mPath = Module._resolveFilename(filename)

  // 2、缓存优化
  const cacheModule = Module._cache[mPath]
  if (cacheModule) {
    return cacheModule.exports
  }

  // 3、创建空对象加载目标模块
  const module = new Module(mPath)

  // 4、缓存已加载过的模块
  Module._cache[mPath] = module

  // 5、执行加载（编译执行）
  module.load()

  // 6、返回数据
  return module.exports
}

const obj = myRequire('./v')
console.log(obj)
