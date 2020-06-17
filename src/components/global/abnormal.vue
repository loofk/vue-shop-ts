<template lang="pug">
  .abnormal(v-if="show" :class="{'tabbar': tabbar, 'nav': nav}" @touchmove.stop.prevent="")
    div(:class="icon")
    p.e-font26.e-mt10.e-c9 {{ err }}
    button.err-btn(v-if="btn || isApiError" @click="$emit('callback')") {{ btnText }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Abnormal extends Vue {
  // 使用的图标
  @Prop({
    type: String,
    default: 'ico-lu3 sad'
  })
  icon!: string

  // 是否在tabbar页面展示
  @Prop({
    type: Boolean,
    default: false
  })
  tabbar!: boolean

  // 是否除去navbar高度
  @Prop({
    type: Boolean,
    default: true
  })
  nav!: boolean

  // 异常信息
  @Prop({
    type: String,
    default: ''
  })
  err!: string

  // 展示按钮
  @Prop({
    type: Boolean,
    default: true
  })
  btn!: boolean

  // 按钮文字
  @Prop({
    type: String,
    default: '重新加载'
  })
  btnText!: string

  get show () {
    return this.err.length > 0
  }

  get isApiError () {
    return this.icon === 'ico-lu3 sad'
  }
}
</script>

<style lang="scss" scoped>
.abnormal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 130;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: $e-f;
  text-align: center;

  &.nav {
    top: 45px;
    height: calc(100% - 45px);
  }

  &.tabbar {
    top: 45px;
    height: calc(100% - 45px - 55px);
  }
}

.err-btn {
  width: 60px;
  height: auto;
  padding: 4px 0;
  font-size: 12px;
  margin-top: 40px;
  background-color: $e-f;
  border: 1px solid $e-6;
}
</style>
