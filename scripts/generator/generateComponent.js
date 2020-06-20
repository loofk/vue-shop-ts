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

const doExistDirCreate = dir => {
  return new Promise((resolve) => {
    mkdirs(dir, () => resolve(true))
  })
}

/**
 * 生成流程
 */

log('请输入要生成的组件名称，如果是全局组件，请加 global/ 前缀')
let componentName = ''
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()

  // 组件路径
  const componentPath = resolve('../../src/components', `${inputName}.vue`)

  if (fs.existsSync(componentPath)) {
    errLog(`${inputName}组件已存在，请重新输入`)
    return
  } else {
    const dir = path.dirname(componentPath)
    log(`正在生成目录： ${dir}`)
    await doExistDirCreate(dir)
  }

  try {
    if (inputName.includes('/')) {
      componentName = inputName.split('/').pop()
    } else {
      componentName = inputName
    }

    log(`正在生成${componentName}组件`)
    log(`组件路径为${componentPath}`)
    await generateFile(componentPath, vueTemplate(componentName))

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
