export default {
  name: 'product-detail',
  path: '/product-detail',
  component: () => import(/* webpackChunkName: "product-detail" */ '../../views/product-detail/product-detail.vue')
}
