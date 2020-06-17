<template lang="pug">
  .scroll-page.without-tabbar(:style="`paddingTop: ${navHeight}px`")
    //- 导航栏
    Nav(logo title=" ")
    //- 骨架屏
    skeleton(v-if="showSkeleton" loading="chiaroscuro" :style="`paddingTop: ${navHeight}px`")
    //- 接口调用失败
    Abnormal(v-else-if="errMsg" :err="errMsg" tabbar @callback="getIndexInfo")
    //- 内容
    .h-main.scroll-view.skeleton
      //- 首焦轮播图
      .h-box.e-mlr24.swiper-height.skeleton-rect
        mt-swipe
          mt-swipe-item(v-for="(item, index) in bannerList" :key="index"): img(:src="item")
      //- 渐变背景
      .h-bg
        //- 8个分类项
        .h-cate
          .h-cate-item(v-for="(item, index) in cateList" :key="index" @click="goCatePage(item.cate_id)")
            .gray-circle.skeleton-radius: img.cate-img(:src="item.image")
            p.e-mt5 {{ item.cate_name }}
        //- E购码入口
        router-link.h-egou-enter.skeleton-rect(to="/choose")
          img(src="@/assets/image/egou_enter.png")
        //- 热门推荐商品橱窗
        div(v-if="hot.length")
          //- 标题
          .h-common-title
            .title
              span.left-circle
              span.right-circle
              span.title-content 热门推荐
          //- 商品
          .h-hot
            .h-hot-goods(v-for="(item, index) in hot" :key="index")
              pro-template(direction="vertical" :info="item")
        //- 门店
        div
          .h-common-title
            .title.skeleton-radius
              span.left-circle
              span.right-circle
              span.title-content 华为智能生活馆
            p.sub-title 共享美好生活
          .h-box.h-shop.skeleton-rect(v-for="(item, index) in shopInfo" :key="index")
            .swiper-height
              mt-swipe
                mt-swipe-item(v-for="(itm, idx) in item.banner" :key="idx"): img(:src="itm")
            .e-flex_center.shop-info
              div
                p {{ item.name }}
                p.e-font12.e-c9.e-mt5 {{ item.address }}
              .shop-tel(@click="callPhone(item.tel)"): span.tel-icon

        //- 版权标注
        .c-copy-right
          p {{ '©' + new Date().getFullYear() + ' 深圳慧通互联科技有限公司版权所有' }}
          router-link(to="/privacy") 隐私政策
    //- tabbar
    tabbar(selected="index")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import proTemplate from '@/components/pro-template.vue'
import tabbar from '@/components/tabbar.vue'
import skeleton from '@/components/skeleton.vue'
import goodsApi from '@/api/goods'
import cartApi from '@/api/cart'
import { overTime } from '@/util/index'

// 声明文件
type NewOptions = {
  name: string;
  image: string;
  url: string;
  price: string;
  goods_id: string;
  product_id: string;
  brief: string;
  is_egou: number;
}

type CateOptions = {
  cate_id: number;
  image: string;
  cate_name: string;
}

@Component({
  components: {
    tabbar,
    proTemplate,
    skeleton
  }
})
export default class Index extends Vue {
  bannerList: Array<string> = []
  cateList: CateOptions[] = []

  adList: string[] = [] // 广告图
  hot: NewOptions[] = [] // 热门商品
  // 门店数据
  shopInfo = [
    {
      name: '华为智能生活馆（杭州黄龙万科店）',
      address: '西湖区学院路77号黄龙万科中心AB座1F层',
      banner: [''],
      tel: '0571-28008877'
    },
    {
      name: '华为智能生活馆（深圳机场店）',
      address: '宝安国际机场T3航站楼国内出发',
      banner: [''],
      tel: '0755-23459978'
    }
  ]

  errMsg = ''
  // 骨架屏状态
  showSkeleton = true

  selected = '订单'

  @Getter('getCartCount', { namespace: 'user' }) cartCount!: number
  @Getter('getNavHeight', { namespace: 'app' }) navHeight!: number

  @Mutation('SET_CART_COUNT', { namespace: 'user' }) setCartCount!: Function
  @Mutation('SET_CATE_ID', { namespace: 'user' }) setCateId!: Function

  created () {
    this.getIndexInfo()
    this.getCount()
  }

  // 处理首页图片
  formatData (data: {to_time: number; image: string}[]) {
    return data.filter(item => overTime(item.to_time)).map(item => item.image)
  }

  // 获取首页数据
  getIndexInfo () {
    this.$loading()
    goodsApi.index().then(res => {
      this.errMsg = ''
      const data = res.data

      // 分类
      if (data.goodsSort && data.goodsSort.info) {
        this.cateList = data.goodsSort.info.filter(item => item.cate_id > 0)
      }

      // banner
      if (data.homeBanner && data.homeBanner.info) {
        this.bannerList = this.formatData(data.homeBanner.info)
      }

      // 广告
      if (data.stEntrance && data.stEntrance.info) {
        this.adList = this.formatData(data.stEntrance.info)
      }

      // 热门商品
      if (data.new) {
        this.hot = data.new
      }

      // 门店
      if (data.shopOneDesc && data.shopOneDesc.info) {
        this.shopInfo[0].banner = this.formatData(data.shopOneDesc.info)
      }
      if (data.shopTwoDesc && data.shopTwoDesc.info) {
        this.shopInfo[1].banner = this.formatData(data.shopTwoDesc.info)
      }
    }).catch(err => {
      this.errMsg = err.msg || '加载首页数据失败'
    }).finally(() => {
      this.$loading(false)
      // 清除骨架屏
      // this.showSkeleton = false
    })
  }

