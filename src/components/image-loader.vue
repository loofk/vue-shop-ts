<template lang="pug">
  .image-loader
    img(
      :style="size"
      :src="src"
      :onerror="errorImg"
    )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ImageLoader extends Vue {
  // 实际图地址
  @Prop({
    type: String,
    default: ''
  })
  src!: string

  // 默认图地址
  @Prop({
    type: String,
    default: ''
  })
  defaultSrc!: string

  // 图宽
  @Prop({
    type: Number,
    default: 0
  })
  width!: number

  // 图高
  @Prop({
    type: Number,
    default: 0
  })
  height!: number

  // 是否在图片未加载完成时展示默认图
  @Prop({
    type: Boolean,
    default: true
  })
  def!: boolean

  finishLoadFlag = false
  loadErrorFlag = false

  // 图片样式
  get size () {
    const widthStr = this.width ? `width:${this.width}px;` : ''
    const heightStr = this.height ? `height:${this.height}px` : ''
    return widthStr + heightStr
  }

  // 加载失败默认图
  get errorImg () {
    return this.def && `this.src='${this.defaultSrc ? this.defaultSrc : require('@/assets/image/thumb.jpg')}'`
  }
}
</script>

<style lang="scss" scoped>
img {
  position: relative;
  vertical-align: top;
  border: 0;

  &:after {
    content: '';
    background: url('~@/assets/image/thumb.jpg') 0 0/100% no-repeat;
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $e-f;
  }
}
</style>
