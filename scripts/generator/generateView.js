const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const { vueTemplate, routeTemplate } = require('./template.js')

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
 * 生成文件夹及文件
 * @param {string} module 在src文件夹下的某个模块名称
 * @param {string} input 输入的相对路径
 * @param {string} template 使用的生成模板
 * @param {boolean} isCreateIndexFile 是否生成index文件，否则生成与文件夹同名文件
 * @returns {Promise}
 */
const generate = async (module, input, template, isCreateIndexFile = false) => {
  // 文件名
  const filename = input.split('/').pop()
  // 页面路径
  const viewPath = resolve(`../../src/${module}/${input}`, isCreateIndexFile ? 'index.ts' : `${filename}.vue`)
  const viewDir = path.dirname(viewPath)

  if (fs.existsSync(viewPath)) {
    errLog(`${viewPath}文件已存在，请重新输入`)
    return
  } else {
    log('正在生成目录...')
    log(`目录路径为：${viewDir}`)
    await doExistDirCreate(viewDir)
  }

  try {
    log('正在生成文件...')
    log(`文件路径为：${viewPath}`)
    await generateFile(viewPath, template(filename))

    succLog('生成成功')
  } catch (e) {
    errLog(e.message)
  }
}

/**
 * 生成流程
 */

log('请输入要生成的文件夹名称，格式为 dir，可在已存在文件夹下生成新的文件夹，形如 shop/shop1')
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()

  // 生成views页面
  await generate('views', inputName, vueTemplate)
  // 生成相应的route
  await generate('router', inputName, routeTemplate, true)

  process.stdin.emit('end')
})

process.stdin.on('end', () => {
  log('exit')
  process.exit()
})
