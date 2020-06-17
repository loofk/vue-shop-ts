<template lang="pug">
  .product-spec
    .e-box_f(@click="$emit('hidePopup')")
      .e-b-bottom.e-pb20(v-if="major.length")
        p.e-font15.e-bold 主要参数
        .show-line(v-for="(item, index) in major" :key="index")
          span.title {{ item.attrName }}
          span.content {{ item.attrValue }}
      .e-pb20(v-if="param")
        p.e-font15.e-bold {{ param.name }}
        .e-b-bottom.e-pb20(v-for="(item, index) in param.content" :key="index")
          p.e-bold.e-mt30.e-pb10.e-pl10 {{ item.name }}
          .show-line(v-for="(ele, idx) in item.content" :key="idx")
            span.title {{ ele.name }}
            span.content {{ ele.value }}
      .e-pb20(v-if="package")
        p.e-font15.e-bold.e-pt20 {{ package.name }}
        p.pack-info(v-for="(item, index) in package.value" :key="index") {{ item }}

</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

// 声明文件
import { MajorOptions, SpecOptions } from '@/types/api/product'

interface ParamBaseOptions {
  attrName: string;
  attrValue: string;
}

@Component
export default class ProductSpec extends Vue {
  // 主体参数
  @Prop({
    type: Array,
    default: () => []
  })
  major!: MajorOptions[]

  // 规格参数
  @Prop({
    type: Array,
    default: () => []
  })
  spec!: SpecOptions[]

  // 规格参数中的机器参数
  param: SpecOptions = {
    content: [],
    name: '',
    type: 0,
    valueType: 0
  }

  // 规格参数中的包装清单
  package: SpecOptions = {
    name: '',
    type: 1,
    value: [],
    valueType: 1
  }

  @Watch('spec')
  onSpecChange (val: any[]) {
    val.forEach(item => {
      if (item.valueType === 1) {
        this.package = item
      } else {
        this.param = item
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.show-line {
  display: flex;
  padding: 10px;

  .title {
    flex: 1;
    color: $e-9;
  }

  .content {
    flex: 3;
  }
}

.pack-info {
  display: inline-block;
  width: 50%;
  margin: 15px 0 5px;
  color: $e-9;
}
</style>
