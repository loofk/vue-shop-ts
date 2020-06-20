<template lang="pug">
  .cart
    //- 接口调用失败
    Abnormal(v-if="errMsg" :err="errMsg" tabbar @callback="getCartInfo")
    //- 无购物车商品
    Abnormal(v-else-if="noGoods" err="购物车空空如也~" icon="ico-state cart" btnText="去逛逛" tabbar btn @callback="$nav.to('cate')")
    //- 购物车列表
    .c-main(v-else)
      .c-item(v-for="(item, index) in items" :key="index")
        .e-flex_center
          i.icon.e-font28(:class="[item.selected ? 'icon-checked e-deepRed' : 'icon-empty-circle']" @click="handleSelectItem(item.obj_ident, item.selected)" v-if="item.can_buy")
          button.c-invalid-btn(disabled v-else) 缺货
          proTemplate.e-flex_auto.e-ml10(count :info="item", @count="handleItemNum")
        //- p.e-txtR.e-mt10
        //-   span.e-deepRed.e-font12(@click="handleAddCollection(item.obj_ident)") 移入收藏夹
        //-   span.e-c9.e-font12.e-ml10(@click="handleDeleteItem(item.obj_ident)") 删除
    //- 支付模块
    .e-fixed_bottom.e-bottom-btnGroup.e-flex_center
      //- 全选按钮
      .e-flex_center.e-ml15
        i.icon(:class="[isSelectAll ? 'icon-checked e-deepRed' : 'icon-empty-circle']" @click="handleSelectAll")
        span.e-c9 全选
      //- 金额
      p.e-flex_left.ml10
        span 合计：
        span.e-price.l.e-deepRed {{ total }}
      //- 结算按钮
      button.e-btn-m(:class="[isPaymentBtnDisabled ? 'e-grayBg' : 'e-btnRedBg']" @click="goPay") 去结算
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import proTemplate from '@/components/pro-template.vue'
import cartApi from '@/api/cart'

const userModule = namespace('user')

@Component({
  components: {
    proTemplate
  }
})
export default class Cart extends Vue {
  // 总金额
  total = 0
  errMsg = ''
  showSkuPicker = false
  items = [] // 购物车商品
  leftDis = 0 // 左滑的距离
  deleteBtnWidth = 150 // 删除按钮宽
  isSelectAll = false // 是否全选
  noGoods = false // 购物车是否有商品

  @userModule.Mutation('SET_CART_COUNT') setCartCount!: Function

  // 结算置灰按钮
  get isPaymentBtnDisabled () {
    return this.total <= 0
  }

  created () {
    this.getCartInfo()
  }

  // 更新页面数据
  updateCartInfo (data: any) {
    // 设置购物车商品总数
    this.setCartCount(data.total_quantity.toString())

    // 设置购物车商品数据
    this.items = data.goods

    // 判断全选按钮
    this.isSelectAll = data.is_selected_all

    // 总价格
    this.total = data.selected_price

    // 购物车内无商品
    this.noGoods = data.items.length === 0
  }

  // 获取购物车信息
  async getCartInfo () {
    this.$loading()
    const [err, res] = await this.$to(cartApi.getItems())
    this.$loading(false)

    err && (this.errMsg = err.msg || '购物车商品加载失败')
    if (res && res.data) {
      this.errMsg = ''
      this.updateCartInfo(res.data)
    }
  }

  // 增减配件购买数量
  async handleItemNum (data: any) {
    const params: {
      [s: string]: number;
    } = {}
    params[data.obj_ident] = data.quantity

    this.$loading()
    const [err, res] = await this.$to(cartApi.updateItemNum(params))
    this.$loading(false)

    if (err) {
      this.$toast(err.msg || '修改失败！')
    }
    if (res && res.data) {
      this.updateCartInfo(res.data)
    }
  }

  // 选中/取消购物车商品
  async handleSelectItem (ident: string, selected: boolean) {
    this.$loading()
    const [err, res] = await this.$to(cartApi.setItemSelected(ident, selected ? 0 : 1))
    this.$loading(false)

    if (err) {
      this.$toast(err.msg || '选中失败！')
    }
    if (res && res.data) {
      this.updateCartInfo(res.data)
    }
  }

  // 全选/全部取消
  async handleSelectAll () {
    const flag = this.isSelectAll ? 0 : 1
    this.$loading()
    const [err, res] = await this.$to(cartApi.setAllSelected(flag))
    this.$loading(false)

    if (err) {
      this.$toast(err.msg || '全选失败！')
    }
    if (res && res.data) {
      this.updateCartInfo(res.data)
    }
  }

  // 删除购物车商品
  async handleDeleteItem (ident: string) {
    const [, confirm] = await this.$to(this.$modal.confirm('确定删除？'))
    if (confirm) {
      this.$loading('删除中...')
      const [err, res] = await this.$to(cartApi.deleteItem(ident))
      this.$loading(false)

      if (err) {
        this.$toast(err.msg || '删除失败！')
      }
      if (res && res.data) {
        this.updateCartInfo(res.data)
      }
    }
  }

  // 移入收藏夹
  async handleAddCollection (ident: string) {
    const [, confirm] = await this.$to(this.$modal.confirm('确定放入收藏夹？'))
    if (confirm) {
      // TODO 增加收藏商品功能
      // const [err, res] = await this.$to(cartApi.deleteItem(ident))
      console.log(ident)
    }
  }

  // 结算
  goPay () {
    if (this.isPaymentBtnDisabled) return

    // 跳转下单页
    this.$nav.to('order')
  }
}
</script>

<style lang="scss" scoped>
.e-fixed_bottom {
  bottom: calc(55px + env(safe-area-inset-bottom) );
}

.c-main {
  padding-bottom: 55px;
}

.c-item {
  margin: 15px 12px;
  padding: 15px 12px;
  overflow: hidden;
  background: $e-f;
  border-radius: 5px;
  box-shadow: 0 5px 7px 1px rgba(0, 0, 0, 0.03);
}

// 商品无库存时无效按钮
.c-invalid-btn {
  width: 30px;
  height: 20px;
  padding: 0;
  margin: 0;
  line-height: 20px;
  border: none;
  font-size: 12px;
}
</style>
