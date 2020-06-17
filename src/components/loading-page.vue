<template lang="pug">
  .loading-page(:class="position")
    load-more(:status="status" :text="[]" :loadingMoreIcon="require('../assets/image/skip-loading.png')" :loadingMoreIconSize="size")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import loadMore from '@/components/load-more.vue'

@Component({
  components: {
    loadMore
  }
})
export default class LoadingPage extends Vue {
  // loading状态
  @Prop({
    type: Number,
    default: 0
  })
  status!: number

  // loading图尺寸
  @Prop({
    type: String,
    default: 'small'
  })
  size!: string

  // loading图位置
  @Prop({
    type: String,
    default: 'center'
  })
  position!: string
}
</script>

<style lang="scss" scoped>
.loading-page {
  display: flex;
  flex-direction: column;
  align-items: center;
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

  &.center {
    justify-content: center;
  }

  &.top {
    justify-content: flex-start;
  }

  &.bottom {
    justify-content: flex-end;
  }
}
</style>
