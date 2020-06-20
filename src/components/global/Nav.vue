<template lang="pug">
  .navbar(:style="{backgroundColor: navColor }")
    .content.e-flex_center
      //- 左侧logo
      .logo(v-if="logo")
      //- 左侧按钮
      .left-btn.e-flex_center(v-else)
        p.icon.icon-left(@click="toBack" v-if="back")
        .e-flex_center(v-if="home")
          span.line(v-if="back")
          p.icon.icon-home(@click="toHome")
      //- 扩展
      div(v-if="expand"): slot
      //- 标题
      p.title(v-else) {{ title }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Nav extends Vue {
  // 导航颜色
  @Prop({
    type: String,
    default: '#fff'
  })
  navColor?: string

  // 是否展示logo
  @Prop({
    type: Boolean,
    default: false
  })
  logo?: boolean

  // 是否展示回到首页按钮
  @Prop({
    type: Boolean,
    default: false
  })
  home?: boolean

  // 是否扩展，会隐藏title
  @Prop({
    type: Boolean,
    default: false
  })
  expand?: boolean

  // 标题文字
  @Prop({
    type: String,
    default: '慧通E购'
  })
  title?: string

  // 返回几步
  @Prop({
    type: Number,
    default: 1
  })
  delta!: number

  // 是否是分类页
  @Prop({
    type: Boolean,
    default: false
  })
  tabbar?: boolean

  back = false

  created () {
    this.back = !this.tabbar && !!(window.history.length > 1)
  }

  toBack () {
    this.delta >= 1 ? this.$nav.back(this.delta) : this.$emit('toBack')
  }

  toHome () {
    this.$nav.toHome()
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.content {
  position: relative;
  padding: 0 10px;
  height: 44px;
  border-bottom: 1px solid $e-line;
}

// 比导航内容高层级，确保按钮可点
.left-btn {
  position: relative;
  z-index: 10;
}

.icon {
  padding: 5px;
  color: #000;
}

.line {
  width: 1px;
  height: 19px;
  margin: 0 5px;
  background: $e-line;
}

.logo {
  width: 90px;
  height: 29px;
  background: url('../../assets/image/logo.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.title {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  text-align: center;
  color: black;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
