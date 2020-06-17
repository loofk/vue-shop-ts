<template lang="pug">
  div(@touchmove.stop.prevent="")
    //- 遮罩
    .e-mask.e-mask_fade(:class="{ 'e-mask_show': show }" @click="$emit('hidePopup')")
    //- 主体
    .popup(:class="{'popup_toggle': show && ['top', 'bottom'].includes(position), 'popup_top': position === 'top', 'popup_bottom': position === 'bottom', 'e-mask_fade popup_middle e-fixed_mid': position === 'middle', 'e-mask_show': show && position === 'middle', 'full': full}")
      p.popup_title(v-if="title") {{ title }}
      .main.
        {{ msg }}
        #[slot]
      i.icon.icon-close(v-if="close" @click="$emit('hidePopup')")
      //- 全屏关闭按钮
      .full-close-btn(v-if="full" @click="$emit('hidePopup')")
        i.icon.icon-close
        span 收起参数
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Popup extends Vue {
  // 页面显示
  @Prop({
    type: Boolean,
    default: false
  })
  show!: boolean

  // 弹框位置，值有top、middle、bottom
  @Prop({
    type: String,
    default: 'middle'
  })
  position!: boolean

  // 弹框标题
  @Prop({
    type: String,
    default: ''
  })
  title!: string

  // 弹框文案
  @Prop({
    type: String,
    default: ''
  })
  msg!: string

  // 是否展示关闭按钮
  @Prop({
    type: Boolean,
    default: true
  })
  close!: boolean

  // 是否全屏展示，前提是position值为middle
  @Prop({
    type: Boolean,
    default: false
  })
  full!: boolean
}
</script>

<style lang="scss" scoped>
.popup {
  background: $e-f;
  position: fixed;

  > .icon-close {
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: $e-9;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
  }
}

.popup_top,
.popup_bottom {
  left: 0;
  right: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 120;
}

.popup_top {
  top: 0;
  transform: translateY(-100%);
}

.popup_bottom {
  padding: 5px;
  border-radius: 5px;

  bottom: 0;
  transform: translateY(100%);

  .main {
    max-height: 600px;
  }
}

.popup_middle {
  border-radius: 13px;
  padding: 10px;
}

// 规格参数全屏弹框样式
.full.popup_middle {
  box-sizing: content-box;
  width: 100%;
  height: 100%;

  .main {
    height: 100%;
    overflow: auto;
  }
}

.popup_toggle {
  visibility: visible;
  transform: translate(0);
}

.popup_title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}

.full-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  text-align: center;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.4);
  color: $e-f;
  position: fixed;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  .icon-close {
    width: auto;
    height: auto;
    line-height: 1;
    font-size: 15px;
  }
}
</style>
