/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [getMpCode↗](http://127.0.0.1:3000/project/11/interface/api/264) 的 **请求类型**
 *
 * @分类 [产品↗](http://127.0.0.1:3000/project/11/interface/api/cat_52)
 * @请求头 `POST /goods/getMpCode`
 * @更新时间 `2020-06-12 11:31:17`
 */
export interface GetMpCodeRequest {
  product_id: string
}

/**
 * 接口 [getMpCode↗](http://127.0.0.1:3000/project/11/interface/api/264) 的 **返回类型**
 *
 * @分类 [产品↗](http://127.0.0.1:3000/project/11/interface/api/cat_52)
 * @请求头 `POST /goods/getMpCode`
 * @更新时间 `2020-06-12 11:31:17`
 */
export interface GetMpCodeResponse {
  image?: string
}

/**
 * 接口 [goodsSku↗](http://127.0.0.1:3000/project/11/interface/api/254) 的 **请求类型**
 *
 * @分类 [产品↗](http://127.0.0.1:3000/project/11/interface/api/cat_52)
 * @请求头 `POST /ebuy_index/getGoodsInfo`
 * @更新时间 `2020-06-12 11:27:55`
 */
export interface GetGoodsInfoRequest {
  product_id: string
}

/**
 * 接口 [goodsSku↗](http://127.0.0.1:3000/project/11/interface/api/254) 的 **返回类型**
 *
 * @分类 [产品↗](http://127.0.0.1:3000/project/11/interface/api/cat_52)
 * @请求头 `POST /ebuy_index/getGoodsInfo`
 * @更新时间 `2020-06-12 11:27:55`
 */

export type GoodsInfoOptions = {
  is_egou: number
  name: string
  brief: string
  store: number
}

export type ProductOptions = {
  product_id: string
  goods_id: string
  spec_desc: string[]
  spec_info: string
  store: number
  freez: string
  is_default: string
  price: string
  name: string
  spec_private_value_id: string[]
  brief: string
}

export type resolveProductOptions = ProductOptions & { noPrice?: boolean; image_url?: string[]; unselectSku?: string; quantity?: number }

export type SkuItemOptions = {
  private_spec_value_id: string
  spec_value: string
  spec_value_id: string
  spec_goods_images: string
  spec_image: string
  image_url: string[]
}

export type SkuOptions = {
  name: string
  item: SkuItemOptions[]
}

export interface GetGoodsInfoResponse {
  goods_info: GoodsInfoOptions
  product_list: ProductOptions[]
  default_product: ProductOptions
  sku_list: SkuOptions[]
  selected_product: ProductOptions
  applicants?: string[]
}

/**
 * 接口 [picSpecific↗](http://127.0.0.1:3000/project/11/interface/api/259) 的 **请求类型**
 *
 * @分类 [产品↗](http://127.0.0.1:3000/project/11/interface/api/cat_52)
 * @请求头 `POST /ebuy_index/getPicSpecific`
 * @更新时间 `2020-06-12 11:28:45`
 */
export interface GetPicSpecificRequest {
  product_id: string
}

/**
 * 接口 [picSpecific↗](http://127.0.0.1:3000/project/11/interface/api/259) 的 **返回类型**
 *
 * @分类 [产品↗](http://127.0.0.1:3000/project/11/interface/api/cat_52)
 * @请求头 `POST /ebuy_index/getPicSpecific`
 * @更新时间 `2020-06-12 11:28:45`
 */

export type MajorOptions = {
  attrCode: string
  attrName: string
  attrValue: string
  parentAttrCode: string
  attrRemark: string
}

export type SpecOptions = {
  name: string
  type: number
  value?: string[]
  valueType: number
  content?: {
    content: {
      name: string
      type: number
      value: string
      valueType: number
    }[]
    name: string
    type: number
    valueType: number
  }[]
}
export interface GetPicSpecificResponse {
  majorSpecificationList: MajorOptions[]
  specifications: SpecOptions[]
  imageList: string[]
}

/* prettier-ignore-end */
