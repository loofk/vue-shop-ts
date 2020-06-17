/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [getCategories↗](http://127.0.0.1:3000/project/11/interface/api/184) 的 **请求类型**
 *
 * @分类 [商品↗](http://127.0.0.1:3000/project/11/interface/api/cat_47)
 * @请求头 `POST /ebuy_index/categories`
 * @更新时间 `2020-06-12 11:05:04`
 */
export interface CategoriesRequest {}

/**
 * 接口 [getCategories↗](http://127.0.0.1:3000/project/11/interface/api/184) 的 **返回类型**
 *
 * @分类 [商品↗](http://127.0.0.1:3000/project/11/interface/api/cat_47)
 * @请求头 `POST /ebuy_index/categories`
 * @更新时间 `2020-06-12 11:05:04`
 */
export type CategoriesResponse = {
  id: number
  name: string
}[]

/**
 * 接口 [getCategoryGoods↗](http://127.0.0.1:3000/project/11/interface/api/189) 的 **请求类型**
 *
 * @分类 [商品↗](http://127.0.0.1:3000/project/11/interface/api/cat_47)
 * @请求头 `POST /ebuy_index/getCategoryGoods`
 * @更新时间 `2020-06-12 11:06:53`
 */
export interface GetCategoryGoodsRequest {
  cate_id: number
}

/**
 * 接口 [getCategoryGoods↗](http://127.0.0.1:3000/project/11/interface/api/189) 的 **返回类型**
 *
 * @分类 [商品↗](http://127.0.0.1:3000/project/11/interface/api/cat_47)
 * @请求头 `POST /ebuy_index/getCategoryGoods`
 * @更新时间 `2020-06-12 11:06:53`
 */
export interface GetCategoryGoodsResponse {
  goods: {
    gbn: string
    brief: string
    has_store: number
    image: string
    original_name: string
    price: string
    product_id: string
    goods_id: string
    is_egou: number
  }[]
  states?: string[]
}

/**
 * 接口 [goodsIndex↗](http://127.0.0.1:3000/project/11/interface/api/179) 的 **请求类型**
 *
 * @分类 [商品↗](http://127.0.0.1:3000/project/11/interface/api/cat_47)
 * @请求头 `POST /ebuy_index/getProductIndexNew`
 * @更新时间 `2020-06-12 11:04:06`
 */
export interface GetProductIndexNewRequest {}

/**
 * 接口 [goodsIndex↗](http://127.0.0.1:3000/project/11/interface/api/179) 的 **返回类型**
 *
 * @分类 [商品↗](http://127.0.0.1:3000/project/11/interface/api/cat_47)
 * @请求头 `POST /ebuy_index/getProductIndexNew`
 * @更新时间 `2020-06-12 11:04:06`
 */
export interface GetProductIndexNewResponse {
  bannerUrl?: string
  thumbUrl?: string
  bgColor?: string[]
  bannerHeight?: number
  list?: {
    goods_id?: string
    name?: string
    brief?: string
    image_default_id?: string
    store?: number
    price?: string
    product_id?: string
    image_url?: string
  }[]
}

/**
 * 接口 [index↗](http://127.0.0.1:3000/project/11/interface/api/194) 的 **请求类型**
 *
 * @分类 [商品↗](http://127.0.0.1:3000/project/11/interface/api/cat_47)
 * @请求头 `POST /ebuy_index/getIndexInfo`
 * @更新时间 `2020-06-12 11:09:38`
 */
export interface GetIndexInfoRequest {}

/**
 * 接口 [index↗](http://127.0.0.1:3000/project/11/interface/api/194) 的 **返回类型**
 *
 * @分类 [商品↗](http://127.0.0.1:3000/project/11/interface/api/cat_47)
 * @请求头 `POST /ebuy_index/getIndexInfo`
 * @更新时间 `2020-06-12 11:09:38`
 */
export interface GetIndexInfoResponse {
  homeBanner?: {
    info?: {
      image: string
      title: string
      url: string
      from_time: number
      to_time: number
    }[]
    isTimeLimit?: number
  }
  goodsSort?: {
    info?: {
      image: string
      title: string
      url: string
      from_time: number
      to_time: number
      cate_id: number
      cate_name: string
    }[]
    isTimeLimit?: number
  }
  stEntrance?: {
    info?: {
      image: string
      title: string
      url: string
      from_time: number
      to_time: number
    }[]
    isTimeLimit?: number
  }
  shopOneDesc?: {
    info?: {
      image: string
      title: string
      url: string
      from_time: number
      to_time: number
    }[]
    isTimeLimit?: number
  }
  shopTwoDesc?: {
    info?: {
      image: string
      title: string
      url: string
      from_time: number
      to_time: number
    }[]
    isTimeLimit?: number
  }
  new?: {
    name: string
    image: string
    url: string
    price: string
    goods_id: string
    product_id: string
    brief: string
    is_egou: number
  }[]
}

/* prettier-ignore-end */
