export default {
  name: 'cart',
  path: '/cart',
  component: () => import(/* webpackChunkName: "cart" */ '../../views/cart/cart.vue')
}
