// 首字母大写
const firstUpperCase = name => name.replace(/^\S/, s => s.toUpperCase())
// product_detail/product-detail 格式转 ProductDetail 驼峰式
const transformCamel = name => name.split(/[_-]/).map(item => firstUpperCase(item)).join('')

module.exports = {
  vueTemplate: componentName => {
    const tpl = `<template lang="pug">
  .${componentName} ${componentName}组件
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ${transformCamel(componentName)} extends Vue {

}
</script>

<style lang="scss" scoped>
.${componentName} {

}
</style>
`

    return tpl
  },
  routeTemplate: routeName => {
    const tpl = `export default {
  name: '${routeName}',
  path: '/${routeName}',
  component: () => import(/* webpackChunkName: "${routeName}" */ '../../views/${routeName}/${routeName}.vue')
}
`
    return tpl
  }
}
