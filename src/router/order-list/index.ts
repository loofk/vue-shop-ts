export default {
  name: 'order-list',
  path: '/order-list',
  component: () => import(/* webpackChunkName: "order-list" */ '../../views/order-list/order-list.vue')
}
