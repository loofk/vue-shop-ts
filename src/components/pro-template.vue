<template lang="pug">
  .proTemplate(@click="goApply")
    //- 水平模式
    .e-flex_auto(v-if="isHorizontal")
      .e-flex
        image-loader(:src="showSrc" :width="90" :height="90")
        .e-flex_auto.e-ml10.e-relative
          p.e-omit1.e-font15 {{ showName }}
          p.e-font12.e-c9.e-mt5.e-omit2(v-if="!sku") {{ showSkuText }}
          .sku-wrapper.e-flex_center(v-else @click.stop="$emit('sku')")
            span.sku_info(v-if="info.unselectedSku") 请选择 {{ info.unselectedSku }}
            span.sku_info(v-else) {{ showSkuText }}
            i.icon.icon-down.e-font20
          .num-and-price.e-flex_center
            p.e-price(:class="{ 'e-deepRed': priceRed }" v-if="price && info.price > 0") {{ info.price }}
            p.e-font12(:class="{ 'e-deepRed': priceRed }" v-else-if="info.price <= 0") 暂无报价
            //- 计步器
            number-box(v-if="count" id="numberBox" v-model="info.quantity" :min="1" :max="info.store" size="small" @confirm="handleNumberBox")
            span.e-c9(v-if="!count && info.num > 0") x{{ info.num }}
    //- 垂直模式
    .e-txtC(v-else)
      image-loader(:src="showSrc" :width="verticalConfig.imageSize" :height="verticalConfig.imageSize")
      .p-info
        p.e-omit1.e-mt5(:style="{fontSize: `${verticalConfig.nameSize}px`}") {{ showName }}
        //- 商品简介
        p.e-omit1.e-c9.e-mt5(:style="{ fontSize: `${verticalConfig.briefSize}px` }") {{ info.brief }}
        .price
          p.e-price.e-deepRed(:style="{ fontSize: `${verticalConfig.priceSize}px` }" v-if="info.price > 0") {{ info.price }}
          p.e-deepRed(:style="{ fontSize: `${verticalConfig.priceSize}px` }" v-else) 暂无报价
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import numberBox from '@/components/number-count.vue'
import imageLoader from '@/components/image-loader.vue'

interface ProTemplateSizeContentConfig {
  nameSize: number;
  briefSize: number;
  priceSize: number;
  imageSize: number;
}
interface ProTemplateSizeConfig {
  [s: string]: ProTemplateSizeContentConfig;
}

@Component({
  components: {
    numberBox,
    imageLoader
  }
})
export default class ProTemplate extends Vue {
  // 陈列方式，垂直vertical，水平horizontal
  @Prop({
    type: String,
    default: 'horizontal'
  })
  direction!: string

  // 能否点击
  @Prop({
    type: Boolean,
    default: true
  })
  canClick!: boolean

  // 跳转的页面
  @Prop({
    type: String,
    default: 'product-detail'
  })
  page!: string

  // 展示商品简介（垂直模式下）
  @Prop({
    type: Boolean,
    default: true
  })
  brief!: boolean

  // 尺寸（垂直模式下）
  @Prop({
    type: String,
    default: 'large'
  })
  size!: string

  // 是否展示价格（水平模式下）
  @Prop({
    type: Boolean,
    default: true
  })
  price!: boolean

  // 价格是否标红（水平模式下）
  @Prop({
    type: Boolean,
    default: true
  })
  priceRed!: boolean

  // 是否可选择sku（水平模式下）
  @Prop({
    type: Boolean,
    default: false
  })
  sku!: boolean

  // 是否展示计步器（水平模式下）
  @Prop({
    type: Boolean,
    default: false
  })
  count!: boolean

  // 数据
  @Prop({
    type: Object,
    default: () => ({})
  })
  info!: any

  // 商品尺寸配置
  config: ProTemplateSizeConfig = {
    small: {
      nameSize: 12,
      briefSize: 12,
      priceSize: 14,
      imageSize: 90
    },
    large: {
      nameSize: 12,
      briefSize: 12,
      priceSize: 14,
      imageSize: 170
    }
  }

  get isHorizontal () {
    return this.direction === 'horizontal'
  }

  get verticalConfig () {
    return this.config[this.size]
  }

  // 都是后台传字段不规范的锅，统一字段名称后可删除
  // 展示的图片地址
  get showSrc () {
    if (typeof this.info.image_url === 'string') {
      return this.info.image_url
    } else if (typeof this.info.image_url === 'object') {
      return this.info.image_url[0]
    }

    return this.info.image || this.info.image_id
  }

  // 展示的商品名称
  get showName () {
    return this.info.gbn || this.info.original_name || this.info.name
  }

  // 展示的sku值
  get showSkuText () {
    return this.info.spec_info || this.info.spec || this.info.product_attr_str
  }

  @Emit('count')
  handleNumberBox () {
    return this.info
  }

  goApply (e: MouseEvent) {
    const target = e.target as HTMLImageElement
    if (!this.canClick) return

    // 屏蔽计步器
    if (target.id === 'numberBox') return

    this.$nav.to(this.page, { id: this.info.product_id })
  }
}
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
}

.sku-wrapper {
  display: inline-flex;
  max-width: 152px;
  padding: 0 4px;
  margin-top: 5px;
  color: $e-9;
  border-radius: 2px;
  white-space: nowrap;
  background-color: $e-gray;

  .sku-info {
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.num-and-price {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.p-info {
  padding: 0 7px;

  .price {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
  }
}
</style>
