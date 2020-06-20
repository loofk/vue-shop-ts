<template lang="pug">
  .pull-refresh
    .pull-refresh-content(:class="{ 'is-dropped': topDropped || bottomDropped }" :style="{ 'transform': transform }")
      //- 顶部下拉样式
      slot(name="top")
        .pull-refresh-top
          spinner.spinner(:type="2" :size="20")
          //- span {{ topText }}
      slot
      //- 底部上拉样式
      slot(name="bottom")
        .pull-refresh-bottom
          spinner.spinner(v-if="!allReached" :type="1" :size="12")
          span(v-else) {{ bottomText }}
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import spinner from '@/components/spinner/spinner.vue'

@Component({
  components: {
    spinner
  }
})
export default class PullRefresh extends Vue {
  // 下拉文案
  @Prop({
    type: String,
    default: '下拉刷新'
  })
  topPullText!: string

  // 下拉触发刷新文案
  @Prop({
    type: String,
    default: '释放更新'
  })
  topDroppedText!: string

  // 下拉请求文案
  @Prop({
    type: String,
    default: '加载中...'
  })
  topLoadingText!: string

  // 顶部触发下拉方法的阈值
  @Prop({
    type: Number,
    default: 70
  })
  topDistance!: number

  // 上拉文案
  @Prop({
    type: String,
    default: '上拉刷新'
  })
  bottomPullText!: string

  // 下拉触发刷新文案
  @Prop({
    type: String,
    default: '释放更新'
  })
  bottomDroppedText!: string

  // 下拉请求文案
  @Prop({
    type: String,
    default: '加载中...'
  })
  bottomLoadingText!: string

  // 顶部触发下拉方法的阈值
  @Prop({
    type: Number,
    default: 70
  })
  bottomDistance!: number

  // 允许组件移动的最大距离
  @Prop({
    type: Number,
    default: 0
  })
  maxDistance!: number

  // 手指移动的距离和组件移动距离的比，默认为2
  @Prop({
    type: Number,
    default: 2
  })
  distanceRate!: number

  // 数据加载完成
  @Prop({
    type: Boolean,
    default: false
  })
  allReached!: boolean

  // 滚动的容器
  scrollTarget!: HTMLElement | Window
  // 记住开始时的滚动位置
  startScrollTop = 0
  // Y轴的位移距离
  translate = 0
  // 顶部文字显示
  topText = ''
  // 顶部状态
  topStatus = ''
  // 是否松开下拉
  topDropped = false
  // 底部文字显示
  bottomText = ''
  // 底部状态
  bottomStatus = ''
  // 是否松开上拉
  bottomDropped = false
  // 是否到达底部
  bottomReached = false
  // 起始位置的Y轴坐标
  startY = 0
  // 当前的Y轴坐标
  currentY = 0
  // 手指移动的方向
  direction = ''

  get transform () {
    return this.translate === 0 ? null : `translate3d(0, ${this.translate}px, 0)`
  }

  @Watch('topStatus')
  handleTopStatusChange (val: string) {
    switch (val) {
      case 'pull':
        this.topText = this.topPullText
        break
      case 'drop':
        this.topText = this.topDroppedText
        break
      case 'loading':
        this.topText = this.topLoadingText
        break
    }
  }

  @Watch('bottomStatus')
  handleBottomStatusChange (val: string) {
    switch (val) {
      case 'pull':
        this.bottomText = this.bottomPullText
        break
      case 'drop':
        this.bottomText = this.bottomDroppedText
        break
      case 'loading':
        this.bottomText = this.bottomLoadingText
        break
    }
  }

  mounted () {
    this.init()
  }

  init () {
    this.topStatus = 'pull'
    this.bottomStatus = 'pull'
    this.topText = this.topPullText
    this.bottomText = this.bottomPullText
    this.scrollTarget = this.getScrollTarget(this.$el)
    this.bindTouchEvents()
  }

  // 绑定事件
  bindTouchEvents () {
    const el = this.$el as HTMLElement
    el.addEventListener('touchstart', this.handleTouchStart)
    el.addEventListener('touchmove', this.handleTouchMove)
    el.addEventListener('touchend', this.handleTouchEnd)
  }

  // 找到滚动元素
  getScrollTarget (element: Element) {
    let currentNode = element as HTMLElement
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
      const overflowY = getComputedStyle(currentNode).overflowY

      if (overflowY === 'scroll' || overflowY === 'auto') {
        return currentNode
      }

      currentNode = currentNode.parentNode as HTMLElement
    }

