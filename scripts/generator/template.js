const firstUpperCase = name => name.replace(/^\S/, s => s.toUpperCase())

module.exports = {
  vueTemplate: componentName => {
    const tpl = `<template lang="pug">
  .${componentName} ${componentName}组件
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ${firstUpperCase(componentName)} extends Vue {

}
</script>

<style lang="scss" scoped>
.${componentName} {

}
</style>
`

    return tpl
  }
}
