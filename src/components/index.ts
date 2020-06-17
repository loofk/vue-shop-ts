/**
 * 自动注册global文件夹下的组件到全局，使用时必须首字母大写
 */

import Vue from 'vue'

const componentsContext = require.context('./global', true, /\.vue$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)

  // 兼容commonJS和ES Module
  const conf = componentConfig.default || componentConfig
  Vue.component(conf.name, conf)
})
