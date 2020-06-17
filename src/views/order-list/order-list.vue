<template lang="pug">
  .order-list.scroll-page(:style="`paddingTop: ${navHeight}px`")
    Nav(home title="我的订单")
    //- 分类nav
    ul.e-flex_center.ol-nav
      li(v-for="(item, index) in tab" :key="index" :class="{ active: chooseStatus === index }" :data-value="index" @click="handleNavChange") {{ item }}
    //- 展示列表
    mt-loadmore.scroll-view(:top-method="getList" :bottom-method="getMore" :bottom-all-loaded="allowLoaded" ref="loadmore")
      .e-box_p(v-for="(item, index) in orderList" :key="index" :class="{ 'mb0': index === orderList.length - 1 }")
        router-link(:to="{ name: 'order-detail', params: { id: item.order_id } }")
          .order-status.e-flex_center
            p
              span 订单金额：
              span.e-price.e-deepRed {{ item.cost_item }}
            p(:class="[isStatus(item.order_status, 'canceled') ? 'e-c9' : 'e-deepRed']") {{ tab[statusMap[item.order_status]] }}
          //- 商品详情
          div(v-for="(itm, idx) in item.order_items" :key="idx")
            pro-template(:info="itm" :canClick="false" :priceRed="false")
            p.e-gap-line(v-if="idx !== item.order_items.length - 1")
        //- 订单操作按钮
        .btn-group(v-if="isStatus(item.order_status, ['unpaid', 'delivered', 'completed'])")
          button.e-btnRedBorder(v-if="isStatus(item.order_status, 'delivered')" @click="goLogistics(item.logi_no, item.order_id)") 查看物流
          button.e-grayBorder(v-if="isStatus(item.order_status, 'unpaid')" @click="cancelOrder(item.order_id)") 取消订单
          button.e-btnRedBg(v-if="isStatus(item.order_status, 'unpaid')" @click="wxPay(item)") 付款
          button.e-grayBorder(v-if="isStatus(item.order_status, ['delivered', 'completed'])" @click="exchange") 退换货

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import orderConst from '@/constant/order'
import orderApi from '@/api/order'
import proTemplate from '@/components/pro-template.vue'

const namespace = 'app'

@Component({
  components: {
    proTemplate
  }
})
export default class OrderList extends Vue {
  // 订单状态
  status = orderConst.status
  // 订单状态映射表，考虑与后端约定使用字符串标识订单状态
  statusMap = [
    this.status.unpaid,
    this.status.undeliver,
    this.status.delivered,
    this.status.canceled,
    this.status.completed
  ]

  // 订单tab项
  tab = orderConst.tab
  // 当前选中的订单类别，默认选中全部
  chooseStatus = 'all'
  // 订单列表
  orderList: any[] = []
  // 分次获取数据
  page = 1
  // 是否允许上拉加载，false为允许，数据加载完全后置为true
  allowLoaded = false
  errMsg = ''
  noList = false

  @Getter('getNavHeight', { namespace }) navHeight!: number

  created () {
    this.getList()
  }

  // 初始加载，下拉刷新
  getList () {
    this.page = 1
    orderApi.orderList(this.page).then(res => {
      this.errMsg = ''
      this.noList = res.data.length === 0
      this.orderList = res.data
      ;(this.$refs.loadmore as LoadMore).onTopLoaded()
    }).catch(err => {
      this.errMsg = err.msg || '订单加载失败'
      this.orderList = [] // 手动清除列表数据
    })
  }

  // 上拉加载
  async getMore () {
    this.page++
    const [err, res] = await this.$to(orderApi.orderList(this.page))

    err && this.$toast(err.msg || '没有更多订单')
    if (res) {
      if (res.data.length === 0) {
        this.allowLoaded = true
      } else {
        this.orderList = this.orderList.concat(res.data)
      }
      this.$refs.loadMore.onBottomLoaded()
    }
  }

  // 切换订单分类项
  handleNavChange (e: MouseEvent) {
    const status = (e.target as HTMLElement).dataset.value as string
    if (status === this.chooseStatus) return
    this.chooseStatus = status
    this.getList()
  }

  // 根据后台返回值计算出订单状态是否符合预期
  isStatus (st: number, expectStatus: string[] | string) {
    if (typeof expectStatus === 'string') {
      return expectStatus === this.statusMap[st]
    } else {
      return expectStatus.includes(this.statusMap[st])
    }
  }

  // 查看物流
  goLogistics (logiNo: string | undefined, orderId: string) {
    if (!logiNo) return false

    this.$nav.to('logistics', { logiNo, orderId })
  }

  // 取消订单
  async cancelOrder (orderId: string) {
    const [, confirm] = await this.$to(this.$modal.confirm('确定取消订单？'))
    if (confirm) {
      const [err, res] = await this.$to(orderApi.cancelOrder(orderId))
      if (err) {
        this.$toast(err.msg)
      }
      if (res) {
        this.$toast('取消成功')
        this.getList()
      }
    }
  }

  // 支付
  wxPay (item: any) {
    console.log(`支付${item.order_id}订单`)
  }

  // 退换货
  exchange () {
    console.log('退换货成功')
  }
}
</script>

<style lang="scss" scoped>
.e-box_p {
  padding: 14px;
}
.order-list {

}

.ol-nav {
  margin: 15px 70px 0;
  font-size: 12px;
  color: $e-9;

  li {
    padding-bottom: 5px;
    border-bottom: 2px solid transparent;

    &.active {
      border-bottom-color: $e-deepRed;
    }
  }
}

.order-status {
  margin-bottom: 10px;
  font-size: 15px;
}

.btn-group {
  margin-top: 10px;
  text-align: right;

  button {
    width: 65px;
    height: auto;
    margin-left: 15px;
    padding: 6px 0;
    font-size: 12px;
  }
}
</style>
