<template lang="pug">
  .scroll-page.without-tabbar.skeleton(:style="`paddingTop: ${navHeight}px`")
    //- 导航栏
    Nav(home expand)
      ul.goods-nav.e-flex_center
        li.nav-item-wrapper(v-for="(item, index) in navList" :key="index" @click="navLift(index)")
          p.nav-item(:class="{ active: chooseNav === index }") {{ item }}
    //- 骨架屏
    skeleton(v-if="showSkeleton" loading="chiaroscuro" :style="`paddingTop: ${navHeight}px`")
    //- 接口调用失败
    Abnormal(v-else-if="errMsg" :err="errMsg" @callback="getGoodsSku")
    //- 内容
    div.scroll-view(@scroll="handleScroll")
      //- page-1
      #page-1.e-pt20
        //- banner
        mt-swipe(style="height:300px")
          mt-swipe-item.e-txtC(v-for="(item, index) in bannerList" :key="index"): img(:src="item" :width="300" :height="300")
        //- 商品基本信息
        .p-info.e-box_p
          p.e-c3.e-font20.e-omit1 {{ goodsInfo.name }}
          p.brief {{ goodsInfo.brief }}
          p.e-font18.e-deepRed(v-if="noPrice") 暂无报价
          p.e-price.l.e-deepRed(v-else) {{ price }}
        //- sku和配送信息
        .p-sku.e-box_p
          p.item(@click="showSkuPicker = true")
            span.e-c9 选择
            span.choose.e-omit1(v-if="unselectSkuText.length") 请选择 {{ unselectSkuText }}
            span.choose.e-omit1(v-else) 已选择 {{ skuInfo }}
            i.icon.icon-right.e-font22
          p.e-gap-line
          p.item
            span.e-c9 配送
            span.e-c3.e-omit1.e-ml20 顺丰快递
      //- page-2
      #page-2(v-if="showSpecInfo.length")
        .p-params.e-box_f.e-mb20
          .title 规格参数
          .e-b-bottom.e-pb20(v-for="(item, index) in showSpecInfo" :key="index")
            .sub-title {{ item.name }}
            .content(v-for="(ele, idx) in item.content" :key="idx")
              p.name {{ ele.name }}
              p.value {{ ele.value }}
            //- 查看更多
            p.e-flex_center.read-more(@click="showParamDetail = true")
              span 查看更多
              i.icon.icon-down.e-font22
      //- page-3
      #page-3(v-if="imageList.length")
        img.e-block(v-for="(item, index) in imageList" :key="index" :src="item")
    //- 底部操作栏
    .e-fixed_bottom.e-bottom-btnGroup.e-flex_right
      p.icon-btn(@click="onCallPhone")
        i.icon.icon-customer.e-c6
        span.e-font12.e-c9 客服
      p.icon-btn(@click="$router.push('cart')")
        i.icon.icon-cart.e-c6
        span.e-font12.e-c9 购物车
        span.cart-num(v-if="cartCount > 0") {{ cartCount }}
        //- 加入购物车特效
        span.cart-add_one(v-if="isAdd" :class="{ 'add-animate': isAdd }") +1
      //- 按钮
      button.e-btn-l(:class="[isDisabled ? 'e-grayBg' : 'e-btnRedBg']" :disabled="isDisabled" data-skeleton-color="deepRed" @click="showSkuPicker = true") {{ isDisabled ? '暂时缺货' : '加入购物车' }}

    //- 返回顶部
    go-top

    //- sku弹框
    popup(:show="showSkuPicker" position="bottom" @hidePopup="showSkuPicker = false")
      sku-picker(
        v-if="defaultGood"
        :show="showSkuPicker"
        :defaultGood="defaultGood"
        :skuList="skuList"
        :productList="productList"
        :limitNum="5"
        @onSelected="onSelected"
        @onLeftConfirm="onLeftConfirm"
        @onRightConfirm="onRightConfirm"
      )
    //- 参数详情弹框
    popup.spec-popup(:show="showParamDetail" @hidePopup="showParamDetail = false" full :close="false")
      product-spec(v-if="specList" :major="majorList" :spec="specList" @hidePopup="showParamDetail = false")

</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import skeleton from '@/components/skeleton.vue'
import popup from '@/components/popup.vue'
import skuPicker from '@/components/sku-picker.vue'
import productSpec from '@/components/product-spec.vue'
import goTop from '@/components/go-top.vue'
import productApi from '@/api/product'
import cartApi from '@/api/cart'

// 声明文件
import * as product from '@/types/api/product'
import { AddItemRequest } from '@/types/api/cart'

const appModule = namespace('app')
const userModule = namespace('user')

@Component({
  components: {
    skeleton,
    popup,
    skuPicker,
    productSpec,
    goTop
  }
})
export default class ProductDetail extends Vue {
  // 产品iD
  productId = ''
  // 选中的导航项
  chooseNav = 0
  // 导航参数
  navList = ['商品', '参数', '详情']

  // 商品的基本信息
  goodsInfo: product.GoodsInfoOptions = {
    is_egou: 0,
    name: '',
    brief: '',
    store: 0
  }

  // 默认展示的具体产品信息
  defaultGood: product.ProductOptions = {
    product_id: '',
    goods_id: '',
    spec_desc: [],
    spec_info: '',
    store: 0,
    freez: '0',
    is_default: 'false',
    price: '0.00',
    name: '',
    spec_private_value_id: [],
    brief: ''
  }

  // 商品的sku列表
  skuList: product.SkuOptions[] = []
  // 产品列表
  productList: product.ProductOptions[] = []
  // 产品详情图文列表
  imageList: string[] = []
  // 主体规格信息
  majorList: product.MajorOptions[] = []
  // 参数信息
  specList: product.SpecOptions[] = []
  // 展示的部分参数信息
  showSpecInfo: any = []

