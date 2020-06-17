<template lang="pug">
  .load-more
    img.load-icon(:class="loadingMoreIconSize" :src="loadingMoreIcon" v-show="status === 1")
    span.e-c9 {{ text[status] }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class LoadMore extends Vue {
  // 加载状态，0加载前，1加载中，2没有更多
  @Prop({
    type: Number,
    default: 0
  })
  status!: number

  // 提示文案数组
  @Prop({
    type: Array,
    default: () => []
  })
  text!: string[]

  // 加载图标，自定义
  @Prop(String)
  loadingMoreIcon!: string

  // 图标大小，取值有 small 、 middle 和 large
  @Prop({
    type: String,
    default: 'small'
  })
  loadingMoreIconSize!: string
}
</script>

<style lang="scss" scoped>
.load-more {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 45px;
  padding-top: 5px;
}

.load-icon {
  display: block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  animation: load 1.2s cubic-bezier(0.37, 1.08, 0.7, 0.74) infinite;
  &.middle {
    width: 27px;
    height: 27px;
    margin-right: 3px;
    margin-top: 2.5px;
    animation-duration: 1.8s;
  }
  &.large {
    width: 36px;
    height: 36px;
    margin-right: 0;
    margin-top: 5px;
    animation-duration: 2.4s;
  }
}

@keyframes load {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
