<template lang="pug">
  .index 主页
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import goodsApi from '@/api/goods'

@Component
export default class Index extends Vue {
  created () {
    this.getIndexInfo()
  }

  async getIndexInfo () {
    const [err, res] = this.$to(goodsApi.index())
    console.log(res)
  }
}
</script>

<style lang="scss" scoped>
.index {

}
</style>
