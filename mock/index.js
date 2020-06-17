/**
 * 定义本地测试接口，最好与正式接口一致，尽可能减少联调阶段修改的工作量
 */

// 引入mockjs
const Mock = require('mockjs')
const express = require('express')
// 引入模板函数类
const goods = require('./api/goods')
const apis = [...goods]

const { mock } = Mock // Mock函数
const app = express()

// post请求体相关
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// CORS
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
  next()
})

// mockAPi
for (const api of apis) {
  const { apiName, data } = api
  app.post(apiName, (req, res) => {
    res.json(mock(data()))
  })
}

app.listen('3000', () => {
  console.log('监听端口 3000')
})
