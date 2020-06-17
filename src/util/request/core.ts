import axios from 'axios'
import router from '../../router'
import { getToken } from '../auth'
import { MessageBox } from 'mint-ui'

// 创建axios实例
const http = axios.create({
  timeout: 60000, // 超时时间
  baseURL: process.env.BASE_URL
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 加上请求头

  return config
}, err => {
  return Promise.reject(err)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  const { status, data } = response
  const code = data.code

  if (status === 200) {
    switch (code) {
      case 0:
        return Promise.resolve(response)
      case 3:
        // 登录过期/未登录
        MessageBox.alert('请重新登录', '提示')
        // 清除token
        localStorage.removeItem('token')
        // 重定向到登录页
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }, 1000)
        return Promise.reject(data)
      default:
        return Promise.reject(data)
    }
  } else {
    return Promise.reject(response)
  }
}, err => {
  MessageBox.alert('请检查网络设置', '提示')
  return Promise.reject(err)
})

export default http
