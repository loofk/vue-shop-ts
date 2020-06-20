<template lang="pug">
  .triple-bounce
    .bounce.bounce-1(:style="composeStyle")

    .bounce.bounce-2(:style="composeStyle")

    .bounce.bounce-3(:style="composeStyle")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import common from './common.vue'

@Component
export default class TripleBounce extends Mixins(common) {
  get spinnerSize () {
    const parent: any = this.$parent
    return ((this.size || parent.size || 28) / 3) + 'px'
  }

  get composeStyle () {
    return {
      width: this.spinnerSize,
      height: this.spinnerSize,
      backgroundColor: this.spinnerColor
    }
  }
}
</script>

<style lang="scss" scoped>
.triple-bounce {
  .bounce {
    display: inline-block;
    border-radius: 100%;
    animation: bounce 1.4s ease-in-out infinite both;
  }
  .bounce-1 {
    margin-right: 4px;
    animation-delay: -0.32s;
  }
  .bounce-2 {
    margin-right: 4px;
    animation-delay: -0.16s;
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1.0);
  }
}
</style>
