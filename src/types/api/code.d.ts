/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [checkBundleProductsExist↗](http://127.0.0.1:3000/project/11/interface/api/169) 的 **请求类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/checkBundleProductsExist`
 * @更新时间 `2020-06-12 10:54:22`
 */
export interface CheckBundleProductsExistRequest {
  e_code: string[]
}

/**
 * 接口 [checkBundleProductsExist↗](http://127.0.0.1:3000/project/11/interface/api/169) 的 **返回类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/checkBundleProductsExist`
 * @更新时间 `2020-06-12 10:54:22`
 */
export interface CheckBundleProductsExistResponse {
  bundleProductsExist?: number
}

/**
 * 接口 [createEcode↗](http://127.0.0.1:3000/project/11/interface/api/154) 的 **请求类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/createCode`
 * @更新时间 `2020-06-12 10:39:49`
 */
export interface CreateCodeRequest {
  goods_id?: string
  product_id?: string
  quantity?: number
}

/**
 * 接口 [createEcode↗](http://127.0.0.1:3000/project/11/interface/api/154) 的 **返回类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/createCode`
 * @更新时间 `2020-06-12 10:39:49`
 */
export interface CreateCodeResponse {
  codes?: string
  sign?: string
}

/**
 * 接口 [ecodeList↗](http://127.0.0.1:3000/project/11/interface/api/144) 的 **请求类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/getEcodeProductListNew`
 * @更新时间 `2020-06-12 10:36:00`
 */
export interface GetEcodeProductListNewRequest {
  page: number
}

/**
 * 接口 [ecodeList↗](http://127.0.0.1:3000/project/11/interface/api/144) 的 **返回类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/getEcodeProductListNew`
 * @更新时间 `2020-06-12 10:36:00`
 */
export type GetEcodeProductListNewResponse = {
  id?: string
  code?: string
  invalid_time?: string
  owner?: string
  order_id?: string
  product_id?: string
  code_status?: string
  member_id?: string
  log_id?: string
  sign?: string
  product_info?: {
    name?: string
    image?: string
    image_large?: string
    goods_id?: string
    product_id?: string
    brief?: string
    bn?: string
    freez?: string
    store?: string
    type_id?: string
    price?: string
    spec?: string
    spec_info?: string
    specs?: string[]
    specs_order?: {
      [s: string]: string
    }
    original_name?: string
    images?: string[]
  }
}[]

/**
 * 接口 [getProductsInfoAndBundleProducts↗](http://127.0.0.1:3000/project/11/interface/api/174) 的 **请求类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/getProductsInfoAndBundleProducts`
 * @更新时间 `2020-06-12 10:57:03`
 */
export interface GetProductsInfoAndBundleProductsRequest {
  e_code: string[]
}

/**
 * 接口 [getProductsInfoAndBundleProducts↗](http://127.0.0.1:3000/project/11/interface/api/174) 的 **返回类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/getProductsInfoAndBundleProducts`
 * @更新时间 `2020-06-12 10:57:03`
 */
export interface GetProductsInfoAndBundleProductsResponse {
  productsInfo?: {
    '9920'?: {
      name?: string
      image?: string
      image_large?: string
      goods_id?: string
      product_id?: string
      brief?: string
      bn?: string
      freez?: string
      store?: string
      type_id?: string
      price?: string
      spec?: string
      spec_info?: string
      specs?: string[]
      specs_order?: {
        [s: string]: string
      }
      original_name?: string
      nums?: number
    }
  }
  bundleProductsInfo?: {
    '423'?: {
      goods_info?: {
        is_egou?: number
        name?: string
        brief?: string
        store?: number
      }
      product_list?: {
        product_id?: string
        goods_id?: string
        spec_desc?: string[]
        spec_info?: string
        store?: number
        freez?: string
        is_default?: string
        price?: string
        name?: string
        spec_private_value_id?: string[]
        brief?: string
      }[]
      default_product?: {
        product_id?: string
        goods_id?: string
        spec_desc?: string[]
        spec_info?: string
        store?: number
        freez?: string
        is_default?: string
        price?: string
        name?: string
        spec_private_value_id?: string[]
        brief?: string
        image_url?: string[]
      }
      sku_list?: {
        name?: string
        item?: {
          private_spec_value_id: string
          spec_value: string
          spec_value_id: string
          spec_goods_images: string
          spec_image: string
          image_url: string[]
        }[]
      }[]
    }
  }
  extInfo?: {
    bundleAmount?: number
  }
}

/**
 * 接口 [productInfo↗](http://127.0.0.1:3000/project/11/interface/api/149) 的 **请求类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/getProductInfoByEcode`
 * @更新时间 `2020-06-12 10:43:05`
 */
export interface GetProductInfoByEcodeRequest {
  e_code?: string[]
  sign?: string
}

/**
 * 接口 [productInfo↗](http://127.0.0.1:3000/project/11/interface/api/149) 的 **返回类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/getProductInfoByEcode`
 * @更新时间 `2020-06-12 10:43:05`
 */
export interface GetProductInfoByEcodeResponse {
  id?: string
  product_id?: string
  invalid_time?: string
  applicant?: string
  owner?: string
  applicant_to?: string
  order_id?: string
  createtime?: string
  last_modified?: string
  ignore_bundle_amount?: string
  product_info?: {
    name?: string
    image?: string
    image_large?: string
    goods_id?: string
    product_id?: string
    brief?: string
    bn?: string
    freez?: string
    store?: string
    type_id?: string
    price?: string
    spec?: string
    spec_info?: string
    specs?: string[]
    specs_order?: {
      [s: string]: string
    }
    original_name?: string
    images?: string[]
  }
}

/**
 * 接口 [receiveEcode↗](http://127.0.0.1:3000/project/11/interface/api/164) 的 **请求类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/changeECodeOwner`
 * @更新时间 `2020-06-12 10:53:03`
 */
export interface ChangeECodeOwnerRequest {
  e_code?: string[]
  member_id?: string
  sign?: string
}

/**
 * 接口 [receiveEcode↗](http://127.0.0.1:3000/project/11/interface/api/164) 的 **返回类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/changeECodeOwner`
 * @更新时间 `2020-06-12 10:53:03`
 */
export interface ChangeECodeOwnerResponse {}

/**
 * 接口 [shareEcode↗](http://127.0.0.1:3000/project/11/interface/api/159) 的 **请求类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/checkShareApp`
 * @更新时间 `2020-06-12 10:43:20`
 */
export interface CheckShareAppRequest {
  e_code?: string[]
  sign?: string
}

/**
 * 接口 [shareEcode↗](http://127.0.0.1:3000/project/11/interface/api/159) 的 **返回类型**
 *
 * @分类 [E购码↗](http://127.0.0.1:3000/project/11/interface/api/cat_37)
 * @请求头 `POST /ebuy_index/checkShareApp`
 * @更新时间 `2020-06-12 10:43:20`
 */
export interface CheckShareAppResponse {}

/* prettier-ignore-end */
