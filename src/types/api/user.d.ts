/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [analysis↗](http://127.0.0.1:3000/project/11/interface/api/305) 的 **请求类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /ebuy_index/analysis`
 * @更新时间 `2020-06-12 14:43:09`
 */
export interface AnalysisRequest {
  type: string
  time_from: string
  time_to: string
}

/**
 * 接口 [analysis↗](http://127.0.0.1:3000/project/11/interface/api/305) 的 **返回类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /ebuy_index/analysis`
 * @更新时间 `2020-06-12 14:43:09`
 */

/**
 * type设置为shop_sale时的返回数据类型
 */
type AnalysisShopSaleData = {
  shopSaleInfo?: {
    saleNums?: number
    saleAccount?: number
    orderPayNum?: number
    accountPerOrder?: number
  }
  productsSaleNum?: string[]
  productsSaleAccount?: string[]
  shopSaleNum?: {
    categories?: string[]
    data?: {
      '全部'?: {
        [s: string]: number
      }
      '已发货'?: {
        [s: string]: number
      }
      '已付款'?: {
        [s: string]: number
      }
    }
  }
  shopSaleAccount?: {
    categories?: string[]
    data?: {
      '全部'?: {
        [s: string]: number
      }
      '已发货'?: {
        [s: string]: number
      }
      '已付款'?: {
        [s: string]: number
      }
    }
  }
}

/**
 * type设置为member_sale时的返回数据类型
 */
type AnalysisMemberSaleData = {
  anonymous: "lxx",
  saleNums: 12,
  saleAccount: 1000.12
}[]

export type AnalysisResponse = AnalysisMemberSaleData & AnalysisShopSaleData

/**
 * 接口 [bindMobile↗](http://127.0.0.1:3000/project/11/interface/api/297) 的 **请求类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /member/bindMobile`
 * @更新时间 `2020-06-12 14:36:48`
 */
export interface BindMobileRequest {
  mobile: string
  code: string
}

/**
 * 接口 [bindMobile↗](http://127.0.0.1:3000/project/11/interface/api/297) 的 **返回类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /member/bindMobile`
 * @更新时间 `2020-06-12 14:36:48`
 */
export type BindMobileResponse = string[]

/**
 * 接口 [bindWxMobile↗](http://127.0.0.1:3000/project/11/interface/api/309) 的 **请求类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /member/bindWXMobile`
 * @更新时间 `2020-06-12 14:43:50`
 */
export interface BindWxMobileRequest {
  encrypted_data: string
  iv: string
}

/**
 * 接口 [bindWxMobile↗](http://127.0.0.1:3000/project/11/interface/api/309) 的 **返回类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /member/bindWXMobile`
 * @更新时间 `2020-06-12 14:43:50`
 */
export interface BindWxMobileResponse {}

/**
 * 接口 [checkAuth↗](http://127.0.0.1:3000/project/11/interface/api/289) 的 **请求类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /ebuy_index/checkAuth`
 * @更新时间 `2020-06-12 14:33:43`
 */
export interface CheckAuthRequest {}

/**
 * 接口 [checkAuth↗](http://127.0.0.1:3000/project/11/interface/api/289) 的 **返回类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /ebuy_index/checkAuth`
 * @更新时间 `2020-06-12 14:33:43`
 */
export interface CheckAuthResponse {
  auth?: boolean
}

/**
 * 接口 [needUpdate↗](http://127.0.0.1:3000/project/11/interface/api/301) 的 **请求类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /common/needUpdate`
 * @更新时间 `2020-06-12 14:37:32`
 */
export interface NeedUpdateRequest {}

/**
 * 接口 [needUpdate↗](http://127.0.0.1:3000/project/11/interface/api/301) 的 **返回类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /common/needUpdate`
 * @更新时间 `2020-06-12 14:37:32`
 */
export type NeedUpdateResponse = boolean

/**
 * 接口 [sendSms↗](http://127.0.0.1:3000/project/11/interface/api/293) 的 **请求类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /code/sendSms`
 * @更新时间 `2020-06-12 14:35:37`
 */
export interface SendSmsRequest {
  mobile: string
  type: string
}

/**
 * 接口 [sendSms↗](http://127.0.0.1:3000/project/11/interface/api/293) 的 **返回类型**
 *
 * @分类 [用户↗](http://127.0.0.1:3000/project/11/interface/api/cat_62)
 * @请求头 `POST /code/sendSms`
 * @更新时间 `2020-06-12 14:35:37`
 */
export type SendSmsResponse = string[]

/* prettier-ignore-end */
