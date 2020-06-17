<template lang="pug">
  .e-fixed_bottom.white-shadow-btn.no-text(v-if="show" @click="handleGoTop")
    i.icon.icon-up-arrow
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class GoTop extends Vue {
  @Prop({
    type: String,
    default: '.scroll-view'
  })
  selector!: string

  show = false
  el: HTMLElement = document.createElement('div') // hack初始化

  mounted () {
    // 不加定时器获取不到DOM
    setTimeout(() => {
      this.el = document.querySelector(this.selector) as HTMLElement
      this.el.addEventListener('scroll', this.handleScroll, false)
    }, 300)
  }

  handleScroll (e: Event) {
    const scrollTop = (e.target as HTMLElement).scrollTop
    // 大于400展示
    this.show = scrollTop > 400
  }

  handleGoTop () {
    // 获取该容器下第一个可滚动元素
    const firstEl = this.el.querySelector(':first-child') as HTMLElement
    firstEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style lang="scss" scoped>
.e-fixed_bottom {
  left: unset;
  right: 15px;
  bottom: 75px;
}
</style>
