import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { to, loading, toast, Nav } from '@/util'

// 适配rem
import 'amfe-flexible'

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
Vue.prototype.$loading = loading
Vue.prototype.$toast = toast
Vue.prototype.$modal = MintUI.MessageBox
Vue.prototype.$nav = new Nav()

Vue.config.productionTip = false

Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
