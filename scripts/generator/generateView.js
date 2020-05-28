const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const { vueTemplate } = require('./template.js')

// 工具函数
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = msg => console.log(chalk.green(`${msg}`))
const succLog = msg => console.log(chalk.blue(`${msg}`))
const errLog = msg => console.log(chalk.red(`${msg}`))
const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errLog(`${path}文件已存在`)
    return
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', err => {
      if (err) {
        errLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * 生成流程
 */

log('请输入要生成的页面名称，格式为 dir/name ，比如 home/home')
let viewName = ''
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()

  // 页面路径
  const viewPath = resolve('../../src/views', `${inputName}.vue`)

  const viewDir = path.dirname(viewPath)

  log(`生成的页面文件夹为${viewDir}`)

  if (fs.existsSync(viewPath)) {
    errLog(`${inputName}页面已存在，请重新输入`)
    return
  } else {
    log(`正在生成 views 目录 ${inputName}`)
    await doExistDirCreate(viewDir)
    // fs.mkdirSync(viewDir)
  }

  try {
    if (inputName.includes('/')) {
      viewName = inputName.split('/').pop()
    } else {
      viewName = inputName
    }

    log(`正在生成${viewName}页面`)
    log(`组件路径为${viewPath}`)
    await generateFile(viewPath, vueTemplate(viewName))

    succLog('生成成功')
  } catch (e) {
    errLog(e.message)
  }

  process.stdin.emit('end')
})

process.stdin.on('end', () => {
  log('exit')
  process.exit()
})

const doExistDirCreate = dir => {
  return new Promise((resolve) => {
    mkdirs(dir, () => resolve(true))
  })
}

// 防止前面路径的目录没有生成
const mkdirs = (dir, cb) => {
  if (fs.existsSync(dir)) cb()
  else {
    mkdirs(path.dirname(dir), () => {
      fs.mkdirSync(dir)
      cb()
    })
  }
}
