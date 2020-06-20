<template lang="pug">
  .snake(:style="composeStyle")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import common from './common.vue'

@Component
export default class Snake extends Mixins(common) {
  get composeStyle () {
    return {
      width: this.spinnerSize,
      height: this.spinnerSize,
      borderLeftColor: this.spinnerColor,
      borderRightColor: this.spinnerColor,
      borderBottomColor: this.spinnerColor
    }
  }
}
</script>

<style lang="scss" scoped>
.snake {
  border: 2px solid transparent;
  border-radius: 100%;
  animation: snake 0.8s linear infinite;
}

@keyframes snake {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
