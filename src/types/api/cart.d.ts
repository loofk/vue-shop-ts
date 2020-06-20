/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [addItem↗](http://127.0.0.1:3000/project/11/interface/api/114) 的 **请求类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/addItem`
 * @更新时间 `2020-06-12 10:28:05`
 */
export interface AddItemRequest {
  fast?: boolean
  is_single?: boolean
  num?: number
  overwrite?: boolean
  product_id?: string
  return_all?: boolean
}

/**
 * 接口 [addItem↗](http://127.0.0.1:3000/project/11/interface/api/114) 的 **返回类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/addItem`
 * @更新时间 `2020-06-12 10:28:05`
 */
export interface AddItemResponse {
  num?: string
}

/**
 * 接口 [deleteItem↗](http://127.0.0.1:3000/project/11/interface/api/119) 的 **请求类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/deleteItem`
 * @更新时间 `2020-06-12 10:13:04`
 */
export interface DeleteItemRequest {
  ident: string
}

/**
 * 接口 [deleteItem↗](http://127.0.0.1:3000/project/11/interface/api/119) 的 **返回类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/deleteItem`
 * @更新时间 `2020-06-12 10:13:04`
 */
export interface DeleteItemResponse {
  total_price: string
  total_quantity: number
  is_selected_all: boolean
  selected_price: string
  selected_quantity: number
  goods: {
    product_id: string
    goods_id: string
    brief: string
    price: string
    spec: string
    name: string
    store: number
    can_buy: boolean
    image: string
    obj_ident: string
    quantity: number
    selected: boolean
    is_single: boolean
    is_starbuy: boolean
    num: number
  }[]
  gifts: string[]
  rules: string[]
  items: {
    obj_ident: string
    quantity: number
    selected: boolean
    is_single: boolean
    goods_info: {
      product_id: string
      goods_id: string
      brief: string
      price: string
      spec: string
      name: string
      store: number
      can_buy: boolean
      image: string
    }
    is_starbuy: boolean
  }[]
}

/**
 * 接口 [deleteSelectedItems↗](http://127.0.0.1:3000/project/11/interface/api/139) 的 **请求类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/deleteAllSelected`
 * @更新时间 `2020-06-12 10:22:58`
 */
export interface DeleteAllSelectedRequest {}

/**
 * 接口 [deleteSelectedItems↗](http://127.0.0.1:3000/project/11/interface/api/139) 的 **返回类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/deleteAllSelected`
 * @更新时间 `2020-06-12 10:22:58`
 */
export type DeleteAllSelectedResponse = string[]

/**
 * 接口 [getCartCount↗](http://127.0.0.1:3000/project/11/interface/api/109) 的 **请求类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/getCount`
 * @更新时间 `2020-06-12 10:09:28`
 */
export interface GetCountRequest {}

/**
 * 接口 [getCartCount↗](http://127.0.0.1:3000/project/11/interface/api/109) 的 **返回类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/getCount`
 * @更新时间 `2020-06-12 10:09:28`
 */
export interface GetCountResponse {
  num?: string
}

/**
 * 接口 [getItems↗](http://127.0.0.1:3000/project/11/interface/api/104) 的 **请求类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/getItems`
 * @更新时间 `2020-06-12 10:07:51`
 */
export interface GetItemsRequest {}

/**
 * 接口 [getItems↗](http://127.0.0.1:3000/project/11/interface/api/104) 的 **返回类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/getItems`
 * @更新时间 `2020-06-12 10:07:51`
 */
export interface GetItemsResponse {
  total_price?: string
  total_quantity?: number
  is_selected_all?: boolean
  selected_price?: string
  selected_quantity?: number
  goods?: {
    product_id: string
    goods_id: string
    brief: string
    bn: string
    price: string
    spec: string
    is_egou: string
    name: string
    store: number
    can_buy: number
    image: string
    image_id: string
    obj_ident: string
    quantity: number
    selected: boolean
    is_single: boolean
    is_starbuy: boolean
    num: number
  }[]
  gifts?: string[]
  rules?: string[]
  items?: {
    obj_ident: string
    quantity: number
    selected: boolean
    is_single: boolean
    goods_info: {
      product_id?: string
      goods_id?: string
      brief?: string
      bn?: string
      price?: string
      spec?: string
      is_egou?: string
      name?: string
      store?: number
      can_buy?: number
      image?: string
      image_id?: string
    }
    is_starbuy: boolean
  }[]
}

/**
 * 接口 [setAllSelected↗](http://127.0.0.1:3000/project/11/interface/api/129) 的 **请求类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/setAllSelected`
 * @更新时间 `2020-06-12 10:29:57`
 */
export interface SetAllSelectedRequest {
  /**
   * 0
   */
  selected: number
}

/**
 * 接口 [setAllSelected↗](http://127.0.0.1:3000/project/11/interface/api/129) 的 **返回类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/setAllSelected`
 * @更新时间 `2020-06-12 10:29:57`
 */
export interface SetAllSelectedResponse {
  total_price?: string
  total_quantity?: number
  is_selected_all?: boolean
  selected_price?: string
  selected_quantity?: number
  goods?: {
    product_id?: string
    goods_id?: string
    brief?: string
    bn?: string
    price?: string
    spec?: string
    is_egou?: string
    name?: string
    store?: number
    can_buy?: number
    image?: string
    image_id?: string
    obj_ident?: string
    quantity?: number
    selected?: boolean
    is_single?: boolean
    is_starbuy?: boolean
    num?: number
  }[]
  gifts?: string[]
  rules?: string[]
  items?: {
    obj_ident?: string
    quantity?: number
    selected?: boolean
    is_single?: boolean
    goods_info?: {
      product_id?: string
      goods_id?: string
      brief?: string
      bn?: string
      price?: string
      spec?: string
      is_egou?: string
      name?: string
      store?: number
      can_buy?: number
      image?: string
      image_id?: string
    }
    is_starbuy?: boolean
  }[]
}

/**
 * 接口 [setItemSelected↗](http://127.0.0.1:3000/project/11/interface/api/134) 的 **请求类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/setItemSelected`
 * @更新时间 `2020-06-12 10:30:27`
 */
export interface SetItemSelectedRequest {
  ident: string
  selected: number
}

/**
 * 接口 [setItemSelected↗](http://127.0.0.1:3000/project/11/interface/api/134) 的 **返回类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/setItemSelected`
 * @更新时间 `2020-06-12 10:30:27`
 */
export interface SetItemSelectedResponse {
  total_price?: string
  total_quantity?: number
  is_selected_all?: boolean
  selected_price?: string
  selected_quantity?: number
  goods?: {
    product_id?: string
    goods_id?: string
    brief?: string
    bn?: string
    price?: string
    spec?: string
    is_egou?: string
    name?: string
    store?: number
    can_buy?: number
    image?: string
    image_id?: string
    obj_ident?: string
    quantity?: number
    selected?: boolean
    is_single?: boolean
    is_starbuy?: boolean
    num?: number
  }[]
  gifts?: string[]
  rules?: string[]
  items?: {
    obj_ident?: string
    quantity?: number
    selected?: boolean
    is_single?: boolean
    goods_info?: {
      product_id?: string
      goods_id?: string
      brief?: string
      bn?: string
      price?: string
      spec?: string
      is_egou?: string
      name?: string
      store?: number
      can_buy?: number
      image?: string
      image_id?: string
    }
    is_starbuy?: boolean
  }[]
}

/**
 * 接口 [updateItemNum↗](http://127.0.0.1:3000/project/11/interface/api/124) 的 **请求类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/batchUpdateItemNum`
 * @更新时间 `2020-06-12 10:16:23`
 */
export interface BatchUpdateItemNumRequest {
  items: {
    [s: string]: number
  }
}

/**
 * 接口 [updateItemNum↗](http://127.0.0.1:3000/project/11/interface/api/124) 的 **返回类型**
 *
 * @分类 [购物车↗](http://127.0.0.1:3000/project/11/interface/api/cat_32)
 * @请求头 `POST /cart/batchUpdateItemNum`
 * @更新时间 `2020-06-12 10:16:23`
 */
export interface BatchUpdateItemNumResponse {
  total_price?: string
  total_quantity?: number
  is_selected_all?: boolean
  selected_price?: string
  selected_quantity?: number
  goods?: {
    product_id?: string
    goods_id?: string
    brief?: string
    bn?: string
    price?: string
    spec?: string
    is_egou?: string
    name?: string
    store?: number
    can_buy?: number
    image?: string
    image_id?: string
    obj_ident?: string
    quantity?: number
    selected?: boolean
    is_single?: boolean
    is_starbuy?: boolean
    num?: number
  }[]
  gifts?: string[]
  rules?: string[]
  items?: {
    obj_ident?: string
    quantity?: number
    selected?: boolean
    is_single?: boolean
    goods_info?: {
      product_id?: string
      goods_id?: string
      brief?: string
      bn?: string
      price?: string
      spec?: string
      is_egou?: string
      name?: string
      store?: number
      can_buy?: number
      image?: string
      image_id?: string
    }
    is_starbuy?: boolean
  }[]
}

/* prettier-ignore-end */