  // 详情页展示的商品数据
  price = ''
  noPrice = false
  skuInfo = ''
  unselectSkuText = ''
  bannerList: string[] = []

  // 导航
  sizeState = true
  heightArr = [
    {
      pid: 1,
      top: 0,
      height: 0
    },
    {
      pid: 2,
      top: 0,
      height: 0
    },
    {
      pid: 3,
      top: 0,
      height: 0
    }
  ]

  // 加入购物车按钮是否禁用
  isDisabled = false
  isAdd = false

  // 弹框参数
  showSkuPicker = false
  showParamDetail = false

  errMsg = ''
  // 骨架屏状态
  showSkeleton = true

  @appModule.State navHeight!: number
  @userModule.State cartCount!: number
  @userModule.Mutation('SET_CART_COUNT') setCartCount!: Function

  created () {
    this.productId = this.$route.params.id
    this.getGoodsSku()
  }

  // 获取商品信息
  getGoodsSku () {
    this.$loading()
    productApi.goodsSku(this.productId).then(res => {
      this.errMsg = ''
      const data = res.data
      this.goodsInfo = data.goods_info
      this.defaultGood = data.selected_product || data.default_product
      this.skuList = data.sku_list
      this.productList = data.product_list

      this.getPicSpecific()
    }).catch(err => {
      this.errMsg = err.msg || '网络不给力或页面加载失败'
    }).finally(() => {
      this.$loading(false)
      this.showSkeleton = false
    })
  }

  // 请求规格参数和图文详情
  getPicSpecific () {
    this.$loading()
    productApi.picSpecific(this.productId).then(res => {
      const data = res.data
      this.imageList = data.imageList
      if (data.majorSpecificationList && data.specifications) {
        this.majorList = data.majorSpecificationList
        this.specList = data.specifications
        const content = this.specList.filter(item => item.valueType === 0)[0].content
        this.showSpecInfo = content ? content.slice(0, 4) : []
      } else {
        this.majorList = []
        this.specList = []
        this.showSpecInfo = []
      }
    }).catch(err => {
      this.$toast(err.msg || '参数加载失败！')
    }).finally(() => {
      this.$loading(false)
    })
  }

  // 同步选中产品
  onSelected (data: product.resolveProductOptions) {
    // 处理价格
    this.price = data.price
    this.noPrice = data.noPrice ? data.noPrice : false

    // 处理SKU
    this.skuInfo = data.spec_info
    this.unselectSkuText = data.unselectSku ? data.unselectSku : ''

    // 处理库存
    this.isDisabled = data.store <= 0

    // 处理图片列表
    this.bannerList = data.image_url ? data.image_url : []

    // 处理产品ID，优化成产品ID更改才去拉数据
    const newProId = data.product_id
    if (parseInt(newProId) > 0 && this.productId !== newProId) {
      this.productId = newProId

      // 重新拉取规格参数和图文信息
      this.getPicSpecific()
    }
  }

  // 获取元素高度
  getSize () {
    this.heightArr.forEach(item => {
      const el = document.querySelector(`#page-${item.pid}`) as HTMLElement
      // 减去导航高度
      item.top = el.offsetTop - this.navHeight
      item.height = el.offsetHeight
    })
    this.sizeState = false
  }

  // 点击导航栏
  navLift (index: number) {
    if (this.chooseNav !== index) {
      const el = document.querySelector(`#page-${this.heightArr[index].pid}`) as HTMLElement
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 处理滚动
  handleScroll (e: Event) {
    const scrollTop = (e.target as HTMLElement).scrollTop
    this.sizeState && this.getSize()
    this.$nextTick(() => {
      const idx = this.heightArr.filter(item => item.top <= scrollTop)
      idx.length > 0 && (this.chooseNav = idx.length - 1)
    })
  }

  // 处理左边按钮的回调
  onLeftConfirm (data: product.resolveProductOptions) {
    // 关闭SKU弹框
    this.showSkuPicker = false

    const params: AddItemRequest = {
      product_id: data.product_id,
      num: data.quantity,
      is_single: false,
      return_all: false,
      fast: false,
      overwrite: false
    }

    cartApi.addItem(params).then(res => {
      this.setCartCount(res.data.num)

      // 开启加入动画，1s后移除避免下次重复触发
      this.isAdd = true
      setTimeout(() => {
        this.isAdd = false
      }, 1000)

      this.$toast('加入购物车成功')
    }).catch(err => {
      this.$toast(err.msg || '加入购物车失败')
    })
  }

  // 处理右边按钮回调
  onRightConfirm (data: product.ProductOptions) {
    console.log(data)
    // 关闭SKU弹框
    this.showSkuPicker = false

    this.$nav.to('order')
  }

  // 联系客服
  onCallPhone () {
    this.$toast('联系客服')
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/detail.scss";
.icon-btn {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 14%;
  margin-right: 20px;
  background-color: transparent;

  .icon {
    width: 26px;
    height: 26px;
  }
}

.cart-num {
  position: absolute;
  top: 1px;
  right: 5px;
  width: 18px;
  padding: 2.5px 0;
  font-size: 12px;
  color: $e-f;
  text-align: center;
  background: $e-deepRed;
  border-radius: 18px;
}

.cart-add_one {
  width: 20px;
  position: absolute;
  top: -12.5px;
  left: 50%;
  margin-left: -10px;
  font-size: 15px;
  color: $e-deepRed;
  opacity: 0;
  transform: translateY(0);
  &.add-animate {
    animation: moveUp 0.8s ease;
  }
}

@keyframes moveUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-25px);
  }
}
</style>
