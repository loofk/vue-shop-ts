/**
 * 常用工具函数
 */

interface AnyObjectOptions {
  [s: string]: string | number;
}

/**
 * 获取GET参数的值
 * @param name
 * @returns {string | null}
 */
export function getQuery (name: string): string | null {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
}

/**
 * 在范围内去随机整数值
 * @param min
 * @param max
 * @returns {number}
 */
export function randomInt (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 生成url，附带GET参数
 * @param base
 * @param params 添加到url后面的参数
 * @returns {string}
 */
export function buildUrl (base: string, params: AnyObjectOptions = {}): string {
  const _get: string[] = []
  let separator = ''

  if (Object.keys(params).length) {
    Object.getOwnPropertyNames(params).forEach(key => {
      if (params[key] !== undefined) {
        _get.push(`${key}=` + encodeURIComponent(params[key]))
      }
    })

    separator = _get.length > 0 ? (base.indexOf('?') > -1 ? '&' : '?') : ''
  }

  return base + separator + _get.join('&')
}

/**
 * 校验数据是否为空
 * @param checkVal 各种类型的数据
 * @returns {boolean}
 */
export function isEmpty (checkVal: any): boolean {
  const key = Object.prototype.toString.call(checkVal)
  switch (key) {
    case '[object String]':
      return checkVal === ''
    case '[object Null]':
      return true
    case '[object Undefined]':
      return true
    case '[object Object]':
      return JSON.stringify(checkVal) === '{}'
    case '[object Array]':
      return JSON.stringify(checkVal) === '[]'
    default:
      return false
  }
}

/**
 * 是否超时
 * @param {string | number} time
 * @return {number}
 */
export function overTime (time: string | number): number {
  if (typeof time === 'string') {
    time = Number(time)
  }

  time.toString().length === 10 && (time = time * 1000)
  return time - new Date().getTime()
}

function _padLeftZero (str: string): string {
  return ('00' + str).substr(str.length)
}

/**
 * 格式化时间戳
 * @param time 字符串或者整型
 * @param fmt 字符串格式，yyyy-MM-dd hh:mm:ss，除了正则匹配的字母，其他可随意替换
 * @returns {string}
 */
export function formatDate (time: string | number, fmt: string): string {
  if (typeof time === 'string') {
    time = Number(time)
  }

  time.toString().length === 10 && (time = time * 1000)
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o: AnyObjectOptions = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : _padLeftZero(str))
    }
  }
  return fmt
}

/**
 * 手机号匿名化
 * @param mobile 手机号字符串
 * @returns {string}
 */
export function hideMobile (mobile: string): boolean | string {
  if (!mobile) {
    return false
  }
  typeof mobile !== 'string' && (mobile = String(mobile))
  return mobile.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
}

/**
 * 计算倒计时
 * @param time 字符串或者整型
 * @param fmt 字符串格式，dd天hh时mm分ss秒，除了正则匹配的字母，其他可随意替换
 * @returns {string}
 */
export function countdown (time: string | number, fmt: string): string {
  if (typeof time === 'string') {
    time = Number(time)
  }

  const days = time / 1000 / 60 / 60 / 24 // 天数
  const hours = (time / 1000 / 60 / 60) % 24 // 小时
  const minutes = (time / 1000 / 60) % 60 // 分钟
  const seconds = (time / 1000) % 60 // 秒

  const o: AnyObjectOptions = {
    'd+': days,
    'h+': hours,
    'm+': minutes,
    's+': seconds
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : _padLeftZero(str))
    }
  }
  return fmt
}

/**
 * 格式化价格数据，格式为'￥xxx,xx'
 *
 * @param num 格式化源
 * @param bit 保留的小数位
 * @param sign 分隔符
 * @param gapNum 间隔位数
 * @return {string}
 */

export function priceFormat (num: string | number, bit = 2, sign = ',', gapNum = 3): string {
  num = Number(num).toFixed(bit)
  let priceStr = ''
  const realNum = num.split('.')[0] // 整数位
  // const decimal = num.split(".")[1]; // 小数位
  const realNumArr = realNum.split('').reverse() // 整数位数组倒序

  realNumArr.forEach((val, key) => {
    priceStr = val + priceStr
    if ((key + 1) % gapNum === 0) {
      priceStr = sign + priceStr
    }
  })

  // 除掉头部的间隔符
  if (realNumArr.length % gapNum === 0) {
    priceStr = priceStr.substr(1)
  }

  return `￥${priceStr}`
}

/**
 * 比较数组
 * @param array1 数组1
 * @param array2 数组2
 * @return {boolean}
 */

export function compareArray (array1: Array<any>, array2: Array<any>): boolean {
  return array1.sort().toString() === array2.sort().toString()
}

/**
 * 提取参数的基本类型字符串
 * @param arg
 * @return {string}
 */
export function getArgType (arg: any): string {
  const matches = Object.prototype.toString.call(arg).toLowerCase().match(/\s(\w+)/)
  return matches && matches.length ? matches[1] : ''
}
