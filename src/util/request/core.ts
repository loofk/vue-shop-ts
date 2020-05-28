import axios from 'axios'
import router from '../../router'
// import { to } from './to'
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
  const token = localStorage.getItem('token') || false

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, err => {
  // return to(Promise.reject(err))
  return Promise.reject(err)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  const status = response.status

  if (status === 200) {
    const res = response.data
    const code = parseInt(res.code)
    switch (code) {
      case 0:
        // return to(Promise.resolve(res.data))
        return Promise.resolve(res.data)
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
        // return to(Promise.reject(res))
        return Promise.reject(res)
      default:
        // return to(Promise.reject(res))
        return Promise.reject(res)
    }
  } else {
    // return to(Promise.reject(response))
    return Promise.reject(response)
  }
}, err => {
  MessageBox.alert('请检查网络设置', '提示')
  // return to(Promise.reject(err))
  return Promise.reject(err)
})

export default http
