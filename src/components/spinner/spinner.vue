<template lang="pug">
  span
    component(:is="spinner")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import fadingCircleSpinner from './spinner/fading-circle.vue'
import snakeSpinner from './spinner/snake.vue'
import tripleBounceSpinner from './spinner/triple-bounce.vue'

const TYPES = ['fading-circle', 'snake', 'triple-bounce']

// 解析type
function parseType (index: string | number) {
  if (typeof index === 'number') {
    if (index >= TYPES.length) {
      console.warn(`${index} spinner not found, use the default spinner.`)
      index = 0
    }

    return TYPES[index]
  }

  if (!TYPES.includes(index)) {
    console.warn(`${index} spinner not found, use the default spinner.`)
    return TYPES[0]
  }

  return index
}

@Component({
  components: {
    snakeSpinner,
    fadingCircleSpinner,
    tripleBounceSpinner
  }
})
export default class Spinner extends Vue {
  // 加载图标类型，可输入序号或者字符串，有fading-circle、snake、triple-bounce三种类型，默认为fading-circle
  @Prop({
    type: [String, Number],
    default: 0
  })
  type!: number | string

  // 图标大小
  @Prop({
    type: Number,
    default: 28
  })
  size!: number

  // 图标颜色
  @Prop({
    type: String,
    default: '#ccc'
  })
  color!: string

  get spinner (): string {
    return `${parseType(this.type)}-spinner`
  }
}
</script>
