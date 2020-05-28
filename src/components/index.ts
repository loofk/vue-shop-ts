/**
 * 自动注册global文件夹下的组件到全局
 */

import Vue from 'vue'

const componentsContext = require.context('./global', true, /\.{js,vue,ts}$/)

// tslint:disable-next-line:arrow-parens
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)

  // 兼容commonJS和ES Module
  const conf = componentConfig.default || componentConfig
  Vue.component(conf.name, conf)
})