  // 获取购物车商品总数
  getCount () {
    cartApi.getCartCount().then(res => {
      this.setCartCount(res.data.num)
    }).catch()
  }

  // 跳转分类页
  goCatePage (cateId: number) {
    this.setCateId(cateId)
    setTimeout(() => {
      this.$nav.to('cate')
    }, 100)
  }

  // 联系客服
  callPhone (tel: string) {
    console.log(tel)
  }
}
</script>

<style lang="scss" scoped>
.index {
  background: $e-f;
  padding-bottom: 55px;
}

.e-mlr24 {
  margin: 0 12px;
}

.h-main {
  padding: 15px 0 0;
}

.h-box {
  min-height: 185px;
  background: $e-f;
  border-radius: 4px !important;
  box-shadow: 0 5px 7px 1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  // 兼容苹果圆角失效问题
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}

.swiper-height {
  height: 185px;
}

.h-bg {
  padding: 0 12px;
  background-image: linear-gradient(to bottom, $e-f, #f4f4f4 30%);
}

// 公共标题
.h-common-title {
  margin-top: 30px;
  text-align: center;

  .title {
    position: relative;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
  }

  .left-circle {
    position: absolute;
    bottom: 2.5px;
    left: -9px;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    background: #fce6e0;
  }
  .right-circle {
    position: absolute;
    top: 10px;
    right: -10px;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: #eaf6fd;
  }

  .title-content {
    position: relative;
    z-index: 1;
  }

  .sub-title {
    margin-top: 5px;
    font-size: 12px;
    color: $e-9;
  }
}

.h-cate {
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.h-cate-item {
  width: 25%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .gray-circle {
    position: relative;
    width: 56px;
    height: 56px;
    background-color: #f3f3f3;
    border-radius: 28px;
  }

  .cate-img {
    position: absolute;
    left: 50%;
    margin-left: -28px;
    bottom: 6px;
    z-index: 2;
    width: 56px;
    height: 56px;
  }
}

.h-egou-enter {
  display: block;
  margin-top: 25px;
  border-radius: 4px;

  img {
    width: 100%;
    height: 70px;
  }
}

// 热门商品橱窗
.h-hot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

.h-hot-goods {
  box-sizing: border-box;
  padding: 25px 10px;
  width: 172px;
  height: 242px;
  margin-top: 8px;
  background-color: $e-f;
  border-radius: 5px;
}

.h-shop {
  margin-top:10px;

  .shop-info {
    padding: 10px;
    padding-bottom: 25px;
    border-top-color: transparent;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .shop-tel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 35px;
    background-color: #f5f6fa;
  }

  .tel-icon {
    width: 13.5px;
    height: 13.5px;
    background-size: 100%;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY3RTdEMjMyNTg3QjExRUE4Q0ZGQ0I1MzY3MDhCREFDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY3RTdEMjMzNTg3QjExRUE4Q0ZGQ0I1MzY3MDhCREFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjdFN0QyMzA1ODdCMTFFQThDRkZDQjUzNjcwOEJEQUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjdFN0QyMzE1ODdCMTFFQThDRkZDQjUzNjcwOEJEQUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7IHV3OAAACk0lEQVR42qyWW4hNURjH9+xxS9JQGpoHuSXJA7k9uOXOGJdCTSYmkmbk8qBDLg+YzMGDy8MML0TI5YkmimJKyuSW5DZlyGUScpswg4bfV/9dq+mcmT1n1le/zjpnnb3/e3/r+39rZSWTycCJYtgDfeGWvr8IPEXojEvgOPSDLJgAV6GXbzETqoBmWAG94SkMhDOQ7UusyBFaDifhCyyEBpgNu3yJlWlsb3TamavVg1hshUU+xPrDMziVYv4S7NT4KHTpqNhXVV+6dbEUfoY+erAosjMRuwk5MCXNf9apYH5AvfN7biZiJ5ybtow1cFDjTRKMoj4TsYvwFhbAWGdujqrUwpx/xEeB/IUd+l7prMVQzf+EfT5Nbd66C6Ngo1N9r6E77PcpZoZeCU3qjSPhlzqLxSpY7LM3PpJ5zUvnVKGXldpAfXOELzGLAzLyEDiv9bO03oYecAUG+xL7pxb1GGborf7AfHgOeVANw9Lcr7P8F8YRC9R8C+ADrIZy+AjT1dby9KYFLa5bAu/FuxTzqZ+AeKmbf4PNatbmxUnaVHsq3YdVrcvgrFL9QO3P5ne7GmErKbaCmSWfbYND8AmmSiTqOrWyTpMagdlnrfy7XaI5bYlZ1Ojm32G9tiC7ZgPMhDql1YTmwXVdV6F5a+D58vCAMEYR1eiIYOtWqAKxo8M1GC4vTnaEorgBo1Vsg6wHhzGr1lI6Hp7AOLgH06BRPfNOK2s/V+OJYTtsUifBKufN9kK3Nq4r1uebsJ2+bNDukJD/EkpTfpr/b3F2+kSYQSNoVmO27ei+TmBV8p71z67OuaVc41KzRqcOtLqHMEZpKtNaXoDfOp3lOkKVcUo/zlse09lkqRp3o4ReyexRIw/+CzAA0K6VGW9XHjEAAAAASUVORK5CYII=');
  }
}

.c-copy-right {
  padding: 12.5px 0;
  font-size: 12px;
  color: $e-9;
  text-align: center;
  line-height: 1.5;
}
</style>
