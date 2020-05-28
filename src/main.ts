import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { to } from '@/util/request/to'

// 导入mint-ui框架
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 公共样式
import './style/icon.scss'
import './style/base.scss'
import './style/reset.scss'

// 自动注册全局组件
import './components/index'

Vue.prototype.$to = to
Vue.prototype.$toast = MintUI.Toast

Vue.config.productionTip = false

Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
