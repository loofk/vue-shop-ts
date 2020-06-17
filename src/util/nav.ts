import router from '@/router'

// tabbar页面
const TABBARLIST = ['index', 'cate', 'cart', 'user']

/**
 * 全局路由类
 */
class Nav {
  /**
   * 跳转
   * @param {string} url
   * @param {object} params
   * @returns void
   */
  to (url: string, params = {}) {
    // 判断是否是tabbar
    if (TABBARLIST.includes(url)) {
      this.relaunch(url, params)
    } else {
      router.push({ name: url, params })
    }
  }

  /**
   * 重定向
   * @param {string} url
   * @param {object} params
   * @returns void
   */
  redirect (url: string, params = {}) {
    router.replace({ name: url, params })
  }

  /**
   * 重载
   * @param {String} url
   * @param {Object} params
   * @returns void
   */
  relaunch (url: string, params = {}) {
    // hack清空历史记录
    router.go(-1000)
    router.replace({ name: url, params })
  }

  /**
   * 返回
   * @param {Number} delta
   * @returns void
   */
  back (delta = 1) {
    if (delta <= 0) return
    router.go(-delta)
  }

  /**
   * 回到首页
   * @returns void
   */
  toHome () {
    this.to('index')
  }
}

export { Nav }
