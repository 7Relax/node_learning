#! /usr/bin/env node
// 以上说明 表示：以 node 环境运行

const { program } = require('commander')

// 配置信息
const options = {
  '-p --port <dir>': {
    'description': 'init server port',
    'example': '  lgserve -p 3306'
  },
  '-d --directory <dir>': {
    'description': 'init server directory',
    'example': '  lgserve -d c:'
  },
}

function formatConfig(configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val)
  })
}

formatConfig(options, (cmd, val) => {
  // Options
  program.option(cmd, val.description)
})

program.on('--help', () => {
  // Examples
  console.log('Examples: ')
  formatConfig(options, (cmd, val) => {
    console.log(val.example)
  })
})

// 改名
program.name('lgserve') // Usage: lgserve [options]

// 版本号
const version = require('../package.json').version
program.version(version)

const cmdConfig = program.parse(process.argv)
// console.log(cmdConfig)

const Server = require('../main.js')
new Server(cmdConfig).start() // 整个 server 端运行起来
