<template lang="pug">
  .user(:style="`paddingTop: ${navHeight}px`")
    Nav(tabbar title="个人中心")
    //- 个人信息
    .u-member.e-box_p
      .e-flex_left
        img.avatar-img(src="@/assets/image/avatar.jpg")
        .e-ml20
          p.e-c0 159****9463
          button.signin-btn.e-btnRedBg 签到升级
      ul.e-flex_center.e-txtC.e-mt30
        li
          p {{ 4 }}
          p.e-c9 优惠券
        li
          p {{ 300 }}
          p.e-c9 积分
        li
          p {{ 0 }}
          p.e-c9 激励券
        li
          p {{ 405 }}
          p.e-c9 成长值
    //- 会员权益
    .u-befits.e-box_p
      .e-flex_center
        .e-flex_center
          .img.m
          div
            p.tit 会员权益
            p.intr 会员专属优惠券
        .e-flex_center
          .img
          div
            p.tit 积分商城
            p.intr 积分兑换好礼
    //- 订单
    .u-orders.e-box_p
      .u-title.e-flex_center
        p.e-font15.e-c6 我的订单
        router-link.e-c9.e-flex_center(to="order-list")
          span 查看全部
          i.icon.icon-right.e-font16
      ul.e-flex_center.e-txtC.e-mt10
        li
          i.icon.icon-unpaid
          p 待付款
        li
          i.icon.icon-undeliver
          p 待发货
        li
          i.icon.icon-delivered
          p 已发货
        li
          i.icon.icon-canceled
          p 已取消
        li
          i.icon.icon-completed
          p 已完成
    //- 热门活动
    .u-hot.e-box_p
      .u-title
        p.e-font15.e-c6 热门活动
      ul.e-flex_center.e-txtC.e-mt10
        li
          i.icon.icon-unpaid
          p 礼物记录
        li
          i.icon.icon-undeliver
          p 拼团订单
        li
          i.icon.icon-delivered
          p 每月宅配
    //- 其他
    .u-others.e-box_p
      .e-flex_center.e-b-bottom
        p.e-flex_left
          i.icon.icon-logistics.e-c9
          span.e-ml10 提货卡兑换&兑换记录
        i.icon.icon-right.e-font16
      .e-flex_center.e-b-bottom
        p.e-flex_left
          i.icon.icon-location.e-c9
          span.e-ml10 管理地址
        i.icon.icon-right.e-font16
      .e-flex_center.e-b-bottom
        p.e-flex_left
          i.icon.icon-customer.e-c9
          span.e-ml10 发票助手
        i.icon.icon-right.e-font16
      .e-flex_center.e-b-bottom
        p.e-flex_left
          i.icon.icon-location.e-c9
          span.e-ml10 我的收藏
        i.icon.icon-right.e-font16
      .e-flex_center
        p.e-flex_left
          i.icon.icon-location.e-c9
          span.e-ml10 联系我们
        i.icon.icon-right.e-font16
    tabbar(selected="user")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import tabbar from '@/components/tabbar.vue'

const appModule = namespace('app')

@Component({
  components: {
    tabbar
  }
})
export default class User extends Vue {
  @appModule.State navHeight!: number
}
</script>

<style lang="scss" scoped>
.user {
  padding-bottom: 55px;
}

.u-member {
  padding: 30px 24px 18px;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;

  .avatar-img {
    width: 50px;
    height: 50px;
    // padding: 5px;
    border-radius: 30px;
  }

  .signin-btn {
    width: 60px;
    height: auto;
    margin-top: 10px;
    padding: 3px 0;
    font-size: 12px;
  }
}

.u-befits {
  padding: 18px 24px;

  .img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background: url('../../assets/image/user.png') no-repeat;
    background-size: 100%;

    &.m {
      background-position-y: -40px;
    }
  }

  .intr {
    font-size: 12px;
    color: $e-9;
  }
}

.u-orders {
  padding: 14px ;

  ul i {
    font-size: 36px;
    color: $e-deepRed;
  }
}

// 通用的下横线标题
.u-title {
  margin-left: -14px;
  margin-right: -14px;
  padding: 0 14px 10px;
  border-bottom: 1px solid $e-line;
}

.u-hot {
  padding: 14px;

  ul {
    padding: 0 20px;

    i {
      font-size: 36px;
      color: $e-orange;
    }
  }
}

.u-others {
  padding: 0 14px;

  .e-flex_center {
    padding: 10px 0;
  }
  .e-flex_left i {
    width: 26px;
    height: 26px;
    line-height: 1;
  }
}
</style>
