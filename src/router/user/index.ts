export default {
  name: 'user',
  path: '/user',
  component: () => import(/* webpackChunkName: "user" */ '../../views/user/user.vue')
}
