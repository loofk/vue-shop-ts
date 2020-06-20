<template lang="pug">
  .fading-circle(:class="['circle-color-' + uid]" :style="{ width: spinnerSize, height: spinnerSize }")
    .fading-circle-circle(v-for="n in 12" :class="['is-circle' + (n + 1)]")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import common from './common.vue'

@Component
export default class FadingCircle extends Mixins(common) {
  styleNode!: HTMLStyleElement
  // 随机数确保样式在多个实例时不会被覆盖，可用组件uid代替，但是无法通过ts校验
  uid = parseInt((Math.random() * 1000).toString())

  created () {
    // 无法通过style属性为before添加样式
    this.styleNode = document.createElement('style')
    const css = `.circle-color-${this.uid} > div::before { background-color: ${this.spinnerColor} }`

    this.styleNode.type = 'text/css'
    this.styleNode.title = 'fading circle style'
    document.getElementsByTagName('head')[0].appendChild(this.styleNode)
    this.styleNode.appendChild(document.createTextNode(css))
  }

  destroyed () {
    (this.styleNode.parentNode as HTMLElement).removeChild(this.styleNode)
  }
}
</script>

<style lang="scss" scoped>
.fading-circle {
  position: relative;

  &-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      content: ' ';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      border-radius: 100%;
      animation: fading-circle 1.2s ease-in-out infinite both;
    }

    @for $i from 2 through 12 {
      &.is-circle#{$i} {
        transform: rotate(calc(360deg / 12 * (#{$i} - 1)));

        &::before {
          animation-delay: calc(-1.2s + 1.2s / 12 * (#{$i} - 1));
        }
      }
    }
  }
}

@keyframes fading-circle {
  0%, 39%, 100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
}
</style>
