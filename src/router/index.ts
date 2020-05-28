import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import home from '@/views/index/index.vue'

Vue.use(VueRouter)

let routes: RouteConfig[] = [
  {
    name: 'index',
    path: '/',
    component: home
  }
]

const routerContext = require.context('./', true, /index\.[t|j]s$/)
routerContext.keys().forEach(route => {
  if (route.startsWith('./index')) return

  const routeModule = routerContext(route)
  routes = [...routes, routeModule.default || routeModule]
})

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
