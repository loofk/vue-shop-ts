import Vue from 'vue'
import { Nav } from '@/util/nav'

// 导入产品相关的声明文件
// import './product'

declare module '*.vue' {
  export default Vue
}

// 扩展Vue全局属性
declare module 'vue/types/vue' {
  interface Vue {
    $loading: Function;
    $to: Function;
    $toast: Function;
    $modal: any;
    $nav: Nav;
  }
}