    return window
  }

  // 获取滚动高
  getScrollTop (element: HTMLElement | Window) {
    if (element instanceof Window) {
      return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop, document.body.scrollTop)
    } else {
      return element.scrollTop
    }
  }

  // 检查是否到达底部
  checkBottomReached () {
    if (this.scrollTarget instanceof Window) {
      const vh = document.body.clientHeight || document.documentElement.clientHeight
      const sh = document.body.scrollHeight || document.documentElement.scrollHeight
      return this.getScrollTop(this.scrollTarget) + vh >= sh
    } else {
      // const ob = new IntersectionObserver(entries => {
      //   return entries[0].intersectionRatio > 0
      // })

      // ob.observe(document.querySelector('.pull-refresh-bottom') as Element)
      return this.scrollTarget.getBoundingClientRect().bottom + 1 >= this.$el.getBoundingClientRect().bottom
    }
  }

  handleTouchStart (e: TouchEvent) {
    this.startY = e.touches[0].clientY
    this.startScrollTop = this.getScrollTop(this.scrollTarget)
    if (this.topStatus !== 'loading') {
      this.topStatus = 'pull'
      this.topDropped = false
    }

    if (this.bottomStatus !== 'loading') {
      this.bottomStatus = 'pull'
      this.bottomDropped = false
    }
  }

  handleTouchMove (e: TouchEvent) {
    this.currentY = e.touches[0].clientY
    const distance = (this.currentY - this.startY) / this.distanceRate
    this.direction = distance > 0 ? 'down' : 'up'

    if (this.direction === 'down' && this.topStatus !== 'loading' && this.getScrollTop(this.scrollTarget) === 0) {
      e.stopPropagation()
      e.preventDefault()

      if (this.maxDistance > 0) {
        this.translate = distance > this.maxDistance ? this.translate : distance - this.startScrollTop
      } else {
        this.translate = distance - this.startScrollTop
      }

      if (this.translate < 0) {
        this.translate = 0
      }

      this.topStatus = this.translate > this.topDistance ? 'drop' : 'pull'
    }

    if (this.direction === 'up') {
      // 避免多次调用check函数
      this.bottomReached = this.bottomReached || this.checkBottomReached()
      this.bottomText = this.allReached ? '没有更多' : this.bottomText
    }

    if (this.direction === 'up' && this.bottomStatus !== 'loading' && this.bottomReached && !this.allReached) {
      e.preventDefault()
      e.stopPropagation()

      if (this.maxDistance > 0) {
        this.translate = Math.abs(distance) > this.maxDistance ? this.translate : this.getScrollTop(this.scrollTarget) + distance - this.startScrollTop
      } else {
        this.translate = this.getScrollTop(this.scrollTarget) + distance - this.startScrollTop
      }

      if (this.translate > 0) {
        this.translate = 0
      }

      this.bottomStatus = Math.abs(this.translate) > this.bottomDistance ? 'drop' : 'pull'
    }
  }

  handleTouchEnd () {
    if (this.direction === 'down' && this.getScrollTop(this.scrollTarget) === 0 && this.translate > 0) {
      this.topDropped = true
      if (this.topStatus === 'drop') {
        this.translate = 50
        this.topStatus = 'loading'
        this.$emit('top-method')
      } else {
        this.translate = 0
        this.topStatus = 'pull'
      }
    }

    if (this.direction === 'up' && this.bottomReached && !this.allReached && this.translate < 0) {
      this.bottomDropped = true
      this.bottomReached = false
      if (this.bottomStatus === 'drop') {
        this.translate = -50
        this.bottomStatus = 'loading'
        this.$emit('bottom-method')
      } else {
        this.translate = 0
        this.bottomStatus = 'pull'
      }
    }

    this.direction = ''
  }
}
</script>

<style lang="scss" scoped>
.pull-refresh {
  // overflow: hidden;
  &-content {
    &.is-dropped {
      transition: .2s;
    }
  }

  &-top {
    height: 50px;
    margin-top: -50px;
    line-height: 50px;
    text-align: center;
  }

  &-bottom {
    height: 50px;
    margin-bottom: -50px;
    line-height: 50px;
    text-align: center;
  }

  .spinner {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
