<template lang="pug">
  .sku-picker
    .e-flex_f
      //- 产品展示
      .sku-detail
        image-loader(:src="showGood.image_url[0]" :width="80" :height="80")
        .e-flex_auto.e-ml10
          p.e-font15.e-omit2 {{ showGood.name }}
          p.text.e-omit2 {{ unselectSku.length > 0 ? `请选择：${unselectSku}` : `已选择：${showGood.spec_info}` }}
          p(:class="{ 'e-price m e-deepRed': !showGood.noPrice }") {{ showGood.noPrice ? '暂无报价' : showGood.price }}
      //- sku选择
      .sku-choose
        div(v-for="(item, index) in showSkuList" :key="index")
          p.title {{ item.title }}
          ul.content
            li.item(
              v-for="(subItem, pIndex) in item.list"
              :key="pIndex"
              :class="{ disabled: item.disabledList[pIndex], selected: selectedSku.indexOf(subItem) > -1 }"
              @click="skuClickHandle(subItem, index, item.disabledList[pIndex])") {{ subItem }}
      //- 数量选择
      .e-flex_center
        p.e-c9.e-font15
          span 数量
          span.e-font12.e-ml5 每人每次最多申请{{ limitNum }}个
        number-box(v-model="quantity" :min="1" :max="quotaNum")
      //- 插槽
      slot
    //- 申请按钮
    .e-fixed_bottom.e-bottom-btnGroup.e-flex_center
      button.e-flex_auto.e-grayBg(disabled v-if="!showGood.store") 暂时缺货
      button.e-btn-l.e-btnRedBg(v-if="showGood.store" @click="leftBtnConfirm") 加入购物车
      button.e-btn-l.e-btnBlackGoldBg(v-if="showGood.store" @click="rightBtnConfirm") 立即购买
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ShopAdjoin, SkuSelect } from '@/util' // sku算法
import numberBox from '@/components/number-count.vue'
import imageLoader from '@/components/image-loader.vue'

// 声明文件
import { ProductOptions, resolveProductOptions, SkuOptions } from '@/types/api/product'
import { SkuSimpleOptions } from '@/util/sku/sku'

type ShowSkuOptions = SkuSimpleOptions & { disabledList?: boolean[] }

let skuAdjoin!: ShopAdjoin // sku矩阵
let skuSelectClass!: SkuSelect

