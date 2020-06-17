<template lang="pug">
  .tabbar
    mt-tabbar(v-model="selectedId" :fixed="true")
      mt-tab-item(v-for="(item, index) in tabInfo" :key="index" :id="item.page").
        #[img( slot="icon" :src="item.img")]
        {{ item.name }}
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Tabbar extends Vue {
  @Prop({ type: String, default: 'index' })
  selected!: string

  // tabbar数据
  tabInfo: Array<{ page: string; name: string; img?: string }> = [
    {
      page: 'index',
      name: '首页'
    },
    {
      page: 'cate',
      name: '分类'
    },
    {
      page: 'cart',
      name: '购物车'
    },
    {
      page: 'user',
      name: '我的'
    }
  ]

  selectedId = this.selected

  created () {
    this.tabInfo.forEach((item: { page: string; name: string; img?: string }) => {
      if (item.page === this.selectedId) {
        item.img = require(`../assets/image/tabbar/${item.page}_selected.png`)
      } else {
        item.img = require(`../assets/image/tabbar/${item.page}.png`)
      }
    })
  }

  @Watch('selectedId')
  onSelectedIdChange (val: string) {
    this.$nav.to(val)
  }
}
</script>

<style lang="scss" scoped>
// 调整tabbar选中样式
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: unset;
  color: $e-deepRed
}
</style>