@Component({
  components: {
    numberBox,
    imageLoader
  }
})
export default class SkuPicker extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  show!: boolean

  // sku列表
  @Prop({
    type: Array,
    default: () => []
  })
  skuList!: SkuOptions[]

  // 产品列表
  @Prop({
    type: Array,
    default: () => []
  })
  productList!: ProductOptions[]

  // 默认展示的产品信息
  @Prop({
    type: Object,
    default: () => ({})
  })
  defaultGood!: resolveProductOptions

  // 限制购买数量，默认不限制
  @Prop({
    type: Number,
    default: -1
  })
  limitNum!: number

  // 选中一个商品还是一个规格
  @Prop({
    type: Boolean,
    default: false
  })
  chooseAll!: boolean

  // 总库存
  storeAll = 0
  // 计算出的有库存产品的价格区间
  priceAll: string | boolean = false
  // 展示的商品数据
  showGood: resolveProductOptions = {
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
    brief: '',
    noPrice: false,
    image_url: [],
    unselectSku: '',
    quantity: 0
  }

  // 被选中的某件产品
  selectedGood: ProductOptions = {
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

  // 选中的规格值
  selectedSku: string[] = []
  // 未选中的规格名称
  unselectSku = ''
  // 展示的所有规格值
  showSkuList: ShowSkuOptions[] = []
  // 购买的数量
  quantity = 1
  // 最大购买数
  quotaNum = 0

  @Watch('defaultGood')
  onDataChange (val: resolveProductOptions) {
    this.quantity = val.quantity ? val.quantity : 1
    this.initData()
  }

  initData () {
    // 计算总库存
    this.storeAll = this.productList.reduce((total: number, cur: ProductOptions) => {
      total += cur.store
      return total
    }, 0)

    // 计算价格区间
    this.calShowPrice(this.productList.filter(item => item.store > 0).map(item => parseInt(item.price)))

    // 处理数据
    const productData = this.productList.filter(item => item.store > 0).map(item => ({ id: item.product_id, specs: item.spec_desc }))
    this.showSkuList = this.skuList.map(ele => ({ title: ele.name, list: ele.item.map(e => e.spec_value) }))

    // 创建sku选择矩阵实例，算法一
    skuAdjoin = new ShopAdjoin(this.showSkuList, productData)

    // 创建sku选择类实例，算法二
    skuSelectClass = new SkuSelect(this.showSkuList, productData)

    // 如果默认商品无库存，则不选择，区分是否开启了选中具体sku产品
    this.selectedSku = Array.from({ length: this.skuList.length }, () => '')
    if (this.defaultGood.store > 0) {
      if (this.chooseAll) {
        this.selectedSku = [...this.defaultGood.spec_desc]
      } else {
        this.selectedSku[0] = this.defaultGood.spec_desc[0]
      }
    }

    this.getShowSku()
    // console.log(this.showSkuList);
  }

  // 点击sku
  skuClickHandle (param: string, pIndex: number, disabled: boolean) {
    // 去除不可点击项
    if (disabled) return false

    const index = this.selectedSku.indexOf(param)

    // 重复项清空该值，不同值但同类覆盖
    param = index > -1 ? '' : param
    this.selectedSku[pIndex] = param

    this.getShowSku()
  }

  // 根据查询出来的sku可选项更新showSkuList数组
  getShowSku (type = true) {
    let specsOptions: string[] = []
    // 测试两种算法耗时
    console.time('sku')
    if (type) {
      specsOptions = skuAdjoin.querySpecsOption(this.selectedSku)
    } else {
      specsOptions = skuSelectClass.querySpecsOption(this.selectedSku)
    }
    console.timeEnd('sku')
    // 将得到的可选项数组转化进展示数组中应用样式
    this.showSkuList.forEach(item => {
      item.disabledList = item.list.map(ele => specsOptions.indexOf(ele) < 0)
    })

    // 更新未选中规格值
    this.getUnselectedSku()

    // 更新showSkuList数组后，同步更新展示数据
    this.updateData()
  }

  // 校验选中值
  getUnselectedSku () {
    this.unselectSku = this.selectedSku.map((item, index) => !item && this.skuList[index].name).filter(Boolean).join(' ')
  }

  // 更新商品数据
  updateData () {
    // 更新展示图
    let chooseImg = this.defaultGood.image_url
    //   遍历出所有包含图片的sku并以最后一组为准
    if (this.selectedSku.some(Boolean)) {
      this.selectedSku.forEach((item, index) => {
        if (item) {
          const lastSkuObj = this.skuList[index].item.find(value => value.spec_value === item)
          if (lastSkuObj && lastSkuObj.image_url && lastSkuObj.image_url.length > 0) {
            chooseImg = lastSkuObj.image_url
          }
        }
      })
    }

    // 更新后的数据对象
    const changedData = Object.assign({}, this.defaultGood, {
      price: this.priceAll,
      noPrice: !this.priceAll,
      product_id: -1,
      spec_desc: this.selectedSku,
      spec_info: this.selectedSku.filter(Boolean).join(' '),
      image_url: chooseImg,
      store: this.storeAll
    })

    if (this.unselectSku.length <= 0) {
      // 找出匹配的产品
      this.selectedGood = this.productList.find(item => item.spec_desc.toString() === this.selectedSku.toString()) as ProductOptions
      // 更新库存、价格
      Object.assign(changedData, this.selectedGood)
      changedData.noPrice = !parseFloat(this.selectedGood.price)

      this.quotaNum = changedData.store

      // 设置了限定购买数时，最大购买量为产品库存和限定购买数的最小值
      if (this.limitNum > 0) {
        this.quotaNum = Math.min(this.limitNum, changedData.store)
      }
    } else {
      // 复位限定购买数
      this.quotaNum = changedData.store
    }

    // 给外部加上缺省提示
    changedData.unselectSku = this.unselectSku

    // 展示的数据对象
    this.showGood = { ...changedData }

    this.$emit('onSelected', this.showGood)
  }

  // 计算选择sku多个匹配产品的价格区间
  calShowPrice (priceArr: number[]) {
    let minPrice, maxPrice

    if (!priceArr.length) {
      this.priceAll = false
    } else {
      minPrice = Math.min(...priceArr).toFixed(2).toString()
      maxPrice = Math.max(...priceArr).toFixed(2).toString()
      this.priceAll = minPrice

      if (minPrice !== maxPrice) {
        this.priceAll += '-' + maxPrice
      }
    }
  }

  // 数据校验
  validite () {
    // 校验选中值
    if (this.unselectSku.length > 0) {
      this.$toast(`请选择 ${this.unselectSku}`)
      return false
    }
    // 校验价格为0
    if (this.showGood.noPrice) {
      this.$toast('所选商品暂时无法申请哦，敬请期待')
      return false
    }
    // 校验库存
    if (this.showGood.store <= 0) {
      return false
    }

    // 校验申请数量
    if (this.quantity > this.showGood.store) {
      this.$toast('申请数量超出库存，请减少申请数量重试')
      return false
    }

    return true
  }

  // 左侧按钮提交
  leftBtnConfirm () {
    if (!this.validite()) return

    this.showGood.quantity = this.quantity
    this.$emit('onLeftConfirm', this.showGood)
  }

  // 右侧按钮提交
  rightBtnConfirm () {
    if (!this.validite()) return

    this.showGood.quantity = this.quantity
    this.$emit('onRightConfirm', this.showGood)
  }
}
</script>

<style lang="scss" scoped>
.e-btn-l {
  width: 170px;
}
.sku-picker {
  padding-bottom: 50px;

  .e-flex_f {
    padding: 6px;
    padding-bottom: 10px;
  }
}

.sku-detail {
  display: flex;
  padding: 0 15px 15px 0;
  border-bottom: 1px solid $e-line;

  .text {
    height: 32px;
    margin: 5px 0;
    color: $e-9;
  }
}

.sku-choose {
  max-height: 400px;
  padding-top: 15px;

  .title {
    font-size: 15px;
    color: $e-9;
  }

  .content {
    margin-top: 13px;
    margin-right: -13px;

  .item {
    display: inline-block;
    min-width: 60px;
    padding: 5px 10px;
    text-align: center;
    border-radius: 13px;
    border: 1px solid $e-9;
    margin-bottom: 13px;
    margin-right: 13px;
    &.selected {
      color: $e-deepRed;
      border-color: $e-deepRed;
      background-color: transparent;
    }
    &.disabled {
      background-color: #eee;
      color: #aaa;
      border-color: transparent;
    }
  }
  }
}
</style>
